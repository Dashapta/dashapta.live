import React from 'react';
import { useState,useEffect } from "react";
import { Calendar, TrendingUp, BookOpen, ArrowRight,Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
  import request from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("student"));
  const [applicationComplete, setApplicationComplete] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const res = await request("/check-application-status/", "POST", {
          uuid: user.uuid,
        });

        if (res.complete === true) {
          setApplicationComplete(true);
        }
      } catch (err) {
        console.error("Failed to check application status:", err);
      }
    };

    if (user?.uuid) {
      checkApplicationStatus();
    }
  }, []);


  const updates = [
    {
      icon: Calendar,
      title: 'Upcoming Exams',
      description: 'View dates, syllabus, and mock tests for your registered exams.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracker',
      description: 'Check your scores, mock test performance, and get feedback.',
    },
    {
      icon: BookOpen,
      title: 'Study Resources',
      description: 'Access exam-specific materials, practice sets, and previous year questions.',
    },
    {
      icon: Bell,
      title: 'Notifications & Updates',
      description: 'Stay informed about exam schedules, results, and announcements.',
    },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <div className="text-lg opacity-90 mb-2"><span className='text-xl font-bold'>Student ID: </span>{user.uuid}</div>
            <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
            <h2 className="text-4xl font-bold">{user.first_name} {user.last_name}!</h2>
          </div>
          <div className="w-78 h-48 flex items-center">
            <img
  src="/images/StudentWelcome.png"
  alt="Our Mission"
  className="w-[300px] h-[200px] object-contain transform -translate-x-20 scale-110"
/>
            
          </div>
        </div>
      </div>
      {applicationComplete && (
  <div className="mb-6 bg-green-100 text-green-900 border border-green-400 p-4 rounded-md shadow">
    <p className="text-lg font-semibold">
      Thank you for your application, your application is under process. You will be notified once your application is approved.
    </p>
  </div>
)}


      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="bg-white border-2 border-red-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate('/scholorship')}
          >
            <h4 style={{ color: "rgba(0, 63, 157, 1)" }} className="text-2xl font-bold underline mb-3">Apply for Scholarship</h4>
            <p className="text-gray-600 mb-6 text-xl">
              Unlock your potential and ease your educational journey.
            </p>
            <button className="flex items-center text-red-700 font-semibold hover:text-red-800 transition-colors cursor-pointer">
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate('/olympiad')}
          >
            <h4 style={{ color: "rgba(0, 63, 157, 1)" }} className="text-2xl font-bold underline mb-3">Apply for Olympiad Exam</h4>
            <p className="text-gray-600 mb-6 text-xl">
              Challenge yourself, showcase your skills, and compete at the national level.
            </p>
            <button className="flex items-center text-red-700 font-semibold hover:text-red-800 transition-colors cursor-pointer">
              Register Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Updates */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Updates</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {updates.map((update, index) => (
            <div
              key={index}
              className="flex bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow"
            >
              <div className="bg-[#891021] w-32 flex flex-col items-center justify-center p-4 space-y-2">
                <update.icon className="w-8 h-8 text-white" />
                <h4 className="text-white text-sm text-center font-medium">{update.title}</h4>
              </div>
              <div className="flex-1 p-4 flex items-center">
                <p className="text-gray-800 text-lg">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tips and Help Section */}
<div className="mt-10">
  {/* Tips Section */}
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Tips for You</h3>
  <div className="bg-gray-100 rounded-md p-4 text-gray-800 space-y-2 shadow">
    <p>Complete your profile for better recommendations</p>
    <p>Practice regularly with topic-wise mock tests</p>
    <p>Keep an eye on deadlines and announcements</p>
  </div>

  {/* Help Section */}
  <div className="mt-8">
    <h3 className="text-2xl font-bold text-[rgba(0,63,157,1)] mb-2">Need Help?</h3>
    <p className="text-lg text-gray-800">
      We're here for you! Reach out to <span className="font-medium">[admin@dashapta.live]</span> or visit the Help Center anytime.
    </p>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
