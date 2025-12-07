import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api.js"; 
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: "" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { phone: "", password: "" };

    if (!phone) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      setLoading(true);
      const res = await request("/login/", "POST", { phone, password });
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/AgentWelcome");
    } catch (error) {
      alert("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left Side - Welcome and Image */}
      <div className="w-100 md:w-1/2 relative hidden md:block">
        <div className="absolute inset-0 bg-black opacity-40 "></div>
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: 'url("images/agentlog.png")'}}
        ></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Log in</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone No
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Enter your phone Number."
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full border rounded px-4 py-2 focus:outline-none ${
                  errors.phone
                    ? "border-red-600 focus:ring-2 focus:ring-red-600"
                    : "border-[rgba(137,12,37,1)] focus:ring-2 focus:ring-[rgba(137,12,37,1)]"
                }`}
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  className={`w-full border rounded px-4 py-2 pr-10 focus:outline-none ${
                    errors.password
                      ? "border-red-600 focus:ring-2 focus:ring-red-600"
                      : "border-[rgba(137,12,37,1)] focus:ring-2 focus:ring-[rgba(137,12,37,1)]"
                  }`}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c1.478 0 2.879.344 4.167.958" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="/agent-forgot-password" className="text-[rgba(137,12,37,1)] hover:underline">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[rgba(137,12,37,1)] hover:bg-red-800 text-white py-2 rounded text-lg font-semibold"
            >
              Log In
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <a href="/agent-signup" className="text-[rgba(137,12,37,1)] hover:underline font-medium">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
