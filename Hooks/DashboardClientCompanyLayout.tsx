'use client'
import { useAuth } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { BellRing, Bookmark, BriefcaseBusiness, Layers, List, LogOut, NotebookText, PlusCircle, Settings, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
const sidebarDetails= [
    { "name": "Overview", "link": "/company-dashboard", "icon": <Layers /> },
    { "name": "Employer Profile", "link": "/company-dashboard/employer-profile", "icon": <UserCircle2/> },
    { "name": "Post a Job", "link": "/company-dashboard/Post-a-Job", "icon": <PlusCircle/> },
    { "name": "My Jobs", "link": "/company-dashboard/my-jobs", "icon":<BriefcaseBusiness /> },
    { "name": "Saved Candidates", "link": "/company-dashboard/saved-candidates", "icon": <Bookmark /> },
    { "name": "Plans & Billing", "link": "/company-dashboard/plans-&-billing", "icon": <NotebookText /> },
    { "name": "All Companies", "link": "/company-dashboard/all-companies", "icon": <List /> },
    { "name": "Settings", "link": "/company-dashboard/settings", "icon": <Settings />}
  ]
const DashboardClientLayoutCompany: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter()
    console.log('get',router)
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full  flex flex-col justify-between min-h-screen md:w-80 bg-white p-6">
              <div>
                <h1 className="text-base uppercase text-[#9199A3] font-bold mb-6">Employee Dashboard</h1>
                <nav className="space-y-2">
                 {
                    sidebarDetails.map((info, index) => (
                  <Link key={index}
                    href={info.link}
                    className={`flex items-center gap-4 bg-[#E7F0FA] text-[#767F8C] font-medium ${pathname === info.link || pathname === 'company-dashboard' ? "active" : ""} duration-300 px-5 py-2 hover:text-white`}
                  >
                    {info.icon} {info.name}
                  </Link>
                    ))
                 }
                 
                </nav>
              </div>
              <Button
               onClick={handleLogout}
                className="mt-6 cursor-pointer w-full flex text-left text-white hover:bg-[#9199A3]"
              >
                <LogOut /> Logout
              </Button>
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

export default DashboardClientLayoutCompany;