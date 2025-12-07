import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import Home from './pages/HomePage'
import DistributorshipOffer from './pages/distributorship';
import ShikshaJyothiCard from './pages/scholorshipdetails';
import AboutUs from './pages/about';
import ProtectedRoute from './pages/ProtectedRoute';
import SProtectedRoute from './pages/studentProtectedRoute';
import LProtectedRoute from './pages/membershipprotected';


import LoginPage from './pages/agent/AgentLogin';
import SignUpPage from './pages/agent/AgentSignUp';
import PaymentPage from './pages/agent/Payment';
import WelcomePage from './pages/agent/AgentWelcome';
import EarningsPage from './pages/agent/Earnings';

import TermsAndConditions from './pages/agent/TermsAndConditions';
import STermsAndConditions from './pages/student/termsAndConditions';



import Dashboard from './pages/student/StudentWelcome';
import AadharFormStep1 from './pages/student/ScholorshipForm';
import LoginPage1 from './pages/student/studentLogin';
import SignupPage1 from './pages/student/studentsignup';
import OlympiadPage from './pages/student/olympaid';
import SForgotPassword from './pages/student/studentForgotPassword';
import SupportForm from './pages/student/helpAndSupport';
import DashboardLayout from "./layout/DashboardLayout";

import LoanApplicationForm from './pages/loan/loanform';
import LoanTermsAndConditions from './pages/loan/loanTerms';
import MembershipForm from './pages/loan/membership';
import LoanSignupPage from './pages/loan/loansignup';
import LaonLoginPage from './pages/loan/loanlogin';
import InterestFreeLoansPage from './pages/loan/loaninfo';
import LoanDashboardLayout from './pages/loan/LoanLayout';
import LoanDashboard from './pages/loan/loanDashboard';





function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
      {/* agent page */}
      <Route path='/' element={<Home/>}/>
      <Route path='/agent-login' element={<LoginPage/>}/>
      <Route path='/agent-signup' element={<SignUpPage/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/earning' element={<EarningsPage/>}/>
      <Route
        path='/AgentWelcome'
        element={
          <ProtectedRoute >
            <WelcomePage  />
          </ProtectedRoute>
        }
      />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/distributor" element={<DistributorshipOffer />} />
      <Route path="/About-us" element={<AboutUs />} />


        {/* student page */}
      <Route
          element={
            <SProtectedRoute role="student">
              <DashboardLayout />
            </SProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scholorship" element={<AadharFormStep1 />} />
          <Route path="/olympiad" element={<OlympiadPage />} />
          <Route path="/support" element={<SupportForm />} />

        </Route>
        <Route path='/student-login' element={<LoginPage1/>}/>
      <Route path='/student-signup' element={<SignupPage1/>}/>
      <Route path="/student-terms" element={<STermsAndConditions />} />
      <Route path="/scholorshipdetails" element={<ShikshaJyothiCard />} />
      <Route path="/student-forgot-password" element={<SForgotPassword userType="student" />} />
      <Route path="/agent-forgot-password" element={<SForgotPassword userType="agent" />} />


    <Route
          element={
            <LProtectedRoute role="member">
              <LoanDashboardLayout />
            </LProtectedRoute>
          }
        >
      <Route path="/loan" element={<LoanApplicationForm />} />
      <Route path="/membership" element={<MembershipForm />} />
      <Route path="/Loan-Dashboard" element={<LoanDashboard />} />
      <Route path="/lsupport" element={<SupportForm />} />
        </Route>
     
      <Route path="/loan-terms" element={<LoanTermsAndConditions />} />
      
      <Route path="/loan-signup" element={<LoanSignupPage />} />
      <Route path="/loan-login" element={<LaonLoginPage />} />
      <Route path="/loan-info" element={<InterestFreeLoansPage />} />
    </Routes>
    </Router>
   
  )
}

export default App