import React from "react";
import Header from "../components/Header";
import Contact from '../components/contactus';
import Footer from './agent/Footer';
const DistributorshipOffer = () => {
  return (
    <div className="bg-white text-black">
      <Header scrollLinks={['home', 'about', 'gallery']} />
      {/* Section 1 – Offer Banner */}
      <section
        id="distributor"
        className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-30 gap-10"
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-6 leading-snug">
            Distributorship opportunities are now open
          </h2>
          <div className="bg-[#800020] text-white text-lg font-semibold px-6 py-4 w-fit rounded">
            Earn Rs 45,000 to Rs 90,000 per month
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md aspect-[4/3] bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 flex items-center justify-center">
            <img
          src="/images/dis1.png"
          alt="About Us"
          className="rounded-2xl shadow-lg object-fit"
        />
          </div>
        </div>
      </section>

      {/* Section 2 – Benefits */}
      <section
        id="benefits"
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            The Beauty of distributorship
          </h2>
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Low Investment, High Returns</li>
            <li>Earn Passive Income</li>
            <li>Unlimited Earning Potential</li>
            <li>Freedom: Financial, Time, Health</li>
            <li>No Boss – Be Your Own Boss</li>
            <li>Global Opportunity</li>
          </ul>
        </div>

        {/* Right Image with reduced background + responsive */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[90%] max-w-sm bg-gray-200 aspect-[4/3] rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
            <img
          src="/images/dis2.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>
      </section>
<section
        id="more-info"
        className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[100%] max-w-sm bg-gray-200 aspect-[4/3] rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
             <img
          src="/images/dis3.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            Challenges in career and growth
          </h2>
         
          
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Finding the right people and company</li>
            <li>Facing rejections and negativity</li>
            <li>Lack of duplication and team growth</li>
            <li>We are introducing a solution for these challenges</li>
          </ul>
        </div>
      </section>
      <section className="w-full bg-white px-4 py-16" id="workflow">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl  text-center font-serif font-semibold text-[#800020] mb-6">
           Work Flow
          </h2>
        

        {/* Top Image with Border */}
        <div className="border-[20px] border-[rgba(137,12,37,1)] mb-10">
  <div className="w-full h-64 md:h-96 bg-gray-200 overflow-hidden relative">
    <img
      src="/images/dis4.png"
      alt="distributor"
      className="w-full h-full object-fit transition-transform duration-500 ease-in-out hover:scale-110"
    />
  </div>
</div>

        {/* Bullet Points */}
        <div className="space-y-6 mb-16 px-4 md:px-0">
          <div className="flex items-start space-x-3">
            <span className="text-[rgba(137,12,37,1)] text-xl font-bold">✔</span>
            <p className="text-lg text-gray-700 space-y-3 list-disc pl-5">
              The company provides 400 interested leads on a daily basis.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-[rgba(137,12,37,1)] text-xl font-bold">✔</span>
            <p className="text-lg text-gray-700 space-y-3 list-disc pl-5">
              Your task is to build a team without relying on personal references or existing contacts.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-[rgba(137,12,37,1)] text-xl font-bold">✔</span>
            <p className="text-lg text-gray-700 space-y-3 list-disc pl-5">
              You can grow your team and achieve a sustainable income.
            </p>
          </div>
        </div>

        {/* Distributorship Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
          {/* Left Text */}
          <div className="mb-6 md:mb-0 md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
           Distributorship Work Information
          </h2>
            
            <p className="text-lg text-gray-700 space-y-3 list-disc pl-5">
              The company will provide 400 leads daily to help you earn more.
            </p>
            <p className="text-lg text-gray-700 space-y-3 list-disc pl-5 text-[rgba(137,12,37,1)]">
              Distributor’s task: <span className="text-lg text-gray-700 space-y-3 list-disc pl-5">Simply send an invitation message through WhatsApp to the provided leads.</span>
            </p>
          </div>

          {/* Right Image Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[90%] max-w-sm bg-gray-200 aspect-[4/3] rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
            <img
          src="/images/dis5.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>
        </div>
      </div>
    </section>

    {/* Section 3 – Earnings */}
    <section className="w-full bg-white px-4 py-16" id="earnings">
      <div className="max-w-6xl mx-auto">

        {/* Table */}
        <div className="overflow-x-auto mb-8 border border-gray-300">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-[rgba(137,12,37,1)] text-white">
              <tr>
                <th className="py-3 px-4 font-medium">Daily commitment</th>
                <th className="py-3 px-4 font-medium">Conversion</th>
                <th className="py-3 px-4 font-medium">Incentives</th>
                <th className="py-3 px-4 font-medium">Total Income Per/day</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="border-t">
                <td className="py-3 px-4">Scholarship 100</td>
                <td className="py-3 px-4">Scholarship 5</td>
                <td className="py-3 px-4">Rs 40</td>
                <td className="py-3 px-4">Rs 40*5=200</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Olympiad 100</td>
                <td className="py-3 px-4">Olympiad 1</td>
                <td className="py-3 px-4">Rs 50</td>
                <td className="py-3 px-4">Rs 50*1=50</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">General Health card 100</td>
                <td className="py-3 px-4">General Health card 5</td>
                <td className="py-3 px-4">Rs 50</td>
                <td className="py-3 px-4">Rs 50*5=250</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Agent referral 100</td>
                <td className="py-3 px-4">Agent referral 5</td>
                <td className="py-3 px-4">Rs 500</td>
                <td className="py-3 px-4">Rs 500*5=2500</td>
              </tr>
              <tr className="border-t font-semibold text-[rgba(137,12,37,1)]">
                <td colSpan="3" className="py-3 px-4 text-right">Total</td>
                <td className="py-3 px-4">Rs 3000 Per/day</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Monthly & Yearly Commitment */}
        <div className="text-black mb-10 px-2">
          <p className="text-base md:text-lg font-semibold mb-2">
            <span className="text-[rgba(137,12,37,1)]">Monthly commitment</span> &nbsp; Rs 3000*30 days = <span className="font-bold">90,000</span>
          </p>
          <p className="text-base md:text-lg font-semibold">
            <span className="text-[rgba(137,12,37,1)]">Yearly Commitment</span> &nbsp; Rs 90000*12 months = <span className="font-bold">10,80,000</span>
          </p>
        </div>

        {/* Important Note and Box */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Left: Important Note */}
          <div>
            <h3 className="text-[rgba(137,12,37,1)] text-xl font-semibold mb-2">Important<br />Note</h3>
            <ul className="text-gray-700 list-none space-y-1">
              <li>Auto Withdrawal System</li>
              <li>KYC Mandatory</li>
              <li>Daily Payouts</li>
            </ul>
          </div>

          {/* Right: Refund Box */}
          <div className="bg-[rgba(137,12,37,1)] text-white px-4 py-5 md:max-w-md rounded shadow-md relative">
            <div className="absolute -top-4 left-4 bg-white text-[rgba(137,12,37,1)] p-2 rounded-full shadow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 6H7a2 2 0 01-2-2V6a2 2 0 012-2h3l2 2h6a2 2 0 012 2v3" />
              </svg>
            </div>
            <p className="text-sm leading-relaxed pt-6">
              If you are unsatisfied with this distributorship, <span className="font-bold">100% of your amount will be refunded within 72 hours</span> (only if you have not earned any income).
            </p>
          </div>
        </div>
      </div>
    </section>
    <Contact/>
    <Footer />
    </div>
  );
};

export default DistributorshipOffer;
