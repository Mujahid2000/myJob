import TestComponent from "@/Hooks/DashboardClientLayoutCandidate";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
   <div className="min-h-screen">
     <TestComponent>
      
      {children}
    </TestComponent>
   </div>
  );
}

