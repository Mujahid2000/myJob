import DashboardClientLayoutCompany from "@/Hooks/DashboardClientCompanyLayout";

// app/dashboard/layout.tsx


export default function DashboardLayout({ children }: {children: any}) {
    return (
      <div>
        <DashboardClientLayoutCompany>
        {children}
        </DashboardClientLayoutCompany>
        <footer>Dashboard Footer</footer>
      </div>
    );
  }