import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import request from "../api.js"; // Adjust this path if needed
import { useNavigate } from 'react-router-dom';
export default function LoginPage1() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { phone: "", password: "" };

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      setLoading(true);
      const response = await request("/student-login/", "POST", {
        phone: formData.phone,
        password: formData.password,
      });
      localStorage.setItem("student", JSON.stringify(response));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setGlobalError(
        error?.response?.detail ||
        error?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[rgba(137,12,37,1)]"></div>
        <div className="absolute bottom-[30%] left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1440 120" className="w-full h-24" preserveAspectRatio="none">
            <path
              fill="rgba(137,12,37,1)"
              d="M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,16C672,11,768,21,864,32C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full max-w-6xl mx-auto">
          
          {/* Left Side */}
          <div className="flex flex-col items-center lg:items-start justify-between h-full px-4 lg:px-8 mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              {/* Logo */}
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-16 mb-4 mx-auto lg:mx-0"
              />
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black mb-2">
                Welcome<br />Back!
              </h1>
            </div>
            <div className="flex justify-center lg:justify-start w-full items-end">
              <img
                src="/images/studentlogin.png"
                alt="Login Illustration"
                className="w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] h-auto object-contain object-bottom"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center items-center w-full px-4 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 rounded-xl shadow-2xl p-8 sm:p-10 w-full max-w-md overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4">
                Log in
              </h2>

              {globalError && (
                <p className="text-red-600 text-sm text-center mb-6">{globalError}</p>
              )}

              {/* Phone Field */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                  Phone No
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setFormData({ ...formData, phone: value });
                      setErrors({ ...errors, phone: "" });
                    }
                  }}
                  className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between mb-8 text-base">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-800 focus:ring-red-800 mr-2 w-4 h-4"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="/student-forgot-password" className="text-red-800 hover:underline">
                  Forget Password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[rgba(137,12,37,1)] text-white py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-red-900 transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              {/* Signup Link */}
              <p className="text-base text-center mt-8 text-gray-600">
                Don't have an account?{" "}
                <a href="/student-signup" className="text-red-800 font-medium hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
