'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import CompanyInfo from '@/Component/AccountSetup/CompanyInfot';
import FoundingInfo from '@/Component/AccountSetup/FoundingInfo';
import SocialMediaProfile from '@/Component/AccountSetup/SocialMediaInfo';
import Contact from '@/Component/AccountSetup/Contact';
import Image from 'next/image';
import { AtSign, Globe, User2, UserCircle } from 'lucide-react';
import SetupComplete from '@/Component/AccountSetup/Success';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';



export default function page() {
  const renderState = useSelector((state: RootState) => state.accountSetup);

  const [activeTab, setActiveTab] = useState<String | null>('Company Info');
  const [progress, setProgress] = useState(0);
  const tabs = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];
  const [success, setSuccess] = useState<string | null>(null)

 useEffect(() => {
  if (renderState !== null) {
    const newTab = renderState ;
    setActiveTab(newTab);
    setProgress(tabs.indexOf(newTab) * 25);
  }
}, [renderState]);



  const handlePrevious = () => {
    const currentIndex = tabs.indexOf(activeTab as string);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      setProgress(progress - 25);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Company Info':
        
        return (<CompanyInfo />);
      case 'Founding Info':
        
        return <FoundingInfo />;
      case 'Social Media Profile':
       
        return <SocialMediaProfile />;
      case 'Contact':
        
        return <Contact />;
      case 'success':
        
        return <SetupComplete />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
     
      <header className="bg-white  p-4 flex justify-between items-center">
        <div className='flex items-center gap-2'>
                                <Image
                                    src="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                />
                                <p className='text-2xl font-semibold'>MyJob</p>
                            </div>
                            {
                activeTab === 'success'? <div className="flex items-center flex-col gap-3 mx-4">
        
                <div className='flex justify-between gap-5'>
                  <p className="text-sm text-gray-600 text-right mt-1">Setup Progress</p>
                 
                  <p className="text-sm text-gray-600 text-right mt-1">100% Completed</p>
                </div>
                <div className="w-55 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#0A65CC] h-2.5 rounded-full" style={{ width: `100%` }}></div>
                </div>
              </div> : <div className="flex items-center flex-col gap-3 mx-4">
        
                <div className='flex justify-between gap-5'>
                  <p className="text-sm text-gray-600 text-right mt-1">Setup Progress</p>
                 
                  <p className="text-sm text-gray-600 text-right mt-1">{progress}% Completed</p>
                </div>
                <div className="w-55 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#0A65CC] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            }
        
      </header>
      {
        activeTab == 'success'?  <SetupComplete/> : <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg  p-6">
          <div className="flex space-x-4 border-b mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setProgress(tabs.indexOf(tab) * 25);
                }}
                className={`py-2 px-4 flex items-center space-x-2 ${
                  activeTab === tab ? 'border-b-2 border-[#0A65CC] text-[#0A65CC]' : 'text-gray-600'
                }`}
              >
                {tab === 'Company Info' && <User2/>}
                {tab === 'Founding Info' && <UserCircle/>}
                {tab === 'Social Media Profile' && <Globe/>}
                {tab === 'Contact' && <AtSign />}
                <span>{tab}</span>
              </button>
            ))}
          </div>
          {renderTabContent()}
          
        </div>
      </main>
      }
      
      <footer className="bg-white p-4 text-center text-sm text-gray-600">
        © 2024 MyJob - Job Portal. All Rights Reserved
      </footer>
    </div>
  );
}