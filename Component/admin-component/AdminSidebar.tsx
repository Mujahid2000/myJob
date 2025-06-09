"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, Briefcase, TrendingUp, Bell, Shield, MessageSquare, CreditCard, Menu, X } from "lucide-react"

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin-dashboard",
    icon: TrendingUp,
  },
  {
    title: "User Management",
    href: "/admin-dashboard/users-managment",
    icon: Users,
  },
  {
    title: "Job Posts",
    href: "/admin-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Billing",
    href: "/admin-dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Customer Chat",
    href: "/admin-dashboard/customer-chat",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/admin-dashboard/notification",
    icon: Bell,
  },
  {
    title: "Security",
    href: "/admin-dashboard/security",
    icon: Shield,
  },
]

export function AdminSidebar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileSidebarOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden md:flex items-center p-4 border-b">
          <h2 className="font-semibold text-lg">JobPortal Admin</h2>
        </div>

        <nav className="p-4 space-y-2 h-screen overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
