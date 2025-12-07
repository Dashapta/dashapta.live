import React, { useEffect, useState } from "react";
import { Calendar, TrendingUp, BookOpen, ArrowRight, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import request from "../api";

const LoanDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("member"));
const [membershipComplete, setMembershipComplete] = useState(null); // null = loading, true/false = result

useEffect(() => {
  const checkMembershipStatus = async () => {
    try {
      const res = await request("/check-membership-filled/", "POST", {
        uuid: user.custom_id,
      });

      setMembershipComplete(res.complete === true);
    } catch (err) {
      console.error("Failed to check membership status:", err);
      setMembershipComplete(false); // fallback to false if API fails
    }
  };

  if (user?.custom_id) {
    checkMembershipStatus();
  }
}, [user]);

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <div className="text-lg opacity-90 mb-2">
  <span className="text-xl font-bold">Membership ID: </span>
  {membershipComplete === null ? (
    <span className="text-gray-300 italic">Checking...</span>
  ) : membershipComplete ? (
    <span>{user.custom_id}</span>
  ) : (
    <span className="text-yellow-200 italic">Please fill the membership form</span>
  )}
</div>

            <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
            <h2 className="text-4xl font-bold">
              {user.first_name} {user.last_name}!
            </h2>
          </div>
          <div className="w-78 h-48 flex items-center">
            <img
              src="/images/memberWelcome.png"
              alt="Welcome"
              className="w-[300px] h-[200px] object-contain transform-translate-x-20 scale-110"
            />
          </div>
        </div>
      </div>

      {/* New Dashboard Content (Membership + Loan Info) */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        {/* Quick Actions */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div
            onClick={() => navigate("/membership")}
            className="border-2 border-red-500 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h4 className="text-xl font-bold text-[rgba(0,63,157,1)] underline mb-2">
              Apply for Membership
            </h4>
            <p className="text-gray-700 mb-4 text-lg">
              Join our community and unlock exclusive benefits.
            </p>
            <button className="text-red-700 font-semibold flex items-center">
              Apply Now <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div
            onClick={() => navigate("/loan")}
            className="border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h4 className="text-xl font-bold text-[rgba(0,63,157,1)] underline mb-2">
              Apply for Loan
            </h4>
            <p className="text-gray-700 mb-4 text-lg">
              Start your loan application in just a few steps.
            </p>
            <button className="text-red-700 font-semibold flex items-center">
              Register Now <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* How to Apply Section */}
        <h3 className="text-2xl font-bold text-red-800 mb-4">How to Apply?</h3>
        <ol className="space-y-3 text-gray-800 text-lg">
          <li>
            <span className="font-bold text-red-700">Step 1:</span> Fill the membership and application form online.
          </li>
          <li>
            <span className="font-bold text-red-700">Step 2:</span>{" "}
            <span className="font-bold">Attach Required Documents</span>
            <br />
            Aadhaar Card<br />
            Purpose Letter (stating reason for loan)<br />
            2 Passport-size photographs<br />
            Guarantor’s ID proof (if applicable)
          </li>
          <li>
            <span className="font-bold text-red-700">Step 3:</span> Submit Online
          </li>
          <li>
            <span className="font-bold text-red-700">Step 4:</span>{" "}
            <span className="font-bold">Verification & Approval</span><br />
            Our team will verify the documents and conduct a short interview.
          </li>
          <li>
            <span className="font-bold text-red-700">Step 5:</span>{" "}
            <span className="font-bold">Receive Funds</span><br />
            Once approved, funds are disbursed within 10–15 working days.
          </li>
        </ol>

        {/* Trust Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-red-800 mb-2">Transparency & Trust</h3>
          <p className="text-gray-800 text-lg">
            As a registered non-profit trust, we are dedicated to serving society without discrimination.
            Every application is treated with dignity, and we maintain confidentiality at all levels.
          </p>
          <p className="text-gray-800 text-lg mt-1">
            Funds are disbursed within 10–15 working days.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-2">
            Together, Let’s Build a Debt-Free Society
          </h3>
          <p className="text-gray-800 text-lg">
            Let Dashapta Seva Trust (R) be your partner in growth. Apply today and take the first step toward a brighter, interest-free future.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoanDashboard;
