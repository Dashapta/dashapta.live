// src/layouts/DashboardLayout.jsx
import Sidebar from "../components/SideBar";
import Header from "../components/studentheader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar stays fixed on all dashboard pages */}
      <Sidebar />

      {/* Main content with header */}
      <div className="flex-1 md:ml-72">
        <Header />
        <div >
          <Outlet /> {/* Content for each route renders here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
