import React, { useState, useEffect } from 'react';
import request from "../api.js";
import { useNavigate } from "react-router-dom";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    occupation: '',
    application_date: '',
    membership_type: 'exclusive',
    full_name: '',
    place_of_birth: '',
    date_of_birth: '',
    full_address: '',
    status: '',
    nationality: '',
    postcode: '',
    religion: '',
    city: '',
    email: '',
    gender: '',
    reference: '',
    mobileNumber: '',
    driving_license: '',
    membershipName: '',
    signature_photo: null,
    payment_screenshot: null,
    utr_transaction_id: ''
  });

  const [errors, setErrors] = useState({});
  const [signatureFileName, setSignatureFileName] = useState('');
  const [paymentFileName, setPaymentFileName] = useState('');
  const [showModal, setShowModal] = useState(false);

const navigate = useNavigate();
  // Auto-fill membership name based on full name
  useEffect(() => {
    if (formData.full_name) {
      setFormData(prev => ({ ...prev, membershipName: formData.full_name }));
    }
  }, [formData.full_name]);


  // Set today's date automatically
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, application_date: today }));
  }, []);

//   referece number from the link
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    setFormData((prev) => ({ ...prev, reference: ref }));
  }
}, []);

useEffect(() => {
  const stored = localStorage.getItem("member");
  if (stored) {
    const { first_name, last_name, custom_id,phone } = JSON.parse(stored);
    const full = `${first_name} ${last_name}`;
    setFormData((prev) => ({
      ...prev,
      full_name: full,
      membershipName: full,
      customId: custom_id,
      mobileNumber: phone 
    }));
  }
}, []);



  const membershipPrices = {
    regular: 1000,
    exclusive: 2500,
    vip: 5000
  };

  const requiredFields = [
    'occupation', 'full_name', 'place_of_birth', 'date_of_birth', 'full_address', 
    'status', 'nationality', 'postcode', 'religion', 'city', 'email', 
    'gender', 'mobileNumber', 'driving_license', 'utr_transaction_id'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMembershipTypeChange = (type) => {
    setFormData(prev => ({ ...prev, membership_type: type }));
  };

  const handleStatusChange = (statusValue) => {
    setFormData(prev => ({ ...prev, status: statusValue }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (type === 'signature') {
        setFormData(prev => ({ ...prev, signature_photo: file }));
        setSignatureFileName(file.name);
      } else if (type === 'payment') {
        setFormData(prev => ({ ...prev, payment_screenshot: file }));
        setPaymentFileName(file.name);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile number validation
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
  if (!validateForm()) return;

  const payload = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key !== "membershipName" && value !== null) {
      payload.append(key, value);
    }
  });

  try {
    const res = await request(`/member-update/${formData.customId}/`, "PUT", payload, null, true);
      setShowModal(true); 
  } catch (err) {
    alert("Failed to update membership info.");
    console.error("Update Error:", err);
  }
};


 const getInputClassName = (fieldName) => {
  const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]";
  return errors[fieldName] ? `${baseClass} border-red-500` : `${baseClass} border-gray-300`;
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
    

      {/* Membership Form Title */}
      <div className="text-center mb-8">
        <div className="inline-block bg-[#890C25] text-white px-8 py-3 rounded-md">
          <h1 className="text-xl font-semibold">Membership Form</h1>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8">
        To Apply For Membership Please Complete All Questions.
      </h2>

      <div className="space-y-6">
        {/* Occupation and Application Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Occupation <span className="text-[#890C25]">*</span>
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              placeholder="Your Occupation"
              className={getInputClassName('occupation')}
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
  Application Date <span className="text-[#890C25]">*</span>
</label>
<input
  type="date"
  name="application_date"
  value={formData.application_date}
  readOnly
  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#800000]"
/>

          </div>
        </div>

        {/* Membership Type */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Membership Type: <span className="text-[#890C25]">*</span>
  </label>
  <div className="flex flex-wrap gap-4">
    {['regular', 'exclusive', 'vip'].map((type) => (
      <div
        key={type}
        className={`min-w-[120px] text-center px-6 py-4 text-base rounded-xl cursor-pointer transition-all ${
          formData.membership_type === type
            ? 'border-2 border-[#800000] bg-white font-semibold'
            : 'bg-white shadow-md hover:shadow-lg'
        }`}
        onClick={() => handleMembershipTypeChange(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
    ))}
  </div>
</div>


        {/* Terms & Conditions */}
        <div className="text-center">
          <div className="inline-block bg-[#890C25] text-white px-8 py-3 rounded-md mb-4">
            <h3 className="text-lg font-semibold">TERMS & CONDITIONS</h3>
          </div>
          <p className="text-gray-700">
            All information provided must be accurate and complete. Any false
            information may result in disqualification.
          </p>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#890C25] pb-2">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={getInputClassName('full_name')}
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Place of Birth <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="place_of_birth"
                value={formData.place_of_birth}
                onChange={handleInputChange}
                placeholder="Place of Birth"
                className={getInputClassName('place_of_birth')}
              />
              {errors.place_of_birth && <p className="text-red-500 text-sm mt-1">{errors.place_of_birth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className={getInputClassName('date_of_birth')}
              />
              {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address <span className="text-[#890C25]">*</span>
              </label>
              <textarea
                name="full_address"
                value={formData.full_address}
                onChange={handleInputChange}
                placeholder="Enter Your Full Address"
                rows="4"
                className={getInputClassName('full_address')}
              ></textarea>
              {errors.full_address && <p className="text-red-500 text-sm mt-1">{errors.full_address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-[#890C25]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['Single', 'Married', 'Divorce', 'Others'].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="mr-2"
                    />
                    {status}
                  </label>
                ))}
              </div>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                placeholder="Nationality"
                className={getInputClassName('nationality')}
              />
              {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                placeholder="Postcode"
                className={getInputClassName('postcode')}
              />
              {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder="Religion"
                className={getInputClassName('religion')}
              />
              {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={getInputClassName('city')}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={getInputClassName('email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-[#890C25]">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={getInputClassName('gender')}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Reference ID
  </label>
  <input
    type="text"
    name="reference"
    value={formData.reference}
    readOnly
    placeholder="Reference"
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#800000]"
  />
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number <span className="text-[#890C25]">*</span>
              </label>
              <input
  type="tel"
  name="mobileNumber"
  value={formData.mobileNumber}
  readOnly
  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#800000]"
/>

              {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driving Licence <span className="text-[#890C25]">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="driving_license"
                    value="Yes"
                    checked={formData.driving_license === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="driving_license"
                    value="No"
                    checked={formData.driving_license === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.driving_license && <p className="text-red-500 text-sm mt-1">{errors.driving_license}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicants / Membership Name:
            </label>
            <input
              type="text"
              name="membershipName"
              value={formData.membershipName}
              readOnly
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Signature Photo <span className="text-[#890C25]">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'signature')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-[#890C25] text-white px-4 py-2 text-sm font-medium">
                    Choose File
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                    {signatureFileName || 'No file chosen'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Payment Screenshot <span className="text-[#890C25]">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'payment')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-[#890C25] text-white px-4 py-2 text-sm font-medium">
                    Choose File
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 flex-1">
                    {paymentFileName || 'No file chosen'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">PNG or JPG (MAX: 5MB)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              {/* QR Code placeholder */}
             
                <div className="w-full md:w-1/2">
                <div className="text-gray-500 border p-4 rounded-lg flex items-center justify-center mb-1">
                  <img src="/images/QRScanner.png" alt="QR Code" />
                </div>
                  <p className="text-center text-sm font-medium text-[rgba(137,12,37,1)] bg-red-50 p-2 rounded-lg">
                    The application fees is Rs.{membershipPrices[formData.membership_type]}/-
                  </p>
                </div>
            
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UTR Transaction ID <span className="text-[#890C25]">*</span>
              </label>
              <input
                type="text"
                name="utr_transaction_id"
                value={formData.utr_transaction_id}
                onChange={handleInputChange}
                placeholder="Enter Your UTR Transaction ID"
                className={getInputClassName('utr_transaction_id')}
              />
              {errors.utr_transaction_id && <p className="text-red-500 text-sm mt-1">{errors.utr_transaction_id}</p>}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <strong className="text-[#890C25]">Notes:</strong> By registering, you agree to the collection and use of your personal
              information for Dashapta Seva Trust® purposes as outlined in our privacy policy.
            </p>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#890C25] text-white px-12 py-3 rounded-md text-lg font-semibold hover:bg-[#6b0a1c] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-[#890C25] flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-[#890C25] mb-2">Membership Registered Successfully</h2>
      <p className="text-gray-700 mb-6">Thank you for your submission!</p>
      <button
        onClick={() => {
    setShowModal(false);        
    navigate("/Loan-Dashboard"); 
  }}
        className="bg-[#890C25] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6b0a1c]"
      >
        Okay
      </button>
    </div>
  </div>
)}

    </div>
    
  );
};

export default MembershipForm;