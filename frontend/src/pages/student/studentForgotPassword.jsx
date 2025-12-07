import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api.js";
import { Eye, EyeOff } from "lucide-react";

const SForgotPassword = ({ userType = "student" }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState(""); // <-- New state for Student/Agent ID
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      return setError("Phone number must be exactly 10 digits.");
    }

    if (!userId.trim()) {
      return setError(
        userType === "agent" ? "Agent ID is required." : "Student ID is required."
      );
    }
if (password.length < 8) {
  return setError("Password must be at least 8 characters.");
}

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setError("");

    try {
      const endpoint =
        userType === "agent" ? "/agent-reset-password/" : "/forgot-password/";

      await request(endpoint, "PUT", {
        phone_number: phone,
        password: password,
        uuid: userId, // <-- Send the Student/Agent ID
      });

      setSuccessModal(true);
    } catch (err) {
      setError("Invalid credentials. Please check your ID and phone number.");
    }
  };

  const loginRoute = userType === "agent" ? "/agent-login" : "/student-login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-gray-100 rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h2 className="text-center text-xl font-semibold mb-6 text-[rgba(137,12,37,1)]">
          Forgot Password
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="text-xs text-gray-600">Phone Number</label>
            <input
              type="text"
              value={phone}
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              maxLength={10}
            />
          </div>

          {/* Student/Agent ID */}
          <div>
            <label className="text-xs text-gray-600">
              {userType === "agent" ? "Agent ID" : "Student ID"}
            </label>
            <input
              type="text"
              value={userId}
              placeholder={
                userType === "agent"
                  ? "Enter Your Agent ID"
                  : "Enter Your Student ID"
              }
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          {/* New Password */}
          <div>
  <label className="text-xs text-gray-600">Enter New Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      placeholder="Enter your New Password"
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border rounded p-2 text-sm pr-10"
    />
    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
  </div>
</div>


          {/* Confirm Password */}
          <div>
            <label className="text-xs text-gray-600">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => navigate(loginRoute)}
              className="text-[rgba(137,12,37,1)] text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[rgba(137,12,37,1)] text-white px-4 py-2 rounded text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Password changed successfully!
            </h3>
            <button
              onClick={() => navigate(loginRoute)}
              className="bg-[rgba(137,12,37,1)] text-white px-4 py-2 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SForgotPassword;
