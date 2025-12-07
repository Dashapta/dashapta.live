import React, { useState, useRef } from "react";

import request from "../api.js";
import { Dialog } from '@headlessui/react';
import { useNavigate, useLocation } from "react-router-dom"; // ⬅️ Add this

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
    agent_custom_id: "", // read-only in input
  agentid: null, 
  });

  const [errors, setErrors] = useState({});
  const [phoneExistsModal, setPhoneExistsModal] = useState(false);
  const navigate = useNavigate();

  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    phone: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    agree: useRef(null),
  };
const location = useLocation();

React.useEffect(() => {
  const params = new URLSearchParams(location.search);
  const custom_id = params.get("agent_id");

  if (custom_id) {
    setFormData((prev) => ({
      ...prev,
      agent_custom_id: custom_id,
    }));

    request("/get-agent-id/", "POST", { custom_id })
      .then((res) => {
        if (res.agentid) {
          setFormData((prev) => ({
            ...prev,
            agentid: Number(res.agentid),
          }));
        } else {
          console.warn("Agent not found for custom_id");
        }
      })
      .catch((err) => console.error("Agent lookup failed:", err));
  }
}, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone Number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Phone Number must be 10 digits";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (!formData.agree) newErrors.agree = "You must agree to the terms";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    const firstErrorField = Object.keys(newErrors)[0];
    refs[firstErrorField]?.current?.focus();
    return;
  }

  // ✅ Now check for duplicate phone number
  try {
    const res = await request('/phone-check/',"POST",{
      phone: formData.phone,
    });

    if (res.exists) {
      setPhoneExistsModal(true); // Show modal
      return; // Prevent redirect
    }

    // ✅ Phone is unique, save to localStorage and move to payment
   const dataToSave = {
  ...formData,
  agentid: formData.agentid || null,
};
localStorage.setItem("signupData", JSON.stringify(dataToSave));

    navigate("/payment");
  } catch (error) {
    console.error("Phone check failed:", error);
    alert("Something went wrong while checking phone number. Please try again.");
  }
};


  const getInputClasses = (field) => {
    return `w-full border rounded px-5 py-3 text-base focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 ring-red-500"
        : "border-[rgba(137,12,37,1)] focus:ring-[rgba(137,12,37,1)]"
    }`;
  };

  const renderLabel = (text) => (
    <label className="block mb-1 font-medium text-sm">
      {text} 
    </label>
  );

  return (
    <div className="flex h-screen">
      {/* Left side with image and logo */}
      <div className="w-1/2 relative hidden md:block">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-16 text-white">
          <img src="/path-to-logo.png" alt="Logo" className="mb-6" />
          <h1 className="text-5xl font-bold mb-4">Start Your</h1>
          <h2 className="text-5xl font-bold">Journey with Us!</h2>
        </div>
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: 'url("/images/agentlog.png")' }}
        ></div>
      </div>

      {/* Right side - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign up</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                {renderLabel("First Name")}
                <input
                  ref={refs.firstName}
                  type="text"
                  name="firstName"
                  placeholder="Enter your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={getInputClasses("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                {renderLabel("Last Name")}
                <input
                  ref={refs.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Enter your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={getInputClasses("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              {renderLabel("Phone Number")}
              <input
                ref={refs.phone}
                type="text"
                name="phone"
                placeholder="Enter your Phone Number"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                className={getInputClasses("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
<div>
  {renderLabel("Agent ID")}
  <input
    type="text"
    name="agent_custom_id"
    value={formData.agent_custom_id}
    readOnly
    className="w-full border rounded px-5 py-3 text-base bg-gray-100 cursor-not-allowed border-gray-300"
    placeholder="Auto-filled from referral link"
  />
</div>

            <div>
              {renderLabel("Password")}
              <input
                ref={refs.password}
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={getInputClasses("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              {renderLabel("Confirm Password")}
              <input
                ref={refs.confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={getInputClasses("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-center text-sm mt-2">
              <input
                ref={refs.agree}
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
              />
              <span>
                I agree to the{" "}
                <button
                  onClick={() => window.open("/terms", "_blank")}
                  className="text-sm  "
                  >
                <span className="text-[rgba(137,12,37,1)] font-medium hover:text-blue-800">
                  Terms & Conditions <span className="text-red-600">*</span>
                </span>
                </button>
                
              </span>
            </label>
            {errors.agree && (
              <p className="text-sm text-red-600 mt-1">{errors.agree}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[rgba(137,12,37,1)] hover:bg-red-800 text-white py-3 rounded text-lg font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="/agent-login"
                className="text-[rgba(137,12,37,1)] hover:underline font-medium"
              >
                Log in
              </a>
            </p>
          </form>
        </div>

<Dialog open={phoneExistsModal} onClose={() => setPhoneExistsModal(false)} className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen px-4">
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

    {/* Modal Panel */}
    <Dialog.Panel className="bg-white rounded-2xl max-w-sm mx-auto p-6 z-50">
      <h2 className="text-2xl font-semibold text-center mb-2 text-red-700">
        Phone Number Exists
      </h2>
      <p className="text-center text-gray-600 mb-4">
        An account with this phone number already exists.
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setPhoneExistsModal(false);
            window.location.href = "/agent-signup";
          }}
          className="px-6 py-2 bg-[rgba(137,12,37,1)] text-white rounded hover:bg-red-800"
        >
          Sign up again
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>
      </div>
    </div>
  );
}
