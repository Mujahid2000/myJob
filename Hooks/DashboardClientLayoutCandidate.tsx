'use client'
import { useAuth } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { BellRing, Bookmark, BriefcaseBusiness, Layers, LogOut, MenuIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

const ResponsiveDashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigationItems = [
    {
      href: "/candidate-dashboard",
      icon: Layers,
      label: "Overview",
    },
    {
      href: "/candidate-dashboard/applied-jobs",
      icon: BriefcaseBusiness,
      label: "Applied Jobs",
    },
    {
      href: "/candidate-dashboard/favourite-jobs",
      icon: Bookmark,
      label: "Favorite Jobs",
    },
    {
      href: "/candidate-dashboard/job-alerts",
      icon: BellRing,
      label: "Job Alert 09",
    },
    {
      href: "/candidate-dashboard/settings",
      icon: Settings,
      label: "Settings",
    },
  ]
  
  
  const router = useRouter()
  const pathname = usePathname()
    const authContext = useAuth();
    const currentUser = authContext?.currentUser;
    const logOut: (() => Promise<void>) | undefined = authContext?.logout;
    const loadingUser = authContext?.loading
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false)
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

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const menuButton = document.getElementById("menu-button")

      if (
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

    const isActiveRoute = (href: string) => {
    return pathname === href
  }
    return (
       <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          id="menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <MenuIcon size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <div className="w-10" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            sidebarOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          id="mobile-sidebar"
          className={`relative flex flex-col w-80 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-base uppercase text-[#9199A3] font-bold">Candidate Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0A65CC] text-white"
                      : "bg-[#E7F0FA] text-[#767F8C] hover:bg-[#0A65CC] hover:text-white"
                  }`}
                  style={{
                    transitionDelay: sidebarOpen ? `${index * 50}ms` : "0ms",
                    opacity: sidebarOpen ? 1 : 0,
                    transform: sidebarOpen ? "translateX(0)" : "translateX(-10px)",
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white bg-[#0A65CC] hover:bg-[#084899] rounded-md font-semibold transition-colors duration-200"
              style={{
                transitionDelay: sidebarOpen ? "250ms" : "0ms",
                opacity: sidebarOpen ? 1 : 0,
                transform: sidebarOpen ? "translateX(0)" : "translateX(-10px)",
              }}
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container with max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="lg:flex">
          {/* Desktop Sidebar */}
          <div
            className={`hidden lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
              desktopSidebarCollapsed ? "lg:w-20" : "lg:w-80"
            } min-h-screen`}
          >
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h1
                  className={`text-base uppercase text-[#9199A3] font-bold transition-opacity duration-200 ${
                    desktopSidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
                  }`}
                >
                  Candidate Dashboard
                </h1>
                <button
                  onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <MenuIcon size={20} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isActiveRoute(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#0A65CC] text-white"
                          : "bg-[#E7F0FA] text-[#767F8C] hover:bg-[#0A65CC] hover:text-white"
                      } ${desktopSidebarCollapsed ? "justify-center" : ""}`}
                      title={desktopSidebarCollapsed ? item.label : ""}
                    >
                      <Icon size={20} />
                      <span
                        className={`transition-opacity duration-200 ${
                          desktopSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-white bg-[#0A65CC] hover:bg-[#084899] rounded-md font-semibold transition-colors duration-200 ${
                    desktopSidebarCollapsed ? "justify-center" : ""
                  }`}
                  title={desktopSidebarCollapsed ? "Logout" : ""}
                >
                  <LogOut size={20} />
                  <span
                    className={`transition-opacity duration-200 ${
                      desktopSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}
                  >
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white shadow min-h-screen">
            <div className="p-6">{children}</div>
          </div>
        </div>

        {/* Footer */}
        <p className="font-sans py-4 bg-white text-[#767F8C] border-t text-start md:text-center md:text-lg">
          © 2024 MyJob - Job Portal. All rights Reserved
        </p>
      </div>
    </div>
    );
};

export default ResponsiveDashboard;