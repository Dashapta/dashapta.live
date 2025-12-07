import React from "react";

const STermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-12 md:px-24 text-gray-800">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "rgba(137, 12, 37, 1)" }}>
        Terms and Conditions
      </h1>

      <p className="font-semibold text-sm mb-2 text-blue-900">Effective Date: [Insert Date]</p>
      <p className="mb-6">
        By accessing and using this website, you agree to be bound by the following Terms and Conditions.
        If you do not agree with any part of these terms, you are advised not to use our services.
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            1. Services Offered
          </h2>
          <p>This website is managed by [Your Trust/Organization Name] ("we," "us," or "the Trust") and offers the following services:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Application for Scholarships</li>
            <li>Registration for Olympiad Exams</li>
            <li>Agent/Distributor Registration to promote and support the services</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            2. Application Fees
          </h2>
          <p>The application fees for the services are as follows:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Students from 1st to 10th Standard: ₹250/-</li>
            <li>Students above 10th Standard up to Post–Graduation: ₹350/-</li>
            <li>Olympiad Exam: ₹250/-</li>
            <li>Agent/Distributor Registration: ₹3000/-</li>
          </ul>
          <p className="mt-2 font-semibold text-blue-800">
            All payments made are final unless specified otherwise under the Refund Policy.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            3. Scholarship Terms
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Eligible applicants may receive a scholarship amount of up to ₹8000/-, depending on background verification.</li>
            <li>A guaranteed minimum scholarship of ₹500/- will be provided to each eligible applicant.</li>
            <li>
              Additional benefits such as accidental coverage, health insurance, and other welfare services may be provided from
              time to time at the discretion of the Trust.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            4. Olympiad Exam
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Olympiad exams are open to all eligible students.</li>
            <li>Application fee is ₹250/-, which is non-refundable.</li>
            <li>Awards and rewards are merit-based and decided solely by the Trust.</li>
            <li>All participants will receive satisfactory participation recognition as determined by the Trust.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            5. Agent / Distributor Terms
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Registration Fee: ₹3000/- (non-refundable unless partially returned as per Refund Policy).</li>
            <li>Registered Agents/Distributors will receive daily leads to support their work.</li>
            <li>Commission will be provided based on performance and adherence to the Code of Conduct.</li>
            <li>Violation of the Code of Conduct may result in withholding commissions or termination of access to services.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            6. Refund Policy
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>No refunds will be issued for scholarship and Olympiad applications once payment is made.</li>
            <li>
              In the case of Agent/Distributor Registration, if an agent fails to earn back the deposited amount, the Trust may
              refund the remaining balance after deducting any commissions already earned, upon review and approval.
            </li>
            <li>Any refund, if applicable, will be processed within 15–30 business days.</li>
          </ul>
        </section>
         <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            7. Code of Conduct
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>All users, applicants, and agents must maintain ethical conduct in line with the Trust’s principles.</li>
            <li>Any fraudulent activity, misrepresentation, or unethical behavior will result in:
              <ul className="list-disc ml-6 mt-1">
                <li>Termination of registration</li>
                <li>Disqualification from services</li>
                <li>Forfeiture of any earned income</li>
                <li>Possible legal action</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 8. Privacy and Cookies */}
        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            8. Privacy and Cookies
          </h2>
          <p>
            We use cookies to improve user experience, deliver personalized services, and analyze web traffic.
            By using our site, you consent to the use of cookies in accordance with our Privacy Policy.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            9. Limitation of Liability
          </h2>
          <p>
            The Trust shall not be liable for any direct, indirect, incidental, or consequential damages arising out of
            or in connection with the use of our website or services.
          </p>
        </section>

        {/* 10. Changes to Terms */}
        <section>
          <h2 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            10. Changes to Terms
          </h2>
          <p>
            The Trust reserves the right to modify or update these Terms and Conditions at any time.
            Continued use of the website signifies your acceptance of any changes.
          </p>
        </section>

        {/* Refund Policy Header */}
        <section className="pt-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "rgba(137, 12, 37, 1)" }}>
            Refund Policy
          </h2>
          <p className="font-semibold text-sm mb-2 text-blue-900">Effective Date: [Insert Date]</p>
          <p className="mb-4">
            Please read this policy carefully before making any payments on our website.
          </p>

          {/* 1. Non-Refundable Services */}
          <h3 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            1. Non-Refundable Services
          </h3>
          <ul className="list-disc ml-6 mb-4">
            <li>All fees paid for Scholarship Applications and Olympiad Exam Registrations are strictly non-refundable.</li>
            <li>Once payment is made, no refund requests will be entertained under any circumstances.</li>
          </ul>

          {/* 2. Agent/Distributor Registration Refunds */}
          <h3 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            2. Agent/Distributor Registration Refunds
          </h3>
          <p className="font-medium text-blue-900 mb-2">Registration Fee: ₹3000/-</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              If the agent/distributor fails to earn their full deposited amount after consistent effort and proper documentation,
              a partial refund of the unearned balance may be considered by the Trust.
            </li>
            <li>Any commissions or benefits already received will be deducted before processing any refund.</li>
            <li>
              The Trust reserves the right to deny refunds in cases of violation of the Code of Conduct or misuse of services.
            </li>
          </ul>

          {/* 3. Refund Process */}
          <h3 className="font-semibold mb-1 text-lg" style={{ color: "rgba(137, 12, 37, 1)" }}>
            3. Refund Process
          </h3>
          <ul className="list-disc ml-6">
            <li>
              If the agent/distributor fails to earn their full deposited amount after consistent effort and proper documentation,
              a partial refund of the unearned balance may be considered by the Trust.
            </li>
            <li>Any commissions or benefits already received will be deducted before processing any refund.</li>
            <li>
              The Trust reserves the right to deny refunds in cases of violation of the Code of Conduct or misuse of services.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default STermsAndConditions;
