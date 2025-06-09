
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Download, Eye, CheckCircle, XCircle, AlertTriangle, Building, MapPin } from "lucide-react"

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

export default function JobsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="px-5 lg:px-0 text-base md:text-xl lg:text-2xl font-bold">Job Post Management</h2>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="reported">Reported</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card className="px-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPosts
                    .filter((job) => job.status === "Pending")
                    .map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-gray-400" />
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>{job.employer}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.posted}</TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="default">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card className="px-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPosts
                    .filter((job) => job.status === "Approved")
                    .map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-gray-400" />
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>{job.employer}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.posted}</TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card className="px-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Rejection Reason</TableHead>
                    <TableHead>Rejected Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Marketing Specialist</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        SpamCorp
                      </div>
                    </TableCell>
                    <TableCell>Spam User</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Inappropriate Content</Badge>
                    </TableCell>
                    <TableCell>2024-01-18</TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="default">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="reported">
            <Card className="px-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Reported Job Posts
                </CardTitle>
                <CardDescription>Job posts that have been reported by users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobPosts
                      .filter((job) => job.reported)
                      .map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">3 reports</Badge>
                          </TableCell>
                          <TableCell>Spam/Misleading</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Under Review</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex space-x-2 justify-end">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="default">
                                Dismiss
                              </Button>
                              <Button size="sm" variant="destructive">
                                Remove
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
