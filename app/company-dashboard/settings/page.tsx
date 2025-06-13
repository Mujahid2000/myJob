'use client';

import { useAuth } from '@/Authentication/AuthContext';
import Settings from '@/Component/Employee-Dashboard/Settings/AccountSettings';
import EmployeeCompanyInfo from '@/Component/Employee-Dashboard/Settings/Personal';
import Profile from '@/Component/Employee-Dashboard/Settings/Profile';
// ✅ Dynamic import with ssr: false
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const SocialLink = dynamic(() => import('@/Component/Employee-Dashboard/Settings/SocialLinks'), {
  ssr: false,
});

const Page: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("AuthContext is undefined. Ensure the provider is set up correctly.");
  }

  const { currentUser, activeTab, handleTab, loading } = authContext;

  useEffect(() => {
    const checkWindowSize = () => setIsMobile(window.innerWidth < 470);
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  }, []);




  const tabs = [
    "Personal",
    "Profile",
    "Social Links",
    isMobile ? "Settings" : "Account Settings"
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden px-4">
        <h1 className="text-2xl font-medium pt-7 pb-4">Settings</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`flex-1 py-2 lg:py-4 text-sm lg:text-base text-center font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "Personal" && <Profile />}
          {activeTab === "Profile" && <EmployeeCompanyInfo />}
          {activeTab === "Social Links" && <SocialLink />}
          {(activeTab === "Account Settings" || activeTab === "Settings") && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default Page;
