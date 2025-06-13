'use client';

import { useAuth } from '@/Authentication/AuthContext';
import { useToast } from '@/Component/Toast/ToastNotification';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamically import components to avoid SSR issues
const Profile = dynamic(() => import('@/Component/Dashboard/Settings/Profile'), { ssr: false });
const Personal = dynamic(() => import('@/Component/Dashboard/Settings/Personal'), { ssr: false });
const SocialLinks = dynamic(() => import('@/Component/Dashboard/Settings/SocialLinks'), { ssr: false });
const AccountSetting = dynamic(() => import('@/Component/Dashboard/Settings/AccountSettings'), { ssr: false });

const Settings: React.FC = () => {
  const [settingA, setSettingA] = useState(false);
  const { addToast } = useToast();
  const authContext = useAuth();

  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure the provider is set up correctly.');
  }

  const { activeTab, handleTab } = authContext;

  const tabs = ['Personal', 'Profile', 'Social Links', settingA ? 'Settings' : 'Account Setting'];

  useEffect(() => {
    // Only run on the client side
    const handleResize = () => {
      setSettingA(window.innerWidth < 470);
    };

    // Set initial value
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Example: Show a toast when a tab is changed
  const handleTabChange = (tab: string) => {
    handleTab(tab);
    addToast(`Switched to ${tab} tab`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
        <h1 className="text-2xl font-medium pt-7 pb-4">Settings</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2 lg:py-4 px-0 lg:px-6 text-sm lg:text-base text-center font-semibold ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="">
          {activeTab === 'Personal' && <Profile />}
          {activeTab === 'Profile' && <Personal />}
          {activeTab === 'Social Links' && <SocialLinks />}
          {(activeTab === 'Account Setting' || activeTab === 'Settings') && <AccountSetting />}
        </div>
      </div>
    </div>
  );
};

export default Settings;