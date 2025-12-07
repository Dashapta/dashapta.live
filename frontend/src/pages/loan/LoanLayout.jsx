// src/layouts/DashboardLayout.jsx
import LSidebar from "./loansidebar";
import LHeader from "./loanHeader";
import { Outlet } from "react-router-dom";

const LoanDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar stays fixed on all dashboard pages */}
      <LSidebar />

      {/* Main content with header */}
      <div className="flex-1 md:ml-72">
        <LHeader />
        <div >
          <Outlet /> {/* Content for each route renders here */}
        </div>
      </div>
    </div>
  );
};

export default LoanDashboardLayout;
