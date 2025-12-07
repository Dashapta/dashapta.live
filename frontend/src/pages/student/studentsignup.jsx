  import React, { useState, useEffect } from "react";
  import { Eye, EyeOff } from "lucide-react";
  import request from "../api";
  import { useNavigate, useLocation } from "react-router-dom";

  export default function SignupPage1() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPhoneExistsModal, setShowPhoneExistsModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
      agentid: null,
      agent_custom_id: "",
    });

    const location = useLocation();
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const custom_id = params.get("agent_id");

      if (custom_id) {
        setFormData((prev) => ({
          ...prev,
          agent_custom_id: custom_id,
        }));

        request("/get-agent-id/", "post", { custom_id })
          .then((res) => {
            if (res.agentid) {
              setFormData((prev) => ({
                ...prev,
                agentid: Number(res.agentid),
              }));
            } else {
              console.warn("No agent found for custom_id");
            }
          })
          .catch((err) => {
            console.error("Agent lookup failed", err);
          });
      }
    }, [location]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      const { phone_number, password, confirmPassword } = formData;

      if (!/^\d{10}$/.test(phone_number)) {
        setError("Phone number must be exactly 10 digits.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const check = await request("/student-phoneCheck/", "post", { phone_number });
        if (check.exists) {
          setShowPhoneExistsModal(true);
          return;
        }
      } catch (err) {
        console.error("Phone check failed", err);
        setError("Could not verify phone number.");
        return;
      }

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        password: formData.password,
        agentid: formData.agentid || null,
      };

      try {
        const res = await request("/student-signup/", "post", payload);
        if (res.message === "Signup successful!") {
          setShowSuccessModal(true);
        } else {
          setError("Signup failed. Please check input.");
          console.error(res);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while signing up.");
      }
    };

    return (
      <div className="min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">
        {/* Maroon Wavy Background */}
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
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full max-w-6xl h-full">
            {/* Left Side */}
            <div className="flex flex-col items-center lg:items-start justify-between h-full px-4 lg:px-8 overflow-visible">
              <div className="text-center lg:text-left mt-8 lg:mt-12">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-14 sm:h-16 mb-4 mx-auto lg:mx-0"
                />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 lg:mb-6">
                  Start Your<br />Journey with Us!
                </h1>
              </div>
              <div className="flex justify-center lg:justify-start w-full items-end">
                <img
                  src="/images/studentlogin.png"
                  alt="Signup Illustration"
                  className="w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] h-auto object-contain object-bottom"
                />
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex justify-center items-center h-full px-4 lg:px-8">
            <form
    onSubmit={handleSubmit}
    className="bg-gray-100 rounded-xl shadow-2xl px-4 py-1 sm:px-4 sm:py-2 w-full max-w-lg max-h-[90vh] overflow-y-auto"
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4 sm:mb-6">
      Sign Up
    </h2>
    {error && <p className="text-center text-red-600 text-sm mb-3">{error}</p>}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name<span className="text-red-600">*</span></label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          placeholder="First Name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-red-600">*</span></label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          placeholder="Last Name"
        />
      </div>
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone No<span className="text-red-600">*</span></label>
      <input
        type="text"
        name="phone_number"
        value={formData.phone_number}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,10}$/.test(val)) {
            setFormData((prev) => ({ ...prev, phone_number: val }));
          }
        }}
        className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
        placeholder="Phone number"
        maxLength={10}
        required
      />
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">Agent ID</label>
      <input
        type="text"
        name="agentid"
        value={formData.agent_custom_id}
        readOnly
        className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
        placeholder="Referral ID"
      />
    </div>

    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">Password<span className="text-red-600">*</span></label>
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
        placeholder="Password"
        required
      />
    </div>

    <div className="mb-3 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password<span className="text-red-600">*</span></label>
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 pr-10"
          placeholder="Confirm password"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    <div className="flex items-center mb-4">
      <label className="flex items-center text-sm">
        <input
          type="checkbox"
          name="agree"
          onChange={handleChange}
          className="mr-2"
        />
        <span>
          I agree to{" "}
          <button
            onClick={() => window.open("/student-terms", "_blank")}
            className="text-sm"
          >
            <span className="text-[rgba(137,12,37,1)] font-medium hover:text-blue-800">
              Terms & Conditions<span className="text-red-600">*</span>
            </span>
          </button>
        </span>
      </label>
    </div>

    <button
      type="submit"
      className="w-full bg-[rgba(137,12,37,1)] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-900 transition-colors"
    >
      Sign Up
    </button>

    <p className="text-sm text-center mt-4 text-gray-600">
      Already have an account?{" "}
      <a href="/student-login" className="text-red-800 font-medium hover:underline">
        Log in
      </a>
    </p>
  </form>

            </div>
          </div>
        </div>

        {/* Modals */}
        {showPhoneExistsModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Phone Number Exists</h3>
              <p className="text-gray-700 mb-6">
                The phone number you entered is already registered. Please log in or use a different number.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowPhoneExistsModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <a
                  href="/student-login"
                  className="px-4 py-2 bg-[rgba(137,12,37,1)] text-white rounded-md hover:bg-red-900"
                >
                  Go to Login
                </a>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Registration Successful</h3>
                <p className="text-gray-700 mb-6">Your account has been created successfully.</p>
                <button
                  onClick={() => navigate("/student-login")}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
