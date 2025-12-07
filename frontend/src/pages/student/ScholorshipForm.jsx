import React, { useState } from "react";
import { CheckCircle, AlertCircle, Upload } from "lucide-react";
import request from "../api.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AadharFormStep1() {
  
   const [step, setStep] = useState(1);

  const [aadharError, setAadharError] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [aadharFileError, setAadharFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const navigate = useNavigate();



  // Step 2 states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    guardianName: "",
    guardianMobile: "",
    address: "",
    district: "",
    taluk: "",
    board: "",
    classStd: "",
    marks: "",
    school: "",
    studentPhoto: null,
    certificate: null,
    screenshot: null,
    utrId: "",
    // Step 3 states
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankPassbook: null,
    aadharNumber:null,
    aadharPhoto:null

  });

  useEffect(() => {
  const student = JSON.parse(localStorage.getItem("student"));
  if (student) {
    setFormData((prev) => ({
      ...prev,
      firstName: student.first_name || "",
      lastName: student.last_name || "",
    }));
  }
}, []);
  const [formErrors, setFormErrors] = useState({});
  const [aadharExists, setAadharExists] = useState(false);
const [aadharChecking, setAadharChecking] = useState(false);

// Call this when Aadhaar input changes

const handleAadharChange = async (e) => {
  const value = e.target.value;

  // Update local state
  setFormData({ ...formData, aadharNumber: value });

  // Check if value is exactly 12 digits and numeric
  if (value.length === 12 && /^\d+$/.test(value)) {
    setAadharChecking(true);
    try {
      const data = await request(`/check-aadhaar/?aadhaar=${value}`, "GET");
      setAadharExists(data.exists);
    } catch (error) {
      console.error("Aadhaar check error:", error.response?.data || error.message);
    }
    setAadharChecking(false);
  } else {
    setAadharExists(false);
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

const handleDrop = (e) => {
  e.preventDefault();
  setDragActive(false);

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFileChange({ target: { files: e.dataTransfer.files } });
    e.dataTransfer.clearData();
  }
};

  const handleFileChange = (e) => {
  const selected = e.target.files[0];
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!selected) return;

  if (!allowedTypes.includes(selected.type)) {
    setAadharFileError("Only PDF, JPG, or PNG files are allowed.");
    setAadharFile(null);
    setFormData((prev) => ({ ...prev, aadharPhoto: null }));
    return;
  }

  if (selected.size > maxSize) {
    setAadharFileError("File size must be 5MB or less.");
    setAadharFile(null);
    setFormData((prev) => ({ ...prev, aadharPhoto: null }));
    return;
  }

  // If valid
  setAadharFile(selected);
  setFormData((prev) => ({ ...prev, aadharPhoto: selected }));
  setAadharFileError("");
};


const isStep1Valid =
  formData.aadharNumber?.length === 12 &&
  /^\d{12}$/.test(formData.aadharNumber) &&
  !aadharExists &&
  formData.aadharPhoto instanceof File;


  const handleNext = () => {
    if (step === 1) {
      if (!isStep1Valid) {
  if (formData.aadharNumber?.length !== 12) {
    setAadharError("Aadhaar number must be 12 digits.");
  }
  if (!formData.aadharPhoto) {
    setAadharFileError("Please upload the Aadhaar file.");
  }
  return;
}

      setStep(2);
    } else if (step === 2) {
      if (!isStep2Valid) return;
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleStep2Change = (e) => {
  const { name, value, files } = e.target;

  // Handle file inputs
  if (files && files.length > 0) {
    const file = files[0];
    
    // Validate file type and size (max 5MB)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type) || file.size > maxSize) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "Invalid file. Only PDF/JPG/PNG under 5MB allowed.",
      }));
      return;
    }

    // Valid file
    setFormData((prev) => ({ ...prev, [name]: file }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    return;
  }

  // Handle mobile number separately
  if (name === "guardianMobile") {
    const cleaned = value.replace(/\D/g, ""); // Remove non-digits

    if (cleaned.length > 10) return; // Don't allow more than 10 digits

    setFormData((prev) => ({ ...prev, [name]: cleaned }));

    if (cleaned.length === 10) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } else if (cleaned.length > 0) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "Mobile number must be exactly 10 digits",
      }));
    }
    return;
  }

  // Handle all other text inputs
  setFormData((prev) => ({ ...prev, [name]: value }));
  setFormErrors((prev) => ({ ...prev, [name]: "" }));
};


  const handleStep3Change = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (!file) return;
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type) || file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, [name]: "Invalid file (PDF/JPG/PNG <5MB)" }));
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      // Validation for account number (numbers only)
      if (name === 'accountNumber') {
        const accountNumber = value.replace(/\D/g, "");
        setFormData((prev) => ({ ...prev, [name]: accountNumber }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const isStep2Valid = Object.entries({
    firstName: formData.firstName,
    lastName: formData.lastName,
    guardianName: formData.guardianName,
    guardianMobile: formData.guardianMobile,
    address: formData.address,
    district: formData.district,
    taluk: formData.taluk,
    board: formData.board,
    classStd: formData.classStd,
    marks: formData.marks,
    school: formData.school,
    studentPhoto: formData.studentPhoto,
    certificate: formData.certificate,
    screenshot: formData.screenshot,
    utrId: formData.utrId
  }).every(([key, value]) => {
    if (key === 'guardianMobile') {
      return value && value.length === 10;
    }
    return value && value !== "";
  });

  const isStep3Valid = formData.accountHolderName && formData.accountNumber && formData.ifscCode && formData.bankPassbook;

  const handleStep3DragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleStep3DragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleStep3Drop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleStep3Change({ target: { name: 'bankPassbook', files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };
const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem("student"));
  const formDataToSend = new FormData();

  formDataToSend.append("aadhar_card_number", formData.aadharNumber);

  // Append files
  formDataToSend.append("aadhar_photo", formData.aadharPhoto);
  formDataToSend.append("student_photo", formData.studentPhoto);
  formDataToSend.append("study_certificate_photo", formData.certificate);
  formDataToSend.append("payment_screenshot", formData.screenshot);
  formDataToSend.append("passbook_photo", formData.bankPassbook);

  // Append other input values
  formDataToSend.append("parent_name", formData.guardianName);
  formDataToSend.append("parent_phone_number", formData.guardianMobile);
  formDataToSend.append("permanent_address", formData.address);
  formDataToSend.append("district", formData.district);
  formDataToSend.append("taluk", formData.taluk);
  formDataToSend.append("board_of_education", formData.board);
  formDataToSend.append("present_class", formData.classStd);
  formDataToSend.append("marks_obtained", formData.marks);
  formDataToSend.append("college_name", formData.school);
  formDataToSend.append("utr_transaction_id", formData.utrId);
  formDataToSend.append("account_holder_name", formData.accountHolderName);
  formDataToSend.append("account_number", formData.accountNumber);
  formDataToSend.append("ifsc_code", formData.ifscCode);

  try {
    const response = await request( `/scholarship/${user.uuid}/`, "PUT", formDataToSend, null, true); // isFormData = true
    // console.log("Form submitted successfully:", response);
     setShowSuccessModal(true);
  } catch (error) {
    console.error("Submission failed:", error.response?.data || error.message);
    // Optionally show error to user
  }
};




  // Get application fee based on class selection
  const getApplicationFee = () => {
  const lowerClass = [
    '1st standard',
    '2nd standard',
    '3rd standard',
    '4th standard',
    '5th standard',
    '6th standard',
    '7th standard',
    '8th standard',
    '9th standard',
    '10th standard',
  ];
  if (lowerClass.includes(formData.classStd)) {
    return 'Application fees is Rs.250/-';
  } else if (formData.classStd) {
    return 'Application fees is Rs.350/-';
  }
  return '';
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-white">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-6 relative">
        {["Aadhar Details", "Personal Info", "Bank Details"].map((label, idx) => (
          <div key={idx} className="flex flex-col items-center w-1/3 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-20 transition-all duration-300 ${
                idx + 1 === step ? "bg-[rgba(137,12,37,1)]" : idx + 1 < step ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {idx + 1 === step && idx + 1 !== 1 ? idx + 1 : idx + 1 < step ? <CheckCircle size={20} /> : idx + 1}
            </div>
            <span className="text-sm mt-2 text-center z-20">{label}</span>
            {idx < 2 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1 transition-all duration-300 ${
                  step > idx + 1 ? "bg-green-500" : "border-t-4 border-dashed border-black"
                }`}
                style={{ zIndex: 0 }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-gray-100 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center ">
          <div className="flex justify-center mb-4">
            <div className="bg-[rgba(137,12,37,1)] rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9 9 0 1118.88 6.195 9 9 0 015.12 17.805zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-black mb-6">Aadhar Details</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-left">
              Student Aadhar Card Number <span className="text-red-500">*</span>
            </label>
          <input
  name="aadharNumber"
  type="text"
  maxLength={12}
  value={formData.aadharNumber || ''}
  onChange={(e) => {
    const val = e.target.value;
    if (/^\d{0,12}$/.test(val)) {
      setFormData({ ...formData, aadharNumber: val });
      handleAadharChange(e); // call the Aadhaar check logic
    }
  }}
  placeholder="Enter 12-digit Aadhaar number"
  className="w-full p-3 border rounded-lg"
/>

{aadharExists && (
  <p className="text-red-500 text-sm mt-1">
    This Aadhaar number already exists.
  </p>
)}

          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-left">
              Student Aadhar Card Photo <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed p-4 rounded-lg text-center relative transition ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300'} ${aadharFile ? 'border-green-500 bg-green-50' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              tabIndex={0}
              aria-label="Upload Aadhaar card file"
            >
              <input
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {!aadharFile ? (
                <>
                  <p className="text-sm text-gray-600">Upload Image</p>
                  <p className="text-xs text-gray-500">Drag and drop click and upload Aadhar card</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG (Max: 5MB)</p>
                </>
              ) : (
                <div className="flex items-center justify-center text-green-600 font-medium gap-2">
                  <CheckCircle size={20} />
                  <span>{aadharFile.name}</span>
                </div>
              )}
            </div>
            {aadharFileError && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} /> {aadharFileError}</p>}
          </div>

          <div className="flex justify-end mt-6">
            <button
  onClick={handleNext}
  className={`px-5 py-2 text-sm text-white font-semibold rounded-md transition ${
    isStep1Valid ? 'bg-[rgba(137,12,37,1)] hover:bg-red-900' : 'bg-gray-400 cursor-not-allowed'
  }`}
  disabled={!isStep1Valid}
>
  Save & Continue
</button>

          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-left text-[rgba(137,12,37,1)] mb-4">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'firstName', label: 'First Name', type: 'text',placeholder:"Enter your First Name" },
              { name: 'lastName', label: 'Last Name', type: 'text',placeholder:"Enter your Last Name" },
              { name: 'guardianName', label: 'Parent/Guardian Name', type: 'text',placeholder:"Enter your Parent/Guardian Name" },
              { name: 'guardianMobile', label: 'Parent/Guardian Mobile Number', type: 'tel' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label} <span className="text-red-500">*</span></label>
                <input
                  name={name}
                  type={type}
                  
                  value={formData[name] || ''}
                  onChange={handleStep2Change}
                  placeholder={name === 'guardianMobile' ? '10-digit mobile number' : `${placeholder}`}
                  className="w-full p-3 border rounded-lg"
                  readOnly={name === 'firstName' || name === 'lastName'} 
                />
                {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
              </div>
            ))}

            {/* Full Address Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Full Address <span className="text-red-500">*</span></label>
              <textarea
                name="address"
                placeholder="Enter your Permanent Address"
                value={formData.address}
                onChange={handleStep2Change}
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
              {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
            </div>

            {[
              { name: 'district', label: 'District', type: 'text',placeholder:"Enter your District" },
              { name: 'taluk', label: 'Taluk', type: 'text',placeholder:"Enter your Taluk" },
              { name: 'board', label: 'Board of Education', type: 'text',placeholder:"Enter your Education Board" },
              { name: 'marks', label: 'Marks Obtained / Total', type: 'text',placeholder:"Enter your Marks(520/600)" },
              { name: 'school', label: 'School/College Name', type: 'text' ,placeholder:"Enter your College Name" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label} <span className="text-red-500">*</span></label>
                <input
                  name={name}
                  type={type}
                  value={formData[name] || ''}
                  onChange={handleStep2Change}
                  className="w-full p-3 border rounded-lg"
                  placeholder={placeholder}
                />
                {formErrors[name] && <p className="text-red-500 text-sm">{formErrors[name]}</p>}
              </div>
            ))}

            {/* Present Class/Standard Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Present Class/Standard <span className="text-red-500">*</span></label>
              <select
  name="classStd"
  value={formData.classStd || ''}
  onChange={handleStep2Change}
  className="w-full p-3 border rounded-lg"
>
  <option value="">Select Class/Standard</option>
  <option value="1st standard">1st standard</option>
  <option value="2nd standard">2nd standard</option>
  <option value="3rd standard">3rd standard</option>
  <option value="4th standard">4th standard</option>
  <option value="5th standard">5th standard</option>
  <option value="6th standard">6th standard</option>
  <option value="7th standard">7th standard</option>
  <option value="8th standard">8th standard</option>
  <option value="9th standard">9th standard</option>
  <option value="10th standard">10th standard</option>
  <option value="11th standard / 1st PUC">11th standard / 1st PUC</option>
  <option value="12th standard / 2nd PUC">12th standard / 2nd PUC</option>
  <option value="Graduation">Graduation</option>
  <option value="Post Graduation">Post Graduation</option>
  <option value="Other">Other</option>
</select>

              {formErrors.classStd && <p className="text-red-500 text-sm">{formErrors.classStd}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium mb-1">Upload Student Photo <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="file" 
                  name="studentPhoto" 
                  onChange={handleStep2Change}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-red-800 text-white px-4 py-2 text-sm font-medium">
                    Choose File
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                    {formData.studentPhoto ? formData.studentPhoto.name : 'No file chosen'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
                {formErrors.studentPhoto && (
  <p className="text-red-500 text-sm mt-1">{formErrors.studentPhoto}</p>
)}

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Current Study Certificate/Fees Receipt <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="file" 
                  name="certificate" 
                  onChange={handleStep2Change}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-red-800 text-white px-4 py-2 text-sm font-medium">
                    Choose File
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                    {formData.certificate ? formData.certificate.name : 'No file chosen'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
                {formErrors.certificate && (
  <p className="text-red-500 text-sm mt-1">{formErrors.certificate}</p>
)}

              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-4 md:col-span-2">
              <div className="w-full md:w-1/2">
                <div className="text-gray-500 border p-4 rounded-lg flex items-center justify-center mb-1">
                  <img src="/images/QRScanner.png" alt="QR Code" />
                </div>
                {/* Application Fee Display */}
                {getApplicationFee() && (
                  <div className="text-center text-sm font-medium text-[rgba(137,12,37,1)] bg-red-50 p-2 rounded-lg">
                    {getApplicationFee()}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium mb-1">Attach Payment Screenshot <span className="text-red-500">*</span></label>
                <div className="relative mb-4">
                  <input 
                    type="file" 
                    name="screenshot" 
                    onChange={handleStep2Change}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-red-800 text-white px-4 py-2 text-sm font-medium">
                      Choose File
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                      {formData.screenshot ? formData.screenshot.name : 'No file chosen'}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
                  {formErrors.screenshot && (
  <p className="text-red-500 text-sm mt-1">{formErrors.screenshot}</p>
)}

                </div>

                <label className="block text-sm font-medium mb-1">UTR Transaction ID <span className="text-red-500">*</span></label>
                <input
                  name="utrId"
                  value={formData.utrId || ''}
                  placeholder="Enter UTR Transaction ID"
                  onChange={handleStep2Change}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-m font-medium text-[rgba(137,12,37,1)] border border-[rgba(137,12,37,1)] rounded-md"
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              className={`px-5 py-2 text-sm text-white font-semibold rounded-md transition ${
                isStep2Valid ? 'bg-[rgba(137,12,37,1)] hover:bg-red-900' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isStep2Valid}
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-100 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[rgba(137,12,37,1)] rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-black mb-6">Bank Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-left">
              Parent/Guardian Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              placeholder="Enter AccountHolder Name"
              onChange={handleStep3Change}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            {formErrors.accountHolderName && <p className="text-red-500 text-sm mt-1">{formErrors.accountHolderName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-left">
              ACCOUNT NUMBER <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleStep3Change}
              placeholder="Enter your A/C Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            {formErrors.accountNumber && <p className="text-red-500 text-sm mt-1">{formErrors.accountNumber}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-left">
              IFSC CODE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleStep3Change}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            {formErrors.ifscCode && <p className="text-red-500 text-sm mt-1">{formErrors.ifscCode}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-left">
              Upload Bank Passbook Photo
            </label>
            <div
              className={`border-2 border-dashed p-6 rounded-lg text-center relative transition ${
                dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } ${formData.bankPassbook ? 'border-green-500 bg-green-50' : ''}`}
              onDragOver={handleStep3DragOver}
              onDragLeave={handleStep3DragLeave}
              onDrop={handleStep3Drop}
              tabIndex={0}
              aria-label="Upload bank passbook file"
            >
              <input
                type="file"
                name="bankPassbook"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleStep3Change}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {!formData.bankPassbook ? (
                <div className="flex flex-col items-center">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Upload Image</p>
                  <p className="text-xs text-gray-500">Drag and drop click and upload passbook</p>
                </div>
              ) : (
                <div className="flex items-center justify-center text-green-600 font-medium gap-2">
                  <CheckCircle size={20} />
                  <span>{formData.bankPassbook.name}</span>
                </div>
              )}
            </div>
            {formErrors.bankPassbook && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={16} /> {formErrors.bankPassbook}</p>}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-[rgba(137,12,37,1)] border border-[rgba(137,12,37,1)] rounded-md flex items-center gap-1"
            >
              ← Back
            </button>

            <button
            onClick={() => {
    if (isStep3Valid) {
      setShowPreviewModal(true); // Show preview modal
    }
  }}
              className={`px-5 py-2 text-sm text-white font-semibold rounded-md transition ${
                isStep3Valid ? 'bg-[rgba(137,12,37,1)] hover:bg-red-900' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isStep3Valid}
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
{showPreviewModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-4 rounded-3xl shadow-lg border-4 border-[rgba(137,12,37,1)] w-full max-w-4xl max-h-screen overflow-y-auto">
      <div className="bg-white rounded-xl p-4 md:p-6 w-full relative">
        {/* Close Icon */}
        <button
          onClick={() => setShowPreviewModal(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-4xl"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl text-center font-bold mb-6 text-[rgba(137,12,37,1)]">
          Confirm Your Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm text-gray-800">
          <div>
            <label className="font-semibold block mb-1">Full Name</label>
            <div className="border px-3 py-2 rounded">
              {formData.firstName} {formData.lastName}
            </div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Student Aadhar Card Number</label>
            <div className="border px-3 py-2 rounded">{formData.aadharNumber}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Parent/Guardian Name</label>
            <div className="border px-3 py-2 rounded">{formData.guardianName}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Parent/Guardian Mobile Number</label>
            <div className="border px-3 py-2 rounded">{formData.guardianMobile}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Board of Education</label>
            <div className="border px-3 py-2 rounded">{formData.board}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Present Class/Standards</label>
            <div className="border px-3 py-2 rounded">{formData.classStd}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Marks Obtained Of Total Marks</label>
            <div className="border px-3 py-2 rounded">{formData.marks}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Full name of school/college/University</label>
            <div className="border px-3 py-2 rounded">{formData.school}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">ACCOUNT NUMBER</label>
            <div className="border px-3 py-2 rounded">{formData.accountNumber}</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">IFSC CODE</label>
            <div className="border px-3 py-2 rounded">{formData.ifscCode}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            onClick={() => setShowPreviewModal(false)}
            className="flex items-center justify-center text-[rgba(137,12,37,1)] border border-[rgba(137,12,37,1)] px-4 py-2 rounded-md w-full sm:w-auto"
          >
            ✎ Edit
          </button>
          <button
            className="bg-[rgba(137,12,37,1)] text-white px-6 py-2 rounded-md hover:bg-red-900 w-full sm:w-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{showSuccessModal && (
 <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
      <div className="flex flex-col items-center">
        {/* Green Checkmark */}
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Form Submitted Successfully!</h3>
        <p className="text-gray-700 mb-6">Your scholarship application has been saved.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
  
}