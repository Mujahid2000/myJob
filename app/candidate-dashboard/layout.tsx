

import ResponsiveDashboard from "@/Hooks/DashboardClientLayoutCandidate"
import type React from "react"



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ResponsiveDashboard>{children}</ResponsiveDashboard>
}
