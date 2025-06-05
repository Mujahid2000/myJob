'use client'
import DashboardClientLayoutCompany from "@/Hooks/DashboardClientCompanyLayout";



export default function DashboardLayout({ children }: {children: any}) {
    return (
      <div>
        <DashboardClientLayoutCompany>
        {children}
        </DashboardClientLayoutCompany>
        
      </div>
    );
  }