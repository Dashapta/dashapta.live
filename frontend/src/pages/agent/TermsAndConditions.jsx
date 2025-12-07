import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 font-sans space-y-6">
      <h1 className="text-3xl font-bold text-center text-[rgba(137,12,37,1)]">
        Terms and Conditions – Refund Policy (₹3000 Investment)
      </h1>

      <p>
        At <strong>Dashapta</strong>, we are committed to ensuring the success of our agents
        by offering complete support across marketing, field operations, and lead generation.
        The following refund policy outlines the conditions under which the ₹3000 investment
        can be refunded:
      </p>

      <h2 className="text-xl font-semibold text-[rgba(137,12,37,1)]">
        1. Investment and Support
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Marketing Support: Creatives, strategy, and digital outreach assistance.</li>
        <li>Field Support: On-ground guidance and operational help if applicable.</li>
        <li>Lead Support: Initial set of leads to help kickstart sales and customer engagement.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[rgba(137,12,37,1)]">
        2. Refund Eligibility Criteria
      </h2>

      <h3 className="font-semibold">a. No Revenue Generated Within Two Months</h3>
      <p>
        If the agent is unable to generate any revenue (i.e., not even a single successful post or conversion)
        within two months, despite using all the support provided by Dashapta, the full ₹3000 will be refunded.
      </p>

      <h3 className="font-semibold">b. Partial Revenue Generated</h3>
      <p>
        If the agent generates some revenue but fails to recover the full ₹3000 investment within two months,
        the difference between ₹3000 and the revenue generated will be refunded.
      </p>
      <p className="italic">
        Example: If the agent earns ₹1000 using the platform and support, and is unable to generate more,
        the remaining ₹2000 will be refunded.
      </p>

      <h2 className="text-xl font-semibold text-[rgba(137,12,37,1)]">
        3. Refund Processing Timeline
      </h2>
      <p>
        Refund requests must be submitted with valid proof of effort (campaign screenshots, lead communication, etc).
        Once verified, refunds will be processed within <strong>72 hours</strong> of approval.
      </p>

      <h2 className="text-xl font-semibold text-[rgba(137,12,37,1)]">
        4. Validity Period
      </h2>
      <p>This policy is valid for 2 months from the date of activation.</p>

      <h2 className="text-xl font-semibold text-[rgba(137,12,37,1)]">
        5. Fair Use & Abuse Prevention
      </h2>
      <p>
        The refund policy is built on mutual trust. Dashapta reserves the right to deny refunds if:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>There is evidence of negligence or misuse,</li>
        <li>The agent did not use the support offered,</li>
        <li>Fraudulent or dishonest claims are made.</li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
