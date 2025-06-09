"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  CreditCard,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  XCircle,
  DollarSign,
  CheckCircle,
} from "lucide-react"

export default function BillingPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="px-5 lg:px-0 text-base md:text-xl lg:text-2xl font-bold">Subscription & Billing</h2>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        <Tabs defaultValue="subscriptions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>Current active subscription plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search subscriptions..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: 1,
                        user: "John Smith",
                        email: "john@techcorp.com",
                        plan: "Premium",
                        amount: 99.99,
                        status: "Active",
                        nextBilling: "2024-02-15",
                        paymentMethod: "Credit Card",
                      },
                      {
                        id: 2,
                        user: "Sarah Johnson",
                        email: "sarah@email.com",
                        plan: "Free",
                        amount: 0,
                        status: "Active",
                        nextBilling: "-",
                        paymentMethod: "-",
                      },
                      {
                        id: 3,
                        user: "Mike Wilson",
                        email: "mike@startup.com",
                        plan: "Basic",
                        amount: 29.99,
                        status: "Active",
                        nextBilling: "2024-02-13",
                        paymentMethod: "PayPal",
                      },
                    ].map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {subscription.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{subscription.user}</p>
                              <p className="text-sm text-gray-500">{subscription.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscription.plan === "Premium"
                                ? "default"
                                : subscription.plan === "Basic"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.amount > 0 ? `$${subscription.amount}` : "Free"}</TableCell>
                        <TableCell>
                          <Badge variant="default">{subscription.status}</Badge>
                        </TableCell>
                        <TableCell>{subscription.nextBilling}</TableCell>
                        <TableCell>{subscription.paymentMethod}</TableCell>
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Subscription
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Free",
                  price: "$0",
                  features: ["5 job posts", "Basic support", "Standard listing"],
                  users: 1247,
                },
                {
                  name: "Basic",
                  price: "$29.99",
                  features: ["25 job posts", "Priority support", "Featured listing", "Analytics"],
                  users: 456,
                },
                {
                  name: "Premium",
                  price: "$99.99",
                  features: [
                    "Unlimited job posts",
                    "24/7 support",
                    "Premium listing",
                    "Advanced analytics",
                    "Custom branding",
                  ],
                  users: 189,
                },
              ].map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.name}
                      <Badge variant="outline">{plan.users} users</Badge>
                    </CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Button className="w-full" variant="outline">
                        Edit Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Complete payment transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "TXN001",
                        user: "John Smith",
                        plan: "Premium",
                        amount: 99.99,
                        method: "Credit Card",
                        date: "2024-01-20",
                        status: "Completed",
                      },
                      {
                        id: "TXN002",
                        user: "Sarah Johnson",
                        plan: "Basic",
                        amount: 29.99,
                        method: "PayPal",
                        date: "2024-01-19",
                        status: "Completed",
                      },
                      {
                        id: "TXN003",
                        user: "Mike Wilson",
                        plan: "Premium",
                        amount: 99.99,
                        method: "Credit Card",
                        date: "2024-01-18",
                        status: "Failed",
                      },
                    ].map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">{transaction.id}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.plan}</Badge>
                        </TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Completed"
                                ? "default"
                                : transaction.status === "Failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {transaction.status}
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Receipt
                              </DropdownMenuItem>
                              {transaction.status === "Failed" && (
                                <DropdownMenuItem>
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Generated invoices and billing documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search invoices..." className="pl-10 w-[250px]" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        invoice: "INV-2024-001",
                        customer: "John Smith",
                        plan: "Premium",
                        amount: 99.99,
                        issueDate: "2024-01-20",
                        dueDate: "2024-02-20",
                        status: "Paid",
                      },
                      {
                        invoice: "INV-2024-002",
                        customer: "Sarah Johnson",
                        plan: "Basic",
                        amount: 29.99,
                        issueDate: "2024-01-19",
                        dueDate: "2024-02-19",
                        status: "Paid",
                      },
                      {
                        invoice: "INV-2024-003",
                        customer: "Mike Wilson",
                        plan: "Premium",
                        amount: 99.99,
                        issueDate: "2024-01-18",
                        dueDate: "2024-02-18",
                        status: "Overdue",
                      },
                    ].map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-mono">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{invoice.plan}</Badge>
                        </TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>{invoice.issueDate}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Overdue"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
