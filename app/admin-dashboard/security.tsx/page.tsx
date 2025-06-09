
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, MoreHorizontal, Globe, Monitor, Smartphone, AlertTriangle, Bell, CheckCircle } from "lucide-react"

const adminLogs = [
  {
    id: 1,
    admin: "Admin User",
    action: "User Suspended",
    target: "Mike Wilson",
    timestamp: "2024-01-20 14:30",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    admin: "Admin User",
    action: "Job Post Approved",
    target: "Senior React Developer",
    timestamp: "2024-01-20 13:15",
    ip: "192.168.1.100",
  },
]

export default function SecurityPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Scan
          </Button>
        </div>

        <Tabs defaultValue="admins" className="space-y-4">
          <TabsList>
            <TabsTrigger value="admins">Admin Roles</TabsTrigger>
            <TabsTrigger value="logs">Login History</TabsTrigger>
            <TabsTrigger value="devices">Device Tracking</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Admin Role Management</CardTitle>
                <CardDescription>Manage administrator accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SU</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Super Admin</p>
                            <p className="text-sm text-gray-500">admin@jobportal.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">Super Admin</Badge>
                      </TableCell>
                      <TableCell>All Permissions</TableCell>
                      <TableCell>2024-01-20 09:30</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MO</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Moderator</p>
                            <p className="text-sm text-gray-500">moderator@jobportal.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Moderator</Badge>
                      </TableCell>
                      <TableCell>User Management, Job Posts</TableCell>
                      <TableCell>2024-01-20 08:15</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login History</CardTitle>
                <CardDescription>Track administrator login activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.admin}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.target}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-gray-400" />
                            {log.ip}
                          </div>
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant="default">Success</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device & IP Tracking</CardTitle>
                <CardDescription>Monitor admin access from different devices and locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      device: "MacBook Pro",
                      browser: "Chrome 120.0",
                      ip: "192.168.1.100",
                      location: "New York, US",
                      lastSeen: "Active now",
                      trusted: true,
                    },
                    {
                      device: "iPhone 15",
                      browser: "Safari Mobile",
                      ip: "10.0.0.50",
                      location: "New York, US",
                      lastSeen: "2 hours ago",
                      trusted: true,
                    },
                    {
                      device: "Windows PC",
                      browser: "Edge 119.0",
                      ip: "203.0.113.45",
                      location: "Unknown",
                      lastSeen: "1 week ago",
                      trusted: false,
                    },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {device.device.includes("MacBook") && <Monitor className="h-5 w-5" />}
                          {device.device.includes("iPhone") && <Smartphone className="h-5 w-5" />}
                          {device.device.includes("Windows") && <Monitor className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{device.device}</p>
                          <p className="text-sm text-gray-500">{device.browser}</p>
                          <p className="text-sm text-gray-500">
                            {device.ip} • {device.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{device.lastSeen}</p>
                        <Badge variant={device.trusted ? "default" : "destructive"}>
                          {device.trusted ? "Trusted" : "Suspicious"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                  <CardDescription>Configure platform security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-gray-500">Email alerts for admin logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Recent security events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        type: "warning",
                        message: "Multiple failed login attempts detected",
                        time: "2 hours ago",
                      },
                      {
                        type: "info",
                        message: "New admin device registered",
                        time: "1 day ago",
                      },
                      {
                        type: "success",
                        message: "Security scan completed successfully",
                        time: "2 days ago",
                      },
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`p-1 rounded-full ${
                            alert.type === "warning"
                              ? "bg-yellow-100 text-yellow-600"
                              : alert.type === "info"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          {alert.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                          {alert.type === "info" && <Bell className="h-4 w-4" />}
                          {alert.type === "success" && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
