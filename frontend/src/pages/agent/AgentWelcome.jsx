import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [user, setUser] = useState(null);
  const [referralLink, setReferralLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/agent-login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const link = `https://084eb4afdcd8.ngrok-free.app/student-signup?agent_id=${parsedUser.custom_id}`;
      setReferralLink(link);
    }
  }, []);

  if (!user) return null;

  const handleStudentReferral = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Student referral link copied to clipboard!");
  };

  const handleAgentReferral = () => {
    const agentLink = `https://084eb4afdcd8.ngrok-free.app/agent-signup?agent_id=${user.custom_id}`;
    navigator.clipboard.writeText(agentLink);
    alert("Agent referral link copied to clipboard!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-[50%] bg-white p-6 md:p-12 flex flex-col justify-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-20 md:h-20 mb-6 w-80"
        />

       <p className="text-xl text-black mb-6 leading-relaxed">
  <strong>Great to have you with us!</strong><br />
  You’re now part of a community that values integrity, service, and success. We’re here to support you every step of the way.
</p>

<button
  onClick={() => navigate("/earning")}
  className="w-fit bg-[#003F9D] hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md mb-8"
>
  Your Earnings
</button>

        <div className="bg-[rgba(137,12,37,1)] text-white rounded-xl p-6 w-full max-w-xl mb-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Your Profile</h3>
          <div className="mb-6">
            <label className="block text-base font-medium mb-1">Agent Id</label>
            <input
              type="text"
              value={user.custom_id}
              readOnly
              className="w-full bg-white text-black px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Name</label>
            <input
              type="text"
              value={`${user.first_name} ${user.last_name}`}
              readOnly
              className="w-full bg-white text-black px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <button
            onClick={handleStudentReferral}
            className="px-6 py-3 text-lg font-semibold rounded-md text-white"
            style={{ backgroundColor: "rgba(0, 63, 157, 1)" }}
          >
            Student Referral
          </button>
          <button
            onClick={handleAgentReferral}
            className="px-6 py-3 text-lg font-semibold rounded-md text-white"
            style={{ backgroundColor: "rgba(0, 63, 157, 1)" }}
          >
            Agent Referral
          </button>
          <button
    onClick={() => navigate(`/loan-signup?agent_id=${user.custom_id}`)}
    className="px-6 py-3 text-lg font-semibold rounded-md text-white"
    style={{ backgroundColor: "rgba(0, 63, 157, 1)" }}
  >
    Loan Referral
  </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full md:w-[50%] relative h-64 md:h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/agentwelcome.png')" }}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
