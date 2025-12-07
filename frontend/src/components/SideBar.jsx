import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Award,
  Trophy,
  HelpCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Edit Profile", path: "/profile" },
    { icon: Award, label: "Scholarship", path: "/scholorship" },
    { icon: Trophy, label: "Olympiad", path: "/olympiad" },
    { icon: HelpCircle, label: "Help & Support", path: "/support" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Hamburger Button - Mobile only */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          <Menu className="text-red-900 w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          {/* Blur Overlay */}
          <div
  className="fixed inset-0 backdrop-blur-md bg-transparent z-40"
  onClick={() => setIsOpen(false)}
></div>


          {/* Sidebar Drawer */}
<div className="fixed top-0 left-0 w-64 h-screen bg-red-900 text-white flex flex-col justify-between z-50 shadow-2xl rounded-r-2xl">

            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-red-800">
              <img
                src="/images/sidebar.png"
                alt="Logo"
                className="w-12 h-12 rounded-xl"
              />
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white w-6 h-6" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-6 px-4">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-4 py-4 mb-2 cursor-pointer transition-all duration-300 rounded-xl ${
                      isActive
                        ? "bg-white text-red-900 font-semibold shadow-md"
                        : "text-white hover:bg-red-800 hover:shadow-lg"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? "text-red-900" : "text-white"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-red-800">
  <div
    onClick={() => {
      localStorage.removeItem("student");
      navigate("/student-login");
    }}
    className="flex items-center px-4 py-4 cursor-pointer hover:bg-red-800 transition-all duration-300 rounded-xl hover:shadow-lg"
  >
    <LogOut className="w-5 h-5 mr-3 text-white" />
    <span className="text-white font-medium">Logout</span>
  </div>
</div>

          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-4 top-4 w-64 h-[calc(100vh-2rem)] bg-red-900 text-white flex-col rounded-2xl shadow-2xl z-30">
        {/* Logo Section */}
        <div className="p-6 border-b border-red-800 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-30 h-25 flex items-center justify-center shadow-lg">
            <img
              src="/images/sidebar.png"
              alt="Sidebar Logo"
              className="object-cover text-red-900"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-4 py-4 mb-2 cursor-pointer transition-all duration-300 rounded-xl ${
                  isActive
                    ? "bg-white text-red-900 font-semibold shadow-md"
                    : "text-white hover:bg-red-800 hover:shadow-lg"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-red-900" : "text-white"
                  }`}
                />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-red-800">
  <div
    onClick={() => {
      localStorage.removeItem("student");
      navigate("/student-login");
    }}
    className="flex items-center px-4 py-4 cursor-pointer hover:bg-red-800 transition-all duration-300 rounded-xl hover:shadow-lg"
  >
    <LogOut className="w-5 h-5 mr-3 text-white" />
    <span className="text-white font-medium">Logout</span>
  </div>
</div>

      </div>
    </>
  );
};

export default Sidebar;
