// FRONTEND: Updated EarningsPage.js

import React, { useEffect, useState } from "react";
import request from "../api"; // Your axios/fetch wrapper

const EarningsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const { custom_id } = JSON.parse(stored);
      request(`/agent-earnings/${custom_id}/`)
        .then((res) => setData(res))
        .catch(console.error);
    }
  }, []);

  if (!data) return <div className="p-8 text-center">Loading...</div>;

  const studentData = data.referred_students;
  const agentData = data.referred_agents;

  // Calculate earnings based on application fees
  const totalStudentEarnings = studentData.length * 40;
  const totalAgentEarnings = agentData.reduce((sum, agent) => {
    const fees = parseInt(agent.application_fees);
    if (fees === 250) return sum + 50;
    if (fees === 3000) return sum + 500;
    return sum;
  }, 0);

  const grandTotal = totalStudentEarnings + totalAgentEarnings;

  return (
    <div className="min-h-screen px-4 py-8 md:px-16 md:py-12 bg-white">
      <div className="mb-4">
        <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Your Earning</h1>

      {/* Student Application */}
      <div className="mb-12">
        <div className="bg-[#891421] text-white text-center py-2 font-semibold rounded-md mb-2 w-60 mx-auto">
          Student Application
        </div>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="text-left">
                  <th className="border px-3 py-2 w-[10%]">Sl NO</th>
                  <th className="border px-3 py-2 w-[30%]">Student ID</th>
                  <th className="border px-3 py-2 w-[30%]">Student Name</th>
                  <th className="border px-3 py-2 w-[30%]">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{student.uuid}</td>
                    <td className="border px-3 py-2">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="border px-3 py-2">Rs.40</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#891421] text-white px-4 py-2 text-right font-semibold">
            Total &nbsp; Rs.{totalStudentEarnings}
          </div>
        </div>
      </div>

      {/* Agent Application */}
      <div className="mb-8">
        <div className="bg-[#891421] text-white text-center py-2 font-semibold rounded-md mb-2 w-60 mx-auto">
          Agent Application
        </div>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="text-left">
                  <th className="border px-3 py-2 w-[10%]">Sl NO</th>
                  <th className="border px-3 py-2 w-[20%]">Agent ID</th>
                  <th className="border px-3 py-2 w-[30%]">Agent Name</th>
                  <th className="border px-3 py-2 w-[20%]">Application Fees</th>
                  <th className="border px-3 py-2 w-[20%]">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {agentData.map((agent, index) => {
                  const fees = parseInt(agent.application_fees);
                  const earnings = fees === 250 ? 50 : fees === 3000 ? 500 : 0;

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{agent.custom_id}</td>
                      <td className="border px-3 py-2">
                        {agent.first_name} {agent.last_name}
                      </td>
                      <td className="border px-3 py-2">Rs.{fees}</td>
                      <td className="border px-3 py-2">Rs.{earnings}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-[#891421] text-white px-4 py-2 text-right font-semibold">
            Total &nbsp; Rs.{totalAgentEarnings}
          </div>
        </div>
      </div>

      {/* Grand Total */}
      <div className="bg-[#891421] text-white text-center text-xl font-bold py-3 rounded-md w-60 mx-auto">
        Grand Total &nbsp; Rs.{grandTotal}
      </div>
    </div>
  );
};

export default EarningsPage;
