'use client'

import { useAuth } from "@/Authentication/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

 
export default function DashboardClientAdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter()
    const authContext = useAuth();
    const currentUser = authContext?.currentUser;
    const logOut: (() => Promise<void>) | undefined = authContext?.logout;
    const loadingUser = authContext?.loading
    const { data: userEmail, isLoading , isSuccess, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
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
  } 

},[currentUser, role, redirect])


useEffect(() =>{
  if(isSuccess && role !== 'Company'){
    redirect('/')
  }
},[currentUser, role, redirect])

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
    <>
    {children}</>
  );
}