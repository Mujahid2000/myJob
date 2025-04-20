'use client'
import {  useAuth } from '@/Authentication/AuthContext';
import Settings from '@/Component/Employee-Dashboard/Settings/AccountSettings';
import EmployeeCompanyInfo from '@/Component/Employee-Dashboard/Settings/Personal';
import Profile from '@/Component/Employee-Dashboard/Settings/Profile';
import SocialLink from '@/Component/Employee-Dashboard/Settings/SocialLinks';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';

const page:React.FC = () => {
    
    const router = useRouter(); // Ensure this is from 'next/navigation'
    const tabs = ["Personal", "Profile", "Social Links", "Account Setting"];

    const authContext = useAuth();

    if (!authContext) {
        throw new Error("AuthContext is undefined. Ensure the provider is set up correctly.");
    }

    const { currentUser,activeTab,handleTab, loading } = authContext;

    
    useEffect(() => {
        if (loading) return;
        if (!currentUser) {
          console.log("No user found, redirecting to /signin");
          router.push("/signin");
        }
      }, [currentUser, loading, router]);
    
      if (loading) {
        return <div className="text-center p-4">Loading...</div>;
      }
    
      if (!currentUser) {
        return null;
      }
    return (
        <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
          <h1 className='text-2xl font-medium pt-7 pb-4'>Settings</h1>
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)} // Use handleTab from context
              className={`flex-1 py-4 px-6 text-center font-semibold ${
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
        <div className="">
          {activeTab === "Personal" && <Profile />}
          {activeTab === "Profile" && <EmployeeCompanyInfo />}
          {activeTab === "Social Links" && <SocialLink />}
          {activeTab === "Account Setting" && <Settings />}
        </div>
      </div>
    </div>
    );
};

export default page;