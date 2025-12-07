import React from "react";
import Header from "../components/Header";
import Footer from './agent/Footer';
import Contact from '../components/contactus';

const ShikshaJyothiCard = () => {
  return (
    <div className="pt-20 w-full"> 
    <Header scrollLinks={['home', 'about', 'gallery']} />{/* leaves space for fixed header */}
      <div className="relative w-full overflow-hidden">
        {/* Full-width Image */}
        <img
          src="/images/sholorshipdetails.png" // Replace this with your image path
          alt="Shiksha Jyothi Yojana"
          className="w-full h-[450px] md:h-[600px] object-cover"
        />

        {/* Maroon Label */}
        <div className="absolute bottom-0 left-6 bg-[rgba(137,12,37,1)] text-white px-6 py-3 rounded-xl text-2xl md:text-5xl font-semibold shadow-xl">
          Shiksha Jyothi Yojana
        </div>
      </div>
      <section
        id="more-info"
        className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[100%] max-w-sm  aspect-[4/3]  overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
             <img
          src="/images/sch1.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            Benefits of Scholarship
          </h2>
         
          
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Scholarship amount of upto <span className="text-[rgba(137,12,37,9)]">Rs. 5,000/-</span>from 1st standard to 10th standard</li>
            <li>Scholarship amount of up to <span className="text-[rgba(137,12,37,9)]">Rs. 8,000/-</span> from above 10th standard to any post graduation</li>
          </ul>
        </div>
      </section>


       <section
        id="benefits"
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            Personal Accident Insurance (P.A.I)
          </h2>
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>₹10,000 to ₹1 lakh personal accident insurance for Student</li>
            <li>₹10,000 to ₹1 lakh personal accident insurance for Father</li>
            <li>₹10,000 to ₹1 lakh personal accident insurance for Mother</li>
            <li>The amount will be directly transferred into the nominee’s account</li>
            
          </ul>
        </div>

        {/* Right Image with reduced background + responsive */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[90%] max-w-sm  aspect-[4/3]  overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
            <img
          src="/images/sch2.png"
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
          <div className="relative w-[100%] max-w-sm  aspect-[4/3]  overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
             <img
          src="/images/sch3.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
           Health Coverage (HC)
          </h2>
         
          
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Up to ₹25,000 per year health insurance</li>
            <li>1,665 medical packages</li>
            <li>Cashless and paperless</li>
            <li>Coverage for students up to 18 years of age</li>

          </ul>
        </div>
      </section>
       <section
        id="benefits"
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            Encourage GIRLS Education & Empowerment
          </h2>
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>₹900 to ₹3,000 after admission in Class 6th</li>
            <li>₹900 to ₹5,000 after admission in Class 8th</li>
            <li>₹900 to ₹7,000 after admission in Class 10th</li>
            <li>₹2,500 to ₹2 lakh after age of 21 for self-employmentt</li>
          </ul>
          <p>“Terms and Conditions Applied”</p>
        </div>

        {/* Right Image with reduced background + responsive */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[90%] max-w-sm  aspect-[4/3] overflow-hidden  transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
            <img
          src="/images/sch4.png"
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
          <div className="relative w-[100%] max-w-sm  aspect-[4/3] overflow-hidden   transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
             <img
          src="/images/sch5.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-contain"
        />
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
           Advantages of P.A.I
          </h2>
         
          
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Protection for Student / Father / Mother from ₹10,000 up to ₹1 lakh</li>
            <li>Digital Platform: Easy to apply (Dashapta Seva Trust)</li>
            <li>Claim Settlement from 90 days to 120 days</li>
          </ul>
         <p>“Terms and Conditions Applied”</p> 
        </div>
      </section>

       <section
        id="benefits"
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10 py-16 gap-10"
      >
        {/* Left Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#800020] mb-6">
            Advantages of Health Insurance
          </h2>
          <ul className="text-lg text-gray-700 space-y-3 list-disc pl-5">
            <li>Health Protection for students up to 18 years</li>
            <li>Sum insured (INR): up to ₹25,000</li>
            <li>Digital Platform: Easy to apply (Dashapta Seva Trust)</li>
            <li>Claim Settlement from 60 days to 90 days</li>
            <li>Covers small illnesses / daycare treatment</li>
          </ul>
          <p>“Terms and Conditions Applied”</p>
        </div>

        {/* Right Image with reduced background + responsive */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bottom-6 left-30 w-[80%] h-full max-w-sm bg-[#800020] z-0 rounded-lg"></div>
          <div className="relative w-[90%] max-w-sm aspect-[4/3] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 z-10 flex items-center justify-center">
            <img
          src="/images/sch6.png"
          alt="distributor"
          className="rounded-2xl shadow-lg object-cover"
        />
          </div>
        </div>
      </section>

      <Contact/>
      <Footer/>
    </div>
  );
};

export default ShikshaJyothiCard;
