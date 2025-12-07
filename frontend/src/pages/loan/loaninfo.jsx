import React from 'react';
import { useNavigate } from "react-router-dom";

const InterestFreeLoansPage = () => {
    const navigate = useNavigate();

  const handleApplyLoan = () => {
    navigate("/loan-signup");
  };
  return (
    <div className="bg-white text-gray-800 font-sans px-4 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <img src="/images/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Hero Section */}
      <div className="bg-[#890C25] text-white p-6 rounded-md mb-8 text-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Empowering Lives Through Interest-Free Loans
        </h1>
      </div>

      <p className="mt-2 text-sm md:text-base mb-12 text-center">
        At Dashapta Seva Trust (R), we believe that financial support should be a right, not a burden.
        That’s why we provide 100% interest-free loans to individuals and families in need—
        empowering you to build a better future without the weight of interest-based debt.
      </p>

      {/* Why Choose Section */}
<div className="mb-14">
  <h2 className="text-2xl text-[#890C25] font-bold text-center mb-10">
    Why Choose Our Interest-Free Loans?
  </h2>

  <div className="grid md:grid-cols-2 gap-8">
    {/* Block 1 */}
    <div className="flex items-start gap-4">
      <img src="/images/nointersest.png" alt="No Interest" className="w-18 h-18 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg md:text-xl">No Interest. No Hidden Charges.</h3>
        <p className="text-sm md:text-base">You only repay what you borrow — not a rupee more.</p>
      </div>
    </div>

    {/* Block 2  loanquick.png*/}
    <div className="flex items-start gap-4">
       <img src="/images/loanquick.png" alt="Quick" className="w-18 h-18 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg md:text-xl">Quick & Simple Processing</h3>
        <p className="text-sm md:text-base">Minimal paperwork and faster approvals.</p>
      </div>
    </div>

    {/* Block 3 loansupport.png */}
    <div className="flex items-start gap-4">
     <img src="/images/loansupport.png" alt="Support" className="w-18 h-18 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg md:text-xl">Support for All Needs</h3>
        <p className="text-sm md:text-base">Whether it’s education, medical emergencies, marriage expenses, or small business funding — we’re here to help.</p>
      </div>
    </div>

    {/* Block 4 */}
    <div className="flex items-start gap-4">
      <img src="/images/loanethic.png" alt="Support" className="w-18 h-18 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg md:text-xl">Ethical & Transparent</h3>
        <p className="text-sm md:text-base">Strict ethical guidelines, complete transparency.</p>
      </div>
    </div>

    {/* Block 5 */}
<div className="flex items-start gap-4 md:col-span-2 justify-center">
  <img src="/images/loancommunity.png" alt="Support" className="w-18 h-18 flex-shrink-0" />
  <div>
    <h3 className="font-semibold text-lg md:text-xl">Community-Focused</h3>
    <p className="text-sm md:text-base">Minimal paperwork and faster approvals.</p>
  </div>
</div>

  </div>
</div>


      {/* Who Can Apply Section */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#890C25] mb-2">Who Can Apply?</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Students (for education fees, courses, coaching)</li>
          <li>Low-income families</li>
          <li>Women entrepreneurs</li>
          <li>Farmers and daily wage workers</li>
          <li>Individuals facing sudden medical or financial emergencies</li>
        </ul>
      </div>

      {/* Loan Amount & Tenure */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#890C25] mb-2">Loan Amount & Tenure</h3>
        <p className="text-sm mb-1">Loan Amount: ₹5,000 to ₹3,00,000 (Based on need & eligibility)</p>
        <p className="text-sm mb-1">Repayment Period: Flexible repayment options up to 24 months</p>
        <p className="text-sm">No Collateral Required for most loans</p>
      </div>

      {/* Benefits at a Glance */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#890C25] mb-2">Benefits at a Glance</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>0% Interest – Repay only the principal amount</li>
          <li>Flexible Tenure – Customize your repayment plan</li>
          <li>No Processing Fee – 100% transparent disbursal</li>
          <li>Easy Documentation – Minimal paperwork, quick processing</li>
          <li>Personal Support – Assistance from our field officers</li>
        </ul>
      </div>

      {/* Apply Loan Button */}
      <div className="text-center">
        <button  onClick={handleApplyLoan} className="bg-[#890C25] text-white px-6 py-3 text-lg rounded-md font-semibold hover:bg-[#6c0a1d]" >
          Apply Loan
        </button>
      </div>
    </div>
  );
};

export default InterestFreeLoansPage;
