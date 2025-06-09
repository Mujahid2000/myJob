
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send } from "lucide-react"

export default function NotificationsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notifications & Messaging</h2>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Send System Notification</CardTitle>
              <CardDescription>Send notifications to users or specific groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipient" className="py-2">Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="employers">Employers Only</SelectItem>
                    <SelectItem value="jobseekers">Job Seekers Only</SelectItem>
                    <SelectItem value="premium">Premium Subscribers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type" className="py-2">Notification Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title" className="py-2">Title</Label>
                <Input placeholder="Notification title" />
              </div>
              <div>
                <Label htmlFor="message" className="py-2">Message</Label>
                <Textarea placeholder="Notification message" rows={4} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email" />
                <Label htmlFor="email">Send via email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="push" />
                <Label htmlFor="push">Send push notification</Label>
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Recently sent system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "System Maintenance",
                    message: "Scheduled maintenance on Sunday 2AM-4AM",
                    type: "warning",
                    sent: "2 hours ago",
                    recipients: "All Users",
                  },
                  {
                    title: "New Feature Release",
                    message: "Introducing advanced job matching algorithm",
                    type: "info",
                    sent: "1 day ago",
                    recipients: "Premium Users",
                  },
                  {
                    title: "Security Update",
                    message: "Please update your passwords",
                    type: "emergency",
                    sent: "3 days ago",
                    recipients: "All Users",
                  },
                ].map((notification, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      <Badge
                        variant={
                          notification.type === "emergency"
                            ? "destructive"
                            : notification.type === "warning"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>To: {notification.recipients}</span>
                      <span>{notification.sent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
