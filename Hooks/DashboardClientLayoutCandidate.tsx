'use client'
import { useAuth } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { BellRing, Bookmark, BriefcaseBusiness, Layers, LogOut, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const ResponsiveDashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter()
    const authContext = useAuth();
    const currentUser = authContext?.currentUser;
    const logOut: (() => Promise<void>) | undefined = authContext?.logout;
    const loadingUser = authContext?.loading
    const { data: userEmail,isLoading, isSuccess, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
    const role = userEmail?.user.role
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
    redirect('/signin')
  } else if (isSuccess && role !== "Applicant") {
    redirect('/')
  }
},[currentUser, router])

if(loadingUser && isLoading){
  return (
    <div className="flex pt-35 max-w-7xl mx-auto h-screen flex-col">
      {/* Header skeleton */}
      <header className="border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="ml-auto flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar skeleton */}
        <div className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col p-4">
            <div className="space-y-4 py-4">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-8 w-[90%]" />
              <Skeleton className="h-8 w-[70%]" />
              <Skeleton className="h-8 w-[80%]" />
              <Skeleton className="h-8 w-[60%]" />
              <Skeleton className="h-8 w-[90%]" />
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            {/* Page title skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[350px]" />
            </div>

            {/* Stats cards skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl" />
              ))}
            </div>

            {/* Chart skeleton */}
            <Skeleton className="h-[300px] w-full rounded-xl" />

            {/* Table skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



    return (
        <div className="min-h-screen bg-gray-50 pt-29">
        <div className="max-w-7xl flex flex-col mx-auto px-4 sm:px-6 lg:px-4 pt-4">
          <div className="flex flex-col md:flex-row">
          
            <div className="w-full hidden lg:flex flex-col justify-between min-h-screen md:w-80 bg-white p-6">
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

export default ResponsiveDashboard;