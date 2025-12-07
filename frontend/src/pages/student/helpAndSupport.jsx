import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaHeadphones } from 'react-icons/fa';
import request from "../api.js";

export default function SupportForm() {

 
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

 const handleSend = async () => {
  if (query.trim()) {
    const user = JSON.parse(localStorage.getItem("student"));
    try {
      await request("/submit-query/", "POST", {
        uuid: user.uuid,
        query_text: query,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Failed to submit query:", error);
    }
  }
};

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        {/* Maroon Circle with White Headphones Icon */}
       

        {/* Square Placeholder (Responsive) */}
        <div className="w-104 h-64  rounded-xl mb-6 flex items-center justify-center text-gray-500 text-sm">
         <img src="/images/help.png" alt="Help & Support" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Are You Facing Any Problem?
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-600 mb-4 max-w-md">
          Having trouble? Let us know—our team is ready to support you and resolve any issue quickly.
        </p>

        {/* Input + Button */}
        <div className="w-full max-w-md flex items-center border border-gray-300 rounded-full overflow-hidden mb-6">
          <input
            type="text"
            className="flex-grow px-4 py-2 outline-none text-sm"
            placeholder="Enter Your Queries"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="bg-[rgba(137,12,37,1)] hover:bg-red-900 text-white text-sm font-semibold px-6 py-2"
          >
            Send
          </button>
        </div>

        {/* Contact Info */}
        <p className="text-sm mb-2">Or You can contact us</p>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-[rgba(137,12,37,1)]">
            
            <FaEnvelope /> admin@dashapta.live
          </span>
          <span className="flex items-center gap-2 text-[rgba(137,12,37,1)]">
            <FaPhoneAlt /> 9071517706
          </span>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
              <h3 className="text-xl font-semibold text-[rgba(137,12,37,1)] mb-3">
                Thank you for reaching out!
              </h3>
              <p className="text-sm text-gray-700 mb-5">
                Your query has been submitted successfully. Our team will get back to you soon.
              </p>
              <button
                onClick={goToDashboard}
                className="bg-[rgba(137,12,37,1)] text-white px-6 py-2 rounded-md hover:bg-red-900"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
