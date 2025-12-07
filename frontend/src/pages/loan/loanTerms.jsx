import React from "react";

export default function LoanTermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-[Inter]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#890C25] underline mb-6">
        "TERMS AND CONDITIONS FOR INTEREST-FREE LOAN" by DASHAPTA Seva Trust:
      </h1>

      <h2 className="font-bold text-lg mb-1">DASHAPTA Seva Trust®</h2>
      <p className="font-semibold mb-6">TERMS AND CONDITIONS FOR INTEREST-FREE LOAN<br/>Reg No : DVG-A-00826-2024-25</p>

      <ol className="list-decimal pl-5 space-y-4">
        <li>
          <strong>NATURE OF LOAN</strong>
          <ul className="list-disc pl-5">
            <li>The loan provided is strictly interest-free.</li>
            <li>It is extended purely for the benefit of the member/beneficiary in line with the objectives of the trust.</li>
          </ul>
        </li>

        <li>
          <strong>ELIGIBILITY</strong>
          <ul className="list-disc pl-5">
            <li>Only registered members/beneficiaries of the trust are eligible.</li>
            <li>Applicant must have a valid reason (education, medical, livelihood support, etc.) that aligns with the trust's charitable purpose.</li>
          </ul>
        </li>

        <li>
          <strong>LOAN AMOUNT</strong>
          <ul className="list-disc pl-5">
            <li>The amount sanctioned will depend on the trust's financial capacity and merit of the request.</li>
            <li>The trust reserves the right to approve or reject any application without assigning a reason.</li>
          </ul>
        </li>

        <li>
          <strong>DISBURSEMENT</strong>
          <ul className="list-disc pl-5">
            <li>Loan will be disbursed via bank transfer or cheque, directly to the applicant or to the concerned institution/service provider (if applicable).</li>
          </ul>
        </li>

        <li>
          <strong>REPAYMENT TERMS</strong>
          <ul className="list-disc pl-5">
            <li>Repayment must begin within [X] days/months from the date of disbursement.</li>
            <li>The repayment schedule will be monthly/quarterly, as mutually agreed upon.</li>
            <li>The loan must be repaid in full within [repayment period] months from the disbursement date.</li>
          </ul>
        </li>

        <li>
          <strong>DEFAULT</strong>
          <ul className="list-disc pl-5">
            <li>Suspend eligibility for future assistance.</li>
            <li>Take appropriate legal action, if necessary.</li>
            <li>Inform the guarantor or referees mentioned in the application.</li>
          </ul>
        </li>

        <li>
          <strong>PREPAYMENT</strong>
          <ul className="list-disc pl-5">
            <li>The borrower may prepay the loan amount in part or in full at any time without any penalty.</li>
          </ul>
        </li>

        <li>
          <strong>USE OF FUNDS</strong>
          <ul className="list-disc pl-5">
            <li>The loan amount must be used strictly for the stated purpose.</li>
            <li>Misuse of funds may lead to immediate recall of the loan and possible legal action.</li>
          </ul>
        </li>

        <li>
          <strong>DOCUMENTATION</strong>
          <ul className="list-disc pl-5">
            <li>The borrower must provide all supporting documents (ID, income proof, expense justification, etc.).</li>
            <li>A loan agreement may be signed before disbursement.</li>
          </ul>
        </li>

        <li>
          <strong>NO COMMERCIAL USE</strong>
          <ul className="list-disc pl-5">
            <li>The loan is charitable in nature and must not be used for any commercial profit-seeking activities unless specifically permitted by the trust.</li>
          </ul>
        </li>

        <li>
          <strong>BINDING AGREEMENT</strong>
          <ul className="list-disc pl-5">
            <li>These terms constitute a legally binding agreement between the trust and the borrower.</li>
            <li>The trust reserves the right to amend these terms with due notice.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
