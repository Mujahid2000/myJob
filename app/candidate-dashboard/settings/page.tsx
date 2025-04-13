'use client'
import {  useAuth } from '@/Authentication/AuthContext';
import AccountSetting from '@/Component/Dashboard/Settings/AccountSettings';
import Personal from '@/Component/Dashboard/Settings/Personal';
import Profile from '@/Component/Dashboard/Settings/Profile';
import SocialLinks from '@/Component/Dashboard/Settings/SocialLinks';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';

const Settings:React.FC = () => {
    
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
        <div className="min-h-screen bg-gray-100 ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
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
          {activeTab === "Profile" && <Personal />}
          {activeTab === "Social Links" && <SocialLinks />}
          {activeTab === "Account Setting" && <AccountSetting />}
        </div>
      </div>
    </div>
    );
};

export default Settings;