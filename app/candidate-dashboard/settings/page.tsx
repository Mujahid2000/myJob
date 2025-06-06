'use client';

import { useAuth } from '@/Authentication/AuthContext';
import AccountSetting from '@/Component/Dashboard/Settings/AccountSettings';
import Personal from '@/Component/Dashboard/Settings/Personal';
import Profile from '@/Component/Dashboard/Settings/Profile';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// ✅ SocialLinks কে dynamic import করা হয়েছে, ssr: false দিয়ে
const SocialLinks = dynamic(() => import('@/Component/Dashboard/Settings/SocialLinks'), {
  ssr: false,
});

const Settings: React.FC = () => {
  const [settingA, setSettingA] = useState(false);
  const router = useRouter();
  const tabs = ['Personal', 'Profile', 'Social Links', settingA ? 'Settings' : 'Account Setting'];

  const authContext = useAuth();

  if (!authContext) {
    throw new Error("AuthContext is undefined. Ensure the provider is set up correctly.");
  }

  const { currentUser, activeTab, handleTab, loading } = authContext;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 500) {
        setSettingA(true);
      } else {
        setSettingA(false);
      }
    }
  }, [settingA]);

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
        <h1 className="text-2xl font-medium pt-7 pb-4">Settings</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`flex-1 py-2 lg:py-4 px-0 lg:px-6 text-sm lg:text-base text-center font-semibold ${
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
          {(activeTab === "Account Setting" || activeTab === "Settings") && <AccountSetting />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
