"use client"

import { useState } from "react"
import { Bell, X, Mail, User, Calendar, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Notification {
  id: number
  type: "email" | "user" | "calendar" | "alert"
  title: string
  message: string
  time: string
  isRead: boolean
}

export default function NotificationDropdownWithCustomScroll() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "email",
      title: "New Email",
      message: "You have received a new email from john@example.com",
      time: "2 min ago",
      isRead: false,
    },
    {
      id: 2,
      type: "user",
      title: "New User Registration",
      message: "Sarah Johnson has joined your team",
      time: "5 min ago",
      isRead: false,
    },
    {
      id: 3,
      type: "calendar",
      title: "Meeting Reminder",
      message: "Team standup meeting starts in 15 minutes",
      time: "10 min ago",
      isRead: true,
    },
    {
      id: 4,
      type: "alert",
      title: "System Alert",
      message: "Server maintenance scheduled for tonight",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 5,
      type: "email",
      title: "Email Bounced",
      message: "Your email to invalid@domain.com could not be delivered",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 6,
      type: "user",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      time: "3 hours ago",
      isRead: true,
    },
    {
      id: 7,
      type: "calendar",
      title: "Event Cancelled",
      message: "The quarterly review meeting has been cancelled",
      time: "4 hours ago",
      isRead: true,
    },
    {
      id: 8,
      type: "email",
      title: "Newsletter Sent",
      message: "Your monthly newsletter has been sent to 1,234 subscribers",
      time: "5 hours ago",
      isRead: true,
    },
    {
      id: 9,
      type: "alert",
      title: "Security Alert",
      message: "New login detected from unknown device",
      time: "6 hours ago",
      isRead: false,
    },
    {
      id: 10,
      type: "user",
      title: "Team Invitation",
      message: "You've been invited to join the Marketing team",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: 11,
      type: "email",
      title: "Email Campaign Results",
      message: "Your email campaign achieved a 25% open rate",
      time: "1 day ago",
      isRead: false,
    },
    {
      id: 12,
      type: "alert",
      title: "Storage Warning",
      message: "Your storage is 90% full. Consider upgrading your plan",
      time: "2 days ago",
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "user":
        return <User className="h-4 w-4 text-green-500" />
      case "calendar":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0" align="end" sideOffset={5}>
    

        {/* Notifications List - Custom Scrollable Area */}
        <div
          className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
          }}
        >
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-muted/50 transition-colors border-l-4 ${
                    notification.isRead ? "border-transparent" : "border-blue-500 bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                   
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              notification.isRead ? "text-foreground" : "text-foreground font-semibold"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p
                            className={`text-sm mt-1 ${notification.isRead ? "text-muted-foreground" : "text-foreground/80"}`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

     
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
