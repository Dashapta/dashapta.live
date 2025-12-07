import React, {useEffect, useState } from "react";
import cities from "./cities-india.json"
import request from "../api"; 
import { useNavigate } from "react-router-dom";

const LabelInput = ({ label, required, error, children }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">
      {label} {required && <span className="text-[#890C25]">*</span>}
    </label>
    {children}
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState({});
  const [selectedDoc, setSelectedDoc] = useState("");
  const [otherDocsSelected, setOtherDocsSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [membershipComplete, setMembershipComplete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlreadyAppliedModal, setShowAlreadyAppliedModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

   

const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("member"));


useEffect(() => {
  const checkMembershipStatus = async () => {
    try {
      const res = await request("/check-membership-filled/", "POST", {
        uuid: user?.custom_id,
      });
      if (res.complete) {
        setMembershipComplete(true);
        setFormData(prev => ({
          ...prev,
          memberId: user.custom_id,
        }));
      } else {
        setMembershipComplete(false);
      }
    } catch (err) {
      console.error("Error checking membership status", err);
      setMembershipComplete(false);
    }
  };

 if (user?.custom_id) {
    checkMembershipStatus();
  }
}, []);



  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "mobile":
      case "nominee1Mobile":
      case "nominee2Mobile":
        if (!value) {
          error = "This field is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Mobile number must be exactly 10 digits";
        }
        break;
      
      case "aadhar":
      case "nominee1Aadhar":
      case "nominee2Aadhar":
        if (!value) {
          error = "This field is required";
        } else if (!/^\d{12}$/.test(value)) {
          error = "Aadhar number must be exactly 12 digits";
        }
        break;
      
      case "fullName":
      case "nominee1Name":
      case "nominee2Name":
        if (!value) {
          error = "This field is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name should contain only letters and spaces";
        }
        break;
      
      case "email":
        if (!value) {
          error = "This field is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      
      case "pan":
  const panValue = value.trim().toUpperCase();
  if (!panValue) {
    error = "This field is required";
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panValue)) {
    error = "Please enter a valid PAN number (e.g., ABCDE1234F)";
  }
  break;

      
      case "pincode":
        if (!value) {
          error = "This field is required";
        } else if (!/^\d{6}$/.test(value)) {
          error = "PIN code must be exactly 6 digits";
        }
        break;
      
      default:
        if (!value && isRequiredField(name)) {
          error = "This field is required";
        }
    }
    
    return error;
  };

  const isRequiredField = (name) => {
    const requiredFields = [
      "loanAmount", "loanTenure", "loanPurpose", "monthlyIncome",
      "fullName", "mobile", "email", "dob", "gender", "pan", "aadhar",
      "city", "pincode", "address", "memberId", "duration",
      "nominee1Name", "nominee1Mobile", "nominee1Aadhar",
      "nominee2Name", "nominee2Mobile", "nominee2Aadhar"
    ];
    return requiredFields.includes(name);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      // For mobile and aadhar fields, only allow digits
      if ((name.includes("Mobile") || name.includes("mobile")) && value && !/^\d*$/.test(value)) {
        return;
      }
      if ((name.includes("Aadhar") || name.includes("aadhar")) && value && !/^\d*$/.test(value)) {
        return;
      }
      if (name === "pincode" && value && !/^\d*$/.test(value)) {
        return;
      }
      
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleDocSelect = (e) => {
    const value = e.target.value;
    setSelectedDoc(value);
    setFormData((prev) => ({ ...prev, supportingDocumentType: value }));
    setOtherDocsSelected(value === "otherDocs");
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all required fields
    const requiredFields = [
      "loanAmount", "loanTenure", "loanPurpose", "monthlyIncome",
      "fullName", "mobile", "email", "dob", "gender", "pan", "aadhar",
      "city", "pincode", "address", "memberId", "duration",
      "nominee1Name", "nominee1Mobile", "nominee1Aadhar",
      "nominee2Name", "nominee2Mobile", "nominee2Aadhar"
    ];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    // Validate file uploads
    if (!formData.document) {
      newErrors.document = "Please attach a document";
    }
    
    if (!formData.signature) {
      newErrors.signature = "Please attach signature photo";
    }
    
    if (!selectedDoc) {
      newErrors.supportingDocumentType = "Please select a document type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem("member"));
    if (!formData.memberId || formData.memberId.trim() === "") {
    setShowMembershipModal(true);
    return;
  }

  const formPayload = new FormData();

  formPayload.append("memberId", user?.custom_id); // Ensure `custom_id` exists

  formPayload.append("loan_amount", formData.loanAmount);
  formPayload.append("loan_tenure", formData.loanTenure);
  formPayload.append("loan_purpose", formData.loanPurpose);
  formPayload.append("monthly_income", formData.monthlyIncome);
  formPayload.append("full_name", formData.fullName);
  formPayload.append("mobile", formData.mobile);
  formPayload.append("email", formData.email);
  formPayload.append("dob", formData.dob);
  formPayload.append("gender", formData.gender);
  formPayload.append("pan", formData.pan);
  formPayload.append("aadhar", formData.aadhar);
  formPayload.append("city", formData.city);
  formPayload.append("pincode", formData.pincode);
  formPayload.append("address", formData.address);
  formPayload.append("duration", formData.duration);

  formPayload.append("nominee1_name", formData.nominee1Name);
  formPayload.append("nominee1_mobile", formData.nominee1Mobile);
  formPayload.append("nominee1_aadhar", formData.nominee1Aadhar);
  formPayload.append("nominee2_name", formData.nominee2Name);
  formPayload.append("nominee2_mobile", formData.nominee2Mobile);
  formPayload.append("nominee2_aadhar", formData.nominee2Aadhar);

  formPayload.append("supporting_document_type", formData.supportingDocumentType);
  formPayload.append("supporting_document", formData.document);
  formPayload.append("signature", formData.signature);

  if (formData.otherDocsExplain) {
    formPayload.append("other_docs_explain", formData.otherDocsExplain);
  }

  try {
    const result = await request("/apply-loan/", "POST", formPayload, null, true);
    setShowSuccessModal(true);
  } catch (err) {
  if (err?.response?.data?.error === "Loan application already submitted for this member.") {
    setShowAlreadyAppliedModal(true); // or your own modal state
  } else {
    setGeneralError("Something went wrong.");
  }
}
};


  const getInputClassName = (fieldName) => {
    const baseClass = "border p-3 rounded focus:outline-[#890C25]";
    return errors[fieldName] ? `${baseClass} border-red-500` : `${baseClass} border-gray-300`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-sm md:text-base font-[Inter]">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h1 className="bg-[#890C25] text-white text-3xl font-semibold py-4 px-10 rounded text-center mx-auto">
          Apply Interest Free Loan
        </h1>
      </div>

      <h2 className="text-xl font-bold mb-4 border-b-4 border-[#890C25] w-fit">Apply Now</h2>

      {/* Loan Details */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <LabelInput label="Loan Amount" required error={errors.loanAmount}>
          <input
            name="loanAmount"
            type="number"
            placeholder="Loan amount"
            required
            value={formData.loanAmount || ""}
            onChange={handleChange}
            className={getInputClassName("loanAmount")}
          />
        </LabelInput>
        <LabelInput label="Loan Tenure" required error={errors.loanTenure}>
          <select
            name="loanTenure"
            required
            value={formData.loanTenure || ""}
            onChange={handleChange}
            className={getInputClassName("loanTenure")}
          >
            <option value="">Select Tenure</option>
            {["1 month", "6 months", "1 year", "2 year", "3 year", "4 year"].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </LabelInput>
        <LabelInput label="Purpose of Loan" required error={errors.loanPurpose}>
          <select
            name="loanPurpose"
            required
            value={formData.loanPurpose || ""}
            onChange={handleChange}
            className={getInputClassName("loanPurpose")}
          >
            <option value="">Select Purpose</option>
            {["personal", "education", "medical expenses", "house allowance", "house renovation", "vechiles purchase", "gold purchase", "propeerty purchase", "micro business purpose"].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </LabelInput>
        <LabelInput label="Monthly Income" required error={errors.monthlyIncome}>
          <input
            name="monthlyIncome"
            type="number"
            placeholder="Monthly Income"
            required
            value={formData.monthlyIncome || ""}
            onChange={handleChange}
            className={getInputClassName("monthlyIncome")}
          />
        </LabelInput>
      </section>

      {/* Personal Details */}
      <h2 className="text-xl font-bold mb-4 border-b-4 border-[#890C25] w-fit">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <LabelInput label="Full Name (As per PAN CARD)" required error={errors.fullName}>
          <input
            name="fullName"
            placeholder="Full Name"
            required
            onChange={handleChange}
            value={formData.fullName || ""}
            className={getInputClassName("fullName")}
          />
        </LabelInput>
        <LabelInput label="Mobile Number" required error={errors.mobile}>
          <input
            name="mobile"
            type="tel"
            maxLength="10"
            placeholder="Mobile Number"
            required
            onChange={handleChange}
            value={formData.mobile || ""}
            className={getInputClassName("mobile")}
          />
        </LabelInput>
        <LabelInput label="Email" required error={errors.email}>
          <input 
            name="email" 
            type="email" 
            placeholder="Enter your Email" 
            required 
            value={formData.email || ""} 
            onChange={handleChange} 
            className={getInputClassName("email")} 
          />
        </LabelInput>
        <LabelInput label="Date of Birth" required error={errors.dob}>
          <input 
            name="dob" 
            type="date" 
            required 
            value={formData.dob || ""} 
            onChange={handleChange} 
            className={getInputClassName("dob")} 
          />
        </LabelInput>
        <LabelInput label="Gender" required error={errors.gender}>
          <select 
            name="gender" 
            required 
            value={formData.gender || ""} 
            onChange={handleChange} 
            className={getInputClassName("gender")}
          >
            <option value="">Select Gender</option>
            {['male', 'female', 'others'].map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </LabelInput>
        <LabelInput label="PAN Number" required error={errors.pan}>
          <input 
            name="pan" 
            placeholder="PAN Number" 
            required 
            value={formData.pan || ""} 
            onChange={handleChange} 
            className={getInputClassName("pan")}
            style={{ textTransform: 'uppercase' }}
          />
        </LabelInput>
        <LabelInput label="Aadhar Card Number" required error={errors.aadhar}>
          <input
            name="aadhar"
            type="text"
            maxLength="12"
            placeholder="Aadhar Card Number"
            required
            value={formData.aadhar || ""}
            onChange={handleChange}
            className={getInputClassName("aadhar")}
          />
        </LabelInput>
        <LabelInput label="Select City" required error={errors.city}>
          <select 
            name="city" 
            required 
            value={formData.city || ""} 
            onChange={handleChange} 
            className={getInputClassName("city")}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </LabelInput>
        <LabelInput label="Pin Code" required error={errors.pincode}>
          <input 
            name="pincode" 
            type="text" 
            maxLength="6"
            placeholder="Enter Pin Code" 
            required 
            value={formData.pincode || ""} 
            onChange={handleChange} 
            className={getInputClassName("pincode")} 
          />
        </LabelInput>
        <LabelInput label="Full Address" required error={errors.address}>
          <input 
            name="address" 
            placeholder="Enter your full address" 
            required 
            value={formData.address || ""} 
            onChange={handleChange} 
            className={getInputClassName("address")} 
          />
        </LabelInput>
        <LabelInput label="Membership/Beneficiary ID" required error={errors.memberId}>
  <input 
    name="memberId"
    placeholder="ID Number"
    required
    value={formData.memberId || ""}
    onChange={handleChange}
    readOnly // <-- make it readonly only when complete
    className={getInputClassName("memberId") + (membershipComplete ? " bg-gray-100 cursor-not-allowed" : "")}
  />
</LabelInput>

        <LabelInput label="Duration Of Associate Trust" required error={errors.duration}>
          <input 
            name="duration" 
            placeholder="Duration" 
            required 
            value={formData.duration || ""} 
            onChange={handleChange} 
            className={getInputClassName("duration")} 
          />
        </LabelInput>
      </div>

      <h2 className="text-xl font-bold mb-4 border-b-[5px] border-[#890C25] w-fit">Supporting Documents (Tick And Attach Copies)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          {[
            { label: "ID Proof (Aadhar, PAN, Voter ID)", value: "idProof" },
            { label: "Income Proof (if any)", value: "incomeProof" },
            { label: "Trust Membership Proof / Certificate", value: "trustProof" },
            { label: "Any other relevant documents (explain):", value: "otherDocs" },
          ].map((opt) => (
            <label key={opt.value} className="block">
              <input
                type="radio"
                name="supportingDocumentType"
                value={opt.value}
                checked={selectedDoc === opt.value}
                onChange={handleDocSelect}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
          {errors.supportingDocumentType && (
            <span className="text-red-500 text-xs">{errors.supportingDocumentType}</span>
          )}
        </div>
        <div>
          <LabelInput label="Attach Document" required error={errors.document}>
            <div className="relative">
              <input
                type="file"
                name="document"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`flex items-center bg-gray-200 rounded-lg overflow-hidden ${errors.document ? 'border-2 border-red-500' : ''}`}>
                <div className="bg-[#890C25] text-white px-4 py-2 text-sm font-medium">
                  Choose File
                </div>
                <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                  {formData.document ? formData.document.name : "No file chosen"}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">PDF, PNG or JPG (MAX: 2MB)</div>
            </div>
            <textarea
              name="otherDocsExplain"
              placeholder="Enter Text"
              disabled={!otherDocsSelected}
              value={formData.otherDocsExplain || ""}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 mt-4 rounded min-h-[60px] focus:outline-[#890C25]"
            />
          </LabelInput>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 border-b-[5px] border-[#890C25] w-fit">
        Please Specify 2 Nominees Name & Mobile Number
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2].map((n) => (
          <React.Fragment key={n}>
            <LabelInput label={`Nominee${n} Name`} required error={errors[`nominee${n}Name`]}>
              <input
                name={`nominee${n}Name`}
                placeholder={`Nominee${n} Name`}
                onChange={handleChange}
                value={formData[`nominee${n}Name`] || ""}
                required
                className={getInputClassName(`nominee${n}Name`)}
              />
            </LabelInput>

            <LabelInput label={`Nominee${n} Mobile No`} required error={errors[`nominee${n}Mobile`]}>
              <input
                name={`nominee${n}Mobile`}
                type="tel"
                maxLength="10"
                placeholder="Mobile No"
                onChange={handleChange}
                value={formData[`nominee${n}Mobile`] || ""}
                required
                className={getInputClassName(`nominee${n}Mobile`)}
              />
            </LabelInput>

            <LabelInput label={`Nominee${n} Aadhar Number`} required error={errors[`nominee${n}Aadhar`]}>
              <input
                name={`nominee${n}Aadhar`}
                type="text"
                maxLength="12"
                placeholder="Aadhar Number"
                onChange={handleChange}
                value={formData[`nominee${n}Aadhar`] || ""}
                required
                className={getInputClassName(`nominee${n}Aadhar`)}
              />
            </LabelInput>
          </React.Fragment>
        ))}
      </div>

      <p className="mb-4">
        I, <span className="underline font-semibold">{formData.fullName || "___________________________"}</span>, declare that the above information is true to the best of my knowledge. I understand that this loan is being provided interest-free for the specific purpose mentioned above and I agree to repay it within the agreed time frame.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Attach Signature Photo <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            name="signature"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          <div className={`flex items-center bg-gray-200 rounded-lg overflow-hidden ${errors.signature ? 'border-2 border-red-500' : ''}`}>
            <div className="bg-[#890C25] text-white px-4 py-2 text-sm font-medium">
              Choose File
            </div>
            <div className="px-4 py-2 text-sm text-gray-600 flex-1">
              {formData.signature ? formData.signature.name : 'No file chosen'}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
        </div>
        {errors.signature && (
          <span className="text-red-500 text-xs mt-1">{errors.signature}</span>
        )}
      </div>

      <label className="block mb-6">
        <input type="checkbox" name="agree" required className="mr-2" />
        I agree to the <a href="/loan-terms" className="text-[#890C25] underline" target="_blank">Dashapata.live (terms and conditions and, Privacy Policy)</a>
      </label>

      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#890C25] text-white px-10 py-3 rounded text-lg hover:bg-[#71091F] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Apply Now"}
        </button>
      </div>
      {showSuccessModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
      
      {/* Circle with Tick */}
      <div className="flex justify-center -mt-14">
        <div className="bg-[#890C25] w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Modal content */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-[#890C25] mb-4">Application Submitted!</h2>
        <p className="mb-6 text-gray-700">
          Your loan application has been submitted successfully. We’ll contact you soon.
        </p>
        <button
          onClick={() =>{
  setShowSuccessModal(false);
  navigate("/Loan-Dashboard"); // or wherever
}}
          className="bg-[#890C25] text-white px-6 py-2 rounded-md hover:bg-[#6c0a1d]"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showAlreadyAppliedModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
      
      {/* Circle with Red Cross Icon */}
      <div className="flex justify-center -mt-14">
        <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Modal Content */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Already Applied!</h2>
        <p className="mb-6 text-gray-700">
          Loan application has already been submitted for this membership ID.
        </p>
        <button
          onClick={() => {setShowAlreadyAppliedModal(false)
             navigate("/Loan-Dashboard"); 
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showMembershipModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
      
      {/* Circle with Warning Icon */}
      <div className="flex justify-center -mt-14">
        <div className="bg-yellow-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z" />
          </svg>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">Complete Membership First</h2>
        <p className="mb-6 text-gray-700">
          To apply for a loan, you need to first fill out the membership form.
        </p>
        <button
          onClick={() => {
            setShowMembershipModal(false);
            navigate("/membership"); // 🔁 change route if needed
          }}
          className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700"
        >
          Apply Membership Form
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}