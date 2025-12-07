import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Events, scroller } from 'react-scroll';
import {FaEnvelope,FaMapMarkerAlt,FaPhoneAlt } from 'react-icons/fa';
import Footer from './agent/Footer';
import BenefitsCarousel from './agent/Benifits';
import Header from '../components/Header';
import { useLocation,useNavigate } from 'react-router-dom';

const scrollLinks = ['home', 'about', 'gallery'];

const Section = ({ id, children }) => (
  <section id={id} className="min-h-screen w-full">
    {children}
  </section>
);


const Home = () => {
  const [activeSection, setActiveSection] = useState('home');

   const navigate = useNavigate();

    useEffect(() => {
    const sectionIds = ['home','about','gallery']; // same as scrollLinks
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // adjust based on when section should be active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  const scrollToContact = () => {
    scroller.scrollTo('contact', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80,
    });
  };
const agent=()=>{
navigate("/distributor");
}
const scholorship=()=>{
navigate("/scholorshipdetails");
}
const Membership=()=>{
navigate("/loan-info");
}
  return (
    <div className="font-sans w-screen overflow-x-hidden">
      <Header activeSection={activeSection} scrollLinks={scrollLinks} />

      <Section id="home">
        <div
          className="w-screen h-screen bg-cover bg-center text-white flex items-center"
          style={{
    backgroundImage: "url('/images/home.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
        >
          <div className="bg-black/40 w-full h-full flex items-center justify-start">
            <div className="text-start px-4 sm:px-6 lg:px-20 max-w-3xl">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg font-['Roboto_Serif'] font-medium ">
                Dashpta<br />
                Seva Trust
              </h1>
              <p className="mt-6 text-xl leading-relaxed drop-shadow-md">
                We provide scholarships to help you learn, grow, and succeed.Start your journey toward a brighter future today.
              </p>
              <button 
                onClick={Membership}
                className="mt-8 mr-4 text-white px-4 py-4 rounded-lg  font-bold shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'rgba(252, 8, 56, 1)' }}
              >
               Registration For Loan
              </button>
              <button 
              onClick={agent}
                className="mt-8 mr-4 text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'rgba(255, 241, 52, 1)' }}
              >
                Agent Portal
              </button>
              <button 
              onClick={scholorship}
                className="mt-8 text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'rgba(85, 247, 49, 1)' }}
              >
                Apply Scholarship
              </button>
            </div>
          </div>
        </div>
      </Section>

       <section id="about">
  <div className="w-full min-h-screen bg-gray-50 px-6 pt-20">
    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
      
      {/* Left side - Image placeholder (replace with actual image) */}
      <div className="relative flex-shrink-0">
        <img
          src="/images/about.jpg"
          alt="About Us"
          className="rounded-2xl shadow-lg object-cover"
          style={{ width: '568px', height: '586px' }}
        />
      </div>

      {/* Right side - Text content */}
      <div className="flex-1 pt-4 lg:pt-0">
        <div className="text-left mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About Us</h2>
          <div className="w-24 h-1" style={{ backgroundColor: 'rgba(137, 12, 37, 1)' }}></div>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Dashapta Seva Trust (R) is a non-profit organization dedicated to transforming lives and building stronger communities. We work at the grassroots level to provide vital support to those who need it the most — the uneducated, unemployed, and underserved individuals in our society.
        </p>
        <button 
        onClick={()=>{
          window.location.href = '/About-us'
        }}
          className="text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ backgroundColor: 'rgba(137, 12, 37, 1)' }}
        >
          View More
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>

<BenefitsCarousel/>
     <Section id="gallery">
  <div className="w-full py-20 px-4 md:px-20 bg-[rgba(137,12,37,1)]">
  <h2 className="text-white text-4xl font-bold mb-12 text-center">Gallery</h2>
  <div className="flex flex-wrap justify-center items-center gap-8">
    {['gallery1.png', 'gallery2.png', 'gallery3.png'].map((img, i) => (
      <div key={i} className="w-full sm:w-[300px] rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
        <img
          src={`/images/${img}`}
          alt={`gallery-${i}`}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
    ))}
  </div>
</div>

</Section>

  <div className="bg-gray-50 pt-8 pb-16 px-6">
    <div className="max-w-7xl mx-auto space-y-20">

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[415px] bg-gray-200 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/images/mission.png"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 pt-6 lg:pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our Mission
            <div className="w-20 h-1 bg-[rgba(137,12,37,1)] mt-2"></div>
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Our mission is to uplift the underprivileged by providing employment opportunities, education support, interest-free financial aid, and market access, creating a society where no dream is denied due to lack of resources or education.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 pt-6 lg:pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our Vision
            <div className="w-20 h-1 bg-[rgba(137,12,37,1)] mt-2"></div>
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            To become a leading force in social transformation by empowering uneducated and unemployed individuals, ensuring every citizen has the support, skills, and stability to lead a dignified and self-reliant life.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[415px] bg-gray-200 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/images/vision.png"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  </div>
    <Section id="contact" className="w-full bg-gray-100 px-4 py-20 overflow-x-hidden">
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
            36 Nagunhalli Rd, 2nd Stage,<br /> R.S. Naidu Nagar,<br /> Mysuru, Hale Kesare,<br /> Karnataka 570007, India
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
</Section>


      <Footer />
    </div>
  );
};

export default Home;
