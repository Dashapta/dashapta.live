import {FaEnvelope,FaMapMarkerAlt,FaPhoneAlt } from 'react-icons/fa';
import React from "react";
const Contact=()=>{
    return(<section  className="w-full bg-gray-100 px-4 py-20 overflow-x-hidden">
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
                      <p className="text-gray-600 mb-10">Reach us for support, inquiries, or feedback</p>
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
              </section>)
}
export default Contact;
