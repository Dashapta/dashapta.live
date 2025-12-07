import React, { useState,useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import request from "../api.js";

export default function LaonLoginPage() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const refs = {
    phone: useRef(null),
    password: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone Number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Phone Number must be 10 digits";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    const firstErrorField = Object.keys(newErrors)[0];
    refs[firstErrorField]?.current?.focus();
    return;
  }

  try {
    const payload = {
      phone: formData.phone,
      password: formData.password,
    };

    const res = await request("/loan-login/", "POST", payload);

    // Save member details to localStorage
    setLoginError(""); // Add this before localStorage.setItem
    localStorage.setItem("member", JSON.stringify(res));

    // Navigate to dashboard or wherever you want
    navigate("/Loan-Dashboard"); // change to your actual path
  } catch (error) {
    setLoginError("Invalid phone number or password");
    console.error("Login error:", error);
  }
};

   const renderLabel = (text) => (
    <label className="block mb-1 font-medium text-sm">
      {text} <span className="text-red-600">*</span>
    </label>
  );

  return (
    <div className="flex h-screen">
      {/* Left Image Placeholder */}
      <div className="w-1/2 relative hidden md:block">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-16 text-white">
          <img src="/path-to-logo.png" alt="Logo" className="mb-6" />
        </div>
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: 'url("/images/loanlogin.png")' }}
        ></div>
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-6 text-center">Log in</h2>
          {loginError && (
  <p className="text-center text-red-600 text-sm mb-4">{loginError}</p>
)}


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
             {renderLabel("Phone Number")}
              <input
                type="tel"
                name="phone"
                maxLength={10}
                inputMode="numeric"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#890C25]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              {renderLabel("Password")}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#890C25]"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-[#890C25]" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-[#890C25] hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forget Password ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#890C25] hover:bg-[#6f0a1d] text-white py-2 rounded font-semibold text-lg"
            >
              Log In
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/loan-signup")}
                className="text-[#890C25] hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
