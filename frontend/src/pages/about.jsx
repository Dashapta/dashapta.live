import React from "react";
import Footer from './agent/Footer';
import Header from "../components/Header";
import {FaEnvelope,FaMapMarkerAlt,FaPhoneAlt } from 'react-icons/fa';
const AboutUs = () => {
  return (
    <>
    <Header scrollLinks={['home', 'about', 'gallery']} />
    <section className="w-full flex flex-col md:flex-row items-center justify-center bg-white px-6 py-12">
      {/* Left: Text */}
      <div className="md:w-1/2 w-full mb-8 md:mb-0">
       <h2 className="text-3xl md:text-4xl font-serif font-semibold  mb-6 text-[#800020] leading-snug">
           About Us
          </h2>
        <p className="text-lg text-gray-700 space-y-3 list-disc pl-5">
          Dashapta Seva Trust (R) is a non-profit organization dedicated to transforming lives and building stronger communities. 
          We work at the grassroots level to provide vital support to those who need it the most — 
          the uneducated, unemployed, and underserved individuals in our society.
        </p>
      </div>

      {/* Right: Images and Logo */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img src="/images/about1.png" alt="Logo" className="max-h-[70vh] object-contain" />
      </div>
      
    </section>
     <section className="w-full bg-white px-6 md:px-20 py-16">
      <p className="text-gray-800 text-xl md:text-2xl font-medium mb-10 leading-relaxed">
        Founded with a mission to bring inclusive growth, Dashapta offers a range of impactful services:
      </p>

      <ul className="space-y-8 text-gray-900 text-lg md:text-xl leading-relaxed">
        <li>
          <strong className="font-semibold">Employment Opportunities:</strong> We connect unskilled and semi-skilled individuals with jobs that match their abilities and aspirations.
        </li>
        <li>
          <strong className="font-semibold">Scholarships & Education Aid:</strong> We support deserving students through financial assistance, scholarships, and academic resources.
        </li>
        <li>
          <strong className="font-semibold">Interest-Free Loans:</strong> We provide zero-interest loans to help individuals start businesses, pursue education, or support families during hard times.
        </li>
        <li>
          <strong className="font-semibold">Insurance Benefits:</strong> Our programs include assistance with affordable insurance schemes for health and life coverage.
        </li>
        <li>
          <strong className="font-semibold">Support for Local Manufacturers:</strong> We help small-scale and rural producers by connecting them with markets and promoting their products.
        </li>
      </ul>

      <p className="mt-12 text-gray-800 text-xl md:text-2xl leading-relaxed font-medium">
        At Dashapta Seva Trust, we believe that a better future begins with opportunity and support. Our team is driven by compassion, and our work is powered by community participation and responsible giving.Together, we are creating a world where no one is left behind.
      </p>
    </section>
    <section  className="w-full bg-gray-100 px-4 py-20 overflow-x-hidden">
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row lg:gap-6 rounded-lg shadow-lg bg-white overflow-hidden">
        
              {/* Left Contact Card */}
              <div className="bg-[rgba(137,12,37,1)]   top-1/2-translate-y-1/2 w-[466px] h-[506px]  text-white w-full lg:max-w-md p-10 flex flex-col justify-center">
                <h2 className="text-4xl font-serif font-semibold border-b-2 border-white pb-2 mb-8">Contact us</h2>
                <div className="flex items-start gap-4 mb-6">
                  <FaPhoneAlt className="mt-1 text-xl" />
                  <p className="text-base">9071517706</p>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <FaEnvelope className="mt-1 text-xl" />
                  <p className="text-base">admin@dashapta.live</p>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="mt-1 text-xl" />
                  <p className="text-base">
                   36 Nagunhalli Rd, 2nd <br/>Stage, R.S. Naidu Nagar, <br/>Mysuru, Hale Kesare, <br/>Karnataka 570007, India
                  </p>
                </div>
              </div>
        
              {/* Right Contact Form */}
              <div className="w-full lg:flex-1 p-12">
                <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-10">Lorem Ipsum is simply dummy text of the printing</p>
                <form className="flex flex-col space-y-6 w-full">
                  <input type="text" placeholder="Your Name" className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600" />
                  <input type="email" placeholder="Email Id" className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600" />
                  <input type="tel" placeholder="Phone No" className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600" />
                  <textarea placeholder="Query" rows={5} className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-[rgba(137,12,37,1)] text-white text-lg font-semibold px-10 py-3 rounded-md hover:opacity-90">
                      Send
                    </button>
                  </div>
                </form>
              </div>
        
            </div>
          </div>
        </section>
    <Footer />
    </>
  );
};

export default AboutUs;
