import React, { useState, useEffect } from "react";
import request from "../api.js"; // adjust the path if needed
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog } from '@headlessui/react';
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolder: "",
    utrId: "",
    screenshot: null,
    applicationFees: "", // NEW FIELD
  });

  const [qrImage, setQrImage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    } else {
      alert("Signup data not found. Please go back and complete signup.");
      window.location.href = "/agent-signup";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
      setUploadedFileName(file.name);
      setErrors((prev) => ({ ...prev, screenshot: "" }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
      setUploadedFileName(file.name);
      setErrors((prev) => ({ ...prev, screenshot: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = "Account holder name is required";
      hasError = true;
    }
    if (!formData.utrId.trim()) {
      newErrors.utrId = "UTR ID is required";
      hasError = true;
    }
    if (!formData.applicationFees) {
      newErrors.applicationFees = "Application fees selection is required";
      hasError = true;
    }
    if (!formData.screenshot) {
      newErrors.screenshot = "Payment screenshot is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError && signupData) {
      const payload = new FormData();
      payload.append("first_name", signupData.firstName);
      payload.append("last_name", signupData.lastName);
      payload.append("phone_number", signupData.phone);
      payload.append("password", signupData.password);
      if (signupData.agentid) {
        payload.append("agentid", signupData.agentid);
      }
      payload.append("account_holder_name", formData.accountHolder);
      payload.append("utr_id", formData.utrId);
      payload.append("application_fees", formData.applicationFees); // NEW
      payload.append("payment_screenshot", formData.screenshot);

      try {
        await request("/payment-info/", "POST", payload, null, true);
        setShowSuccessModal(true);
        localStorage.removeItem("signupData");
      } catch (error) {
        alert("Submission failed: " + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen">
      {/* Left - Payment Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Payment</h2>

          {/* Account Holder */}
          <div>
            <label className="block mb-1 font-medium">
              Account Holder Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="accountHolder"
              placeholder="Enter accountHolder Name"
              value={formData.accountHolder}
              onChange={handleChange}
              className={`w-full rounded px-4 py-3 text-base border ${
                errors.accountHolder ? "border-red-600" : "border-black"
              } focus:outline-none focus:ring-2 ${
                errors.accountHolder
                  ? "focus:ring-red-600"
                  : "focus:ring-[rgba(137,12,37,1)]"
              }`}
            />
            {errors.accountHolder && (
              <p className="text-sm text-red-600 mt-1">{errors.accountHolder}</p>
            )}
          </div>

          {/* UTR ID */}
          <div>
            <label className="block mb-1 font-medium">
              UTR Transaction ID <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="7654367844"
              name="utrId"
              value={formData.utrId}
              onChange={handleChange}
              className={`w-full rounded px-4 py-3 text-base border ${
                errors.utrId ? "border-red-600" : "border-black"
              } focus:outline-none focus:ring-2 ${
                errors.utrId
                  ? "focus:ring-red-600"
                  : "focus:ring-[rgba(137,12,37,1)]"
              }`}
            />
            {errors.utrId && (
              <p className="text-sm text-red-600 mt-1">{errors.utrId}</p>
            )}
          </div>

          {/* Application Fees Dropdown */}
          <div>
            <label className="block mb-1 font-medium">
              Select Application Fees <span className="text-red-600">*</span>
            </label>
            <select
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              className={`w-full rounded px-4 py-3 text-base border ${
                errors.applicationFees ? "border-red-600" : "border-black"
              } focus:outline-none focus:ring-2 ${
                errors.applicationFees
                  ? "focus:ring-red-600"
                  : "focus:ring-[rgba(137,12,37,1)]"
              }`}
            >
              <option value="">Select Application Fees Type</option>
              <option value="250">Rs. 250</option>
              <option value="3000">Rs. 3000</option>
            </select>
            {errors.applicationFees && (
              <p className="text-sm text-red-600 mt-1">{errors.applicationFees}</p>
            )}
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Payment Screenshot <span className="text-red-600">*</span>
            </label>
            <div
              className={`border-2 rounded h-40 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : formData.screenshot
                  ? "border-green-500"
                  : "border-gray-400"
              } border-dashed`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              tabIndex={0}
              aria-label="Upload payment screenshot"
            >
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  name="screenshot"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {!formData.screenshot ? (
                  <div className="flex flex-col items-center text-center">
                    <Upload size={28} />
                    <p className="text-sm">Drag and drop or click to upload screenshot</p>
                    <p className="text-xs text-gray-500">(JPG/PNG only, max 5MB)</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-green-600 text-center">
                    <CheckCircle size={28} />
                    <p className="text-sm font-medium" aria-live="polite">
                      File uploaded: {uploadedFileName}
                    </p>
                  </div>
                )}
              </label>
            </div>
            {errors.screenshot && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.screenshot}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[rgba(137,12,37,1)] text-white text-lg font-semibold py-3 rounded hover:bg-red-800"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
            <div className="flex flex-col items-center">
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
              <h3 className="text-xl font-semibold text-green-700 mb-2">Registration Successful</h3>
              <p className="text-gray-700 mb-6">Your account has been created successfully.</p>
              <button
                onClick={() => navigate("/agent-login")}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Right - QR Section (untouched) */}
      <div className="w-full md:w-1/2 bg-[rgba(137,12,37,1)] flex flex-col items-center justify-center p-6 text-white">
        {!qrImage ? (
          <>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Select For Payment</h2>
            <div className="mb-8 w-4/5 md:w-3/4 max-w-md">
              <img
                src="/images/paymentillustrator.png"
                alt="Payment Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                className="bg-blue-600 px-6 py-3 rounded text-white text-base md:text-lg hover:bg-blue-700"
                onClick={() => setQrImage("/images/QRcode250.png")}
              >
                Distributor/Rs.250
              </button>
              <button
                className="bg-blue-600 px-6 py-3 rounded text-white text-base md:text-lg hover:bg-blue-700"
                onClick={() => setQrImage("/images/QRcode3000.png")}
              >
                Distributor/Rs.3000
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs flex flex-col items-center">
            <img
              src={qrImage}
              alt="QR Code"
              className="mb-4 h-auto w-full object-contain"
            />
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setQrImage("")}
            >
              Change Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
