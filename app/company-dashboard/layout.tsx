import DashboardClientLayoutCompany from "@/Hooks/DashboardClientCompanyLayout";

// app/dashboard/layout.tsx


export default function DashboardLayout({ children }) {
    return (
      <div>
        <DashboardClientLayoutCompany>
        {children}
        </DashboardClientLayoutCompany>
        <footer>Dashboard Footer</footer>
      </div>
    );
  }