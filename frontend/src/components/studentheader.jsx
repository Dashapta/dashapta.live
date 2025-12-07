const Header = () => {
  const user = JSON.parse(localStorage.getItem("student"));
  return (
    <div className="bg-white p-4 flex justify-between items-center ">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/images/logo.png" alt="logo" className="w-[150px] h-[50px] object-contain" />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-medium">Hi {user.first_name} {user.last_name}</span>
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shadow-md">
          {/* Profile image placeholder */}
          <div className="w-full h-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;