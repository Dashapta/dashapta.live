// src/components/Header.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

const Header = ({ activeSection, scrollLinks = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
   const isDistributorshipPage = location.pathname.includes('distributor');
  const loginLabel = isDistributorshipPage ? 'Agent Login' : 'Student Login';
  const loginPath = isDistributorshipPage ? '/agent-login' : '/student-login';
  const signupLabel = isDistributorshipPage ? 'Agent SignUp' : 'Student SignUp';
  const signupPath = isDistributorshipPage ? '/agent-signup' : '/student-signup';

  const handleLoginClick = () => {
    navigate(loginPath);
  };
  const handleSignupClick = () => {
    navigate(signupPath);
  };

  const handleLinkClick = (item) => {
    setMenuOpen(false);

    if (location.pathname === '/') {
      // Use react-scroll if already on Home
      scroller.scrollTo(item, {
        smooth: true,
        offset: -80,
        duration: 500,
      });
    } else {
      // Navigate to Home with state to scroll
      navigate('/', { state: { scrollTo: item } });
    }
  };

  const renderNavLink = (item) => (
    <button
      key={item}
      onClick={() => handleLinkClick(item)}
      className={`cursor-pointer hover:text-red-600 transition border-b-2 ${
        activeSection === item ? 'border-red-600 text-red-600' : 'border-transparent text-black'
      } pb-1`}
    >
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full px-4 py-4 flex items-center justify-between">
        <img src="/images/logo.png" alt="logo" className="w-[150px] h-[50px] object-contain" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-base font-medium text-black">
          {scrollLinks.map(renderNavLink)}
          <button
    onClick={handleSignupClick}
    className="px-4 py-2 rounded-md font-medium text-black bg-white hover:bg-[rgba(137,12,37,1)] hover:text-white transition border-2 border-transparent"
  >
    {signupLabel}
  </button>
          <button onClick={handleLoginClick} className="text-white px-4 py-2 rounded-md font-medium bg-[rgba(137,12,37,1)] hover:opacity-90">
            {loginLabel}
          </button>
          
        </nav>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-black">
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 bg-white shadow-md">
          <nav className="flex flex-col space-y-4 text-base font-medium text-black">
            {scrollLinks.map(renderNavLink)}
            <button
  onClick={() => {
    handleSignupClick();
    setMenuOpen(false);
  }}
  className="px-4 py-1 rounded-md font-medium text-black bg-white hover:bg-[rgba(137,12,37,1)] hover:text-white transition border-2 border-transparent"
>
  {signupLabel}
</button>
            <button onClick={() => {
                        handleLoginClick();
                        setMenuOpen(false);
                    }} 
        className="text-white px-4 py-2 rounded-md font-medium bg-[rgba(137,12,37,1)] hover:opacity-90">
              {loginLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
