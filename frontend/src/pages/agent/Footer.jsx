import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[rgba(137,12,37,1)] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between border-b border-gray-300 pb-6">
        
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-28 h-14 bg-white rounded-lg flex items-center justify-center">
            {/* Replace with <img src="logo.png" alt="Logo" className="h-10" /> if needed */}
            <img
          src="/images/logo.png"
          alt="logo"
          style={{width:'200px',height:'40px'}}
        />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm md:text-base">
          {['home', 'about', 'gallery', 'signup'].map((section, index) => (
            <React.Fragment key={section}>
              {index !== 0 && <span className="text-white">|</span>}
              <ScrollLink
                to={section}
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer hover:underline"
              >
                {section === 'signup' ? 'Contact us' : section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            </React.Fragment>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[rgba(137,12,37,1)]">
            <FaInstagram size={16} />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[rgba(137,12,37,1)]">
            <FaEnvelope size={16} />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[rgba(137,12,37,1)]">
            <FaFacebookF size={16} />
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center mt-4 text-sm text-white">
        © 2025 Dashapta Seva Trust. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
