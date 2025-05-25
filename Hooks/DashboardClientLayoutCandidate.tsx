'use client'
import { useAuth } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { BellRing, Bookmark, BriefcaseBusiness, Layers, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const TestComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
    const authContext = useAuth();
    const currentUser = authContext?.currentUser;
    const logOut: (() => Promise<void>) | undefined = authContext?.logout;
    const loadingUser = authContext?.loading

const handleLogout = async () => {
  try {
    if (logOut) {
      await logOut();
    } else {
      console.error("Logout function is undefined.");
    }
    
  } catch (error) {
    console.error("Failed to logout:", error);
    alert("Failed to logout. Please try again."); 
  }
};

useEffect(() =>{
  if(!currentUser){
    router.push('/signin')
  }
},[currentUser, router])

if(loadingUser){
  return <div className="text-center p-4">Loading...</div>;
}


if(!currentUser){
  return null
}

    return (
        <div className="min-h-screen bg-gray-50 pt-29">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pt-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full  flex flex-col justify-between min-h-screen md:w-80 bg-white p-6">
              <div>
                <h1 className="text-base uppercase text-[#9199A3] font-bold mb-6">Candidate Dashboard</h1>
                <nav className="space-y-2">
                  <Link
                    href="/candidate-dashboard"
                    className="flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium hover:bg-[#0A65CC] duration-300 px-5 py-2 hover:text-white"
                  >
                    <Layers /> Overview
                  </Link>
                  <Link
                    href="/candidate-dashboard/applied-jobs"
                    className="flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium hover:bg-[#0A65CC] duration-300 px-5 py-2 hover:text-white"
                  >
                    <BriefcaseBusiness /> Applied Jobs
                  </Link>
                  <Link
                    href="/candidate-dashboard/favourite-jobs"
                    className="flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium hover:bg-[#0A65CC] duration-300 px-5 py-2 hover:text-white"
                  >
                    <Bookmark /> Favorite Jobs
                  </Link>
                  <Link
                    href="/candidate-dashboard/job-alerts"
                    className="flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium hover:bg-[#0A65CC] duration-300 px-5 py-2 hover:text-white"
                  >
                    <BellRing /> Job Alert 09
                  </Link>
                  <Link
                    href="/candidate-dashboard/settings"
                    className="flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium hover:bg-[#0A65CC] duration-300 px-5 py-2 hover:text-white"
                  >
                    <Settings /> Settings
                  </Link>
                </nav>
              </div>
              <button
                             onClick={handleLogout}
                              className="mt-6 p-3 cursor-pointer w-full flex text-left text-white bg-[#0A65CC] duration-300 font-semibold hover:bg-gray-100 hover:text-[#0A65CC] rounded-sm"
                            >
                              <LogOut /> Logout
                            </button>
            </div>
            <div className="flex-1 bg-white p-6 shadow">{children}</div>
          </div>
        </div>
        <p className="font-sans py-4 bg-white text-[#767F8C] border-t text-start md:text-center md:text-lg">
          @ 2024 MyJob - Job Portal. All rights Reserved
        </p>
      </div>
    );
};

export default TestComponent;