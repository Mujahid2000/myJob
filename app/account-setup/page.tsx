'use client';

import { useContext, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { AtSign, Globe, User2, UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/Store/Store';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useAccountInfoGetQuery } from '@/RTKQuery/AccountSetupApi';

import FoundingInfo from '@/Component/AccountSetup/FoundingInfo';

import Contact from '@/Component/AccountSetup/Contact';
import SetupComplete from '@/Component/AccountSetup/Success';
import CompanyInfo from '@/Component/AccountSetup/CompanyInfot';
import SocialMediaInfo from '@/Component/AccountSetup/SocialMediaInfo';

// Interfaces
interface Tab {
  name: string;
  icon: React.ComponentType;
}

interface AccountSetupPageProps {}

// Constants
const TABS: Tab[] = [
  { name: 'Company Info', icon: User2 },
  { name: 'Founding Info', icon: UserCircle },
  { name: 'Social Media Profile', icon: Globe },
  { name: 'Contact', icon: AtSign },
];

const PROGRESS_STEP = 25;
const REDIRECT_TIMEOUT = 2000;

// Component
const AccountSetupPage: React.FC<AccountSetupPageProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const renderState = useSelector((state: RootState) => state.accountSetup);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const [activeTab, setActiveTab] = useState<string>(TABS[0].name);
  const [progress, setProgress] = useState<number>(0);

  const { data: userEmail, isLoading: isUserLoading, error: userError } = useGetUserByIdQuery(
    currentUser?.email || '',
    { skip: !currentUser?.email }
  );
  const role = userEmail?.user.role
  const userId = userEmail?.user?._id || '';
  const { data: setUpProfileData, isLoading: isProfileLoading } = useAccountInfoGetQuery(userId, {
    skip: !userId,
  });

  // Redirect to signin if no user
  useEffect(() => {
    if (!currentUser && !isUserLoading) {
      const timer = setTimeout(() => {
        router.push('/signin');
      }, REDIRECT_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [currentUser, isUserLoading, router]);

  // Redirect to home if setup is complete
  useEffect(() => {
    if (setUpProfileData?.noComplete === false && !isProfileLoading || role === 'Applicant') {
      router.push('/');
    }
  }, [setUpProfileData?.noComplete, isProfileLoading, router, role]);

  // Update active tab and progress based on redux state
  useEffect(() => {
    if (renderState) {
      const newTab = TABS.find((tab) => tab.name === renderState)?.name || TABS[0].name;
      setActiveTab(newTab);
      setProgress(TABS.findIndex((tab) => tab.name === newTab) * PROGRESS_STEP);
    }
  }, [renderState]);

  // Handle tab change
  const handleTabChange = useCallback((tabName: string) => {
    setActiveTab(tabName);
    setProgress(TABS.findIndex((tab) => tab.name === tabName) * PROGRESS_STEP);
  }, []);

  // Render tab content
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'Company Info':
        return <CompanyInfo />;
      case 'Founding Info':
        return <FoundingInfo />;
      case 'Social Media Profile':
        return <SocialMediaInfo />;
      case 'Contact':
        return <Contact />;
      case 'success':
        return <SetupComplete />;
      default:
        return null;
    }
  }, [activeTab]);

  // Handle loading and error states
  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A65CC]"></div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading user data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white p-4 flex justify-between items-center flex-wrap shadow-sm">
        <div className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png"
            alt="MyJob Logo"
            width={40}
            height={40}
            priority
          />
          <p className="text-2xl font-semibold">MyJob</p>
        </div>
        <div className="flex flex-col gap-2 mx-4 w-full sm:w-auto">
          <div className="flex justify-between gap-5 text-sm text-gray-600">
            <p>Setup Progress</p>
            <p>{activeTab === 'success' ? '100% Completed' : `${progress}% Completed`}</p>
          </div>
          <div className="bg-gray-200 rounded-full h-2.5 w-full max-w-sm">
            <div
              className="bg-[#0A65CC] h-2.5 rounded-full transition-all duration-300"
              style={{ width: activeTab === 'success' ? '100%' : `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {activeTab === 'success' ? (
        <SetupComplete />
      ) : (
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <nav className="flex flex-wrap gap-2 border-b mb-6 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab.name)}
                  className={`py-2 px-4 flex items-center gap-2 whitespace-nowrap rounded-md transition-colors ${
                    activeTab === tab.name
                      ? 'border-b-2 border-[#0A65CC] text-[#0A65CC] font-semibold'
                      : 'text-gray-600 hover:text-[#0A65CC] hover:bg-gray-100'
                  }`}
                  aria-current={activeTab === tab.name ? 'page' : undefined}
                >
                  <tab.icon />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
            {renderTabContent()}
          </div>
        </main>
      )}

      <footer className="bg-white p-4 text-center text-sm text-gray-600 border-t">
        © {new Date().getFullYear()} MyJob - Job Portal. All Rights Reserved
      </footer>
    </div>
  );
};

export default AccountSetupPage;