"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Bell,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Send,
  MessageSquare,
  CreditCard,
  Globe,
  UserCheck,
  UserX,
  Mail,
  MapPin,
  Building,
  Clock,
  Activity,
  Smartphone,
  Monitor,
  Menu,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


// Mock data for analytics charts
const userGrowthData = [
  { month: "Jan", employers: 120, jobSeekers: 450, total: 570 },
  { month: "Feb", employers: 150, jobSeekers: 520, total: 670 },
  { month: "Mar", employers: 180, jobSeekers: 600, total: 780 },
  { month: "Apr", employers: 220, jobSeekers: 720, total: 940 },
  { month: "May", employers: 280, jobSeekers: 850, total: 1130 },
  { month: "Jun", employers: 320, jobSeekers: 980, total: 1300 },
]

const revenueData = [
  { month: "Jan", revenue: 12500, subscriptions: 85 },
  { month: "Feb", revenue: 15200, subscriptions: 102 },
  { month: "Mar", revenue: 18900, subscriptions: 126 },
  { month: "Apr", revenue: 22400, subscriptions: 149 },
  { month: "May", revenue: 28700, subscriptions: 191 },
  { month: "Jun", revenue: 34200, subscriptions: 228 },
]

const jobPostsData = [
  { category: "Technology", count: 450, color: "#8884d8" },
  { category: "Healthcare", count: 320, color: "#82ca9d" },
  { category: "Finance", count: 280, color: "#ffc658" },
  { category: "Education", count: 180, color: "#ff7300" },
  { category: "Marketing", count: 150, color: "#00ff00" },
  { category: "Others", count: 220, color: "#ff0000" },
]

// Mock data for tables
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@techcorp.com",
    type: "Employer",
    company: "TechCorp Inc.",
    joinDate: "2024-01-15",
    status: "Active",
    subscription: "Premium",
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    type: "Job Seeker",
    company: "-",
    joinDate: "2024-01-14",
    status: "Active",
    subscription: "Free",
    lastLogin: "2024-01-19",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@startup.com",
    type: "Employer",
    company: "StartupXYZ",
    joinDate: "2024-01-13",
    status: "Suspended",
    subscription: "Basic",
    lastLogin: "2024-01-18",
  },
]

const jobPosts = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    employer: "John Smith",
    posted: "2024-01-20",
    status: "Pending",
    applications: 45,
    salary: "$120k-150k",
    location: "New York",
    reported: false,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    employer: "Mike Wilson",
    posted: "2024-01-19",
    status: "Approved",
    applications: 32,
    salary: "$130k-160k",
    location: "San Francisco",
    reported: true,
  },
]

const supportTickets = [
  {
    id: 1,
    user: "Sarah Johnson",
    subject: "Unable to upload resume",
    priority: "High",
    status: "Open",
    created: "2024-01-20",
    lastUpdate: "2024-01-20",
  },
  {
    id: 2,
    user: "John Smith",
    subject: "Billing inquiry",
    priority: "Medium",
    status: "In Progress",
    created: "2024-01-19",
    lastUpdate: "2024-01-20",
  },
]

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

const StatCard = ({ title, value, icon: Icon, description, trend, color = "blue" }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color}-600`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className={`flex items-center text-xs ${trend.startsWith("+") ? "text-green-600" : "text-red-600"} mt-1`}>
          <TrendingUp className="h-3 w-3 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
)

export default function SaasAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter function for users based on search term
  const filterUsers = ({users, term}: {users: any, term: any}) => {
    if (!term) return users
    return users.filter(
      (user: any) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.company.toLowerCase().includes(term.toLowerCase()),
    )
  }
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        <div className="flex items-center justify-between p-4 border-b ">
          <h2 className="font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="p-4 space-y-2 h-full overflow-y-auto">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("overview")
              setIsMobileSidebarOpen(false)
            }}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("users")
              setIsMobileSidebarOpen(false)
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            User Management
          </Button>
          <Button
            variant={activeTab === "jobs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("jobs")
              setIsMobileSidebarOpen(false)
            }}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Job Posts
          </Button>
          <Button
            variant={activeTab === "billing" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("billing")
              setIsMobileSidebarOpen(false)
            }}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("notifications")
              setIsMobileSidebarOpen(false)
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "support" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("support")
              setIsMobileSidebarOpen(false)
            }}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Support
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("chat")
              setIsMobileSidebarOpen(false)
            }}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Customer Chat
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("security")
              setIsMobileSidebarOpen(false)
            }}
          >
            <Shield className="h-4 w-4 mr-2" />
            Security
          </Button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">JobPortal Admin</h1>
                <p className="text-sm md:text-base text-gray-600 hidden sm:block">
                  SAAS Job Posting Platform Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Notifications</span>
                    <Badge className="ml-1 md:ml-2">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 border-b">
                    <h4 className="font-medium">Notifications</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <DropdownMenuItem className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-blue-100 rounded-full">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-gray-500">Sarah Johnson joined as job seeker</p>
                          <p className="text-xs text-gray-400">2 minutes ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-green-100 rounded-full">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payment received</p>
                          <p className="text-xs text-gray-500">$99.99 from John Smith</p>
                          <p className="text-xs text-gray-400">1 hour ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-red-100 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Job post reported</p>
                          <p className="text-xs text-gray-500">Senior Developer position flagged</p>
                          <p className="text-xs text-gray-400">3 hours ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" className="w-full text-sm">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === "overview" && (
            <>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Users"
                    value={15847}
                    icon={Users}
                    description="+12% from last month"
                    trend="+12%"
                    color="blue"
                  />
                  <StatCard
                    title="Active Job Posts"
                    value={1234}
                    icon={Briefcase}
                    description="+8% from last month"
                    trend="+8%"
                    color="green"
                  />
                  <StatCard
                    title="Monthly Revenue"
                    value="$34,200"
                    icon={DollarSign}
                    description="+15% from last month"
                    trend="+15%"
                    color="yellow"
                  />
                  <StatCard
                    title="Support Tickets"
                    value={23}
                    icon={MessageSquare}
                    description="5 pending response"
                    trend="-5%"
                    color="red"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>Monthly user registration trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          employers: { label: "Employers", color: "#8884d8" },
                          jobSeekers: { label: "Job Seekers", color: "#82ca9d" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="employers" stroke="#8884d8" name="Employers" />
                            <Line type="monotone" dataKey="jobSeekers" stroke="#82ca9d" name="Job Seekers" />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                      <CardDescription>Monthly subscription revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          revenue: { label: "Revenue", color: "#8884d8" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Latest platform activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: "New user registered", user: "Sarah Johnson", time: "2 minutes ago", type: "user" },
                          { action: "Job post approved", user: "TechCorp Inc.", time: "15 minutes ago", type: "job" },
                          { action: "Payment received", user: "John Smith", time: "1 hour ago", type: "payment" },
                          {
                            action: "Support ticket created",
                            user: "Mike Wilson",
                            time: "2 hours ago",
                            type: "support",
                          },
                          { action: "User suspended", user: "Spam Account", time: "3 hours ago", type: "security" },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div
                              className={`p-2 rounded-full ${
                                activity.type === "user"
                                  ? "bg-blue-100 text-blue-600"
                                  : activity.type === "job"
                                    ? "bg-green-100 text-green-600"
                                    : activity.type === "payment"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : activity.type === "support"
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-red-100 text-red-600"
                              }`}
                            >
                              {activity.type === "user" && <Users className="h-4 w-4" />}
                              {activity.type === "job" && <Briefcase className="h-4 w-4" />}
                              {activity.type === "payment" && <DollarSign className="h-4 w-4" />}
                              {activity.type === "support" && <MessageSquare className="h-4 w-4" />}
                              {activity.type === "security" && <Shield className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-gray-500">{activity.user}</p>
                            </div>
                            <p className="text-sm text-gray-400">{activity.time}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common admin tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Approve Pending Users
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Review Job Posts
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Check Support Tickets
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Announcement
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Management</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="employers">Employers</TabsTrigger>
                  <TabsTrigger value="jobseekers">Job Seekers</TabsTrigger>
                  <TabsTrigger value="suspended">Suspended</TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <TabsContent value="all">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterUsers({ users, term: searchTerm }).map((user:any) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n:any) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.type === "Employer" ? "default" : "secondary"}>{user.type}</Badge>
                            </TableCell>
                            <TableCell>{user.company}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.subscription === "Premium"
                                    ? "default"
                                    : user.subscription === "Basic"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {user.subscription}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {user.status === "Active" ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Suspend User
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Activate User
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="employers">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterUsers({
                          users: users.filter((user) => user.type === "Employer"),
                          term: searchTerm,
                        }).map((user:any) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n:any) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-gray-400" />
                                {user.company}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.subscription === "Premium"
                                    ? "default"
                                    : user.subscription === "Basic"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {user.subscription}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {user.status === "Active" ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Suspend User
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Activate User
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="jobseekers">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterUsers({
                          users: users.filter((user) => user.type === "Job Seeker"),
                          term: searchTerm,
                        }).map((user:any) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n:any) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="outline" className="text-xs">
                                  React
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  JavaScript
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.subscription === "Premium"
                                    ? "default"
                                    : user.subscription === "Basic"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {user.subscription}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {user.status === "Active" ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Suspend User
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Activate User
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="suspended">
                  <Card>
                    <Table >
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Suspended Date</TableHead>
                          <TableHead>Suspended By</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterUsers({
                          users: users.filter((user) => user.status === "Suspended"),
                          term: searchTerm,
                        }).map((user:any) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n:any) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.type === "Employer" ? "default" : "secondary"}>{user.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="destructive">Policy Violation</Badge>
                            </TableCell>
                            <TableCell>2024-01-18</TableCell>
                            <TableCell>Admin User</TableCell>
                            <TableCell className="text-right">
                              <div className="flex space-x-2 justify-end">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="default">
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
