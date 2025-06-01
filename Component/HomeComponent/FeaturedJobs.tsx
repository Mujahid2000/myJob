import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Star, ArrowRight, Bookmark } from "lucide-react"

export default function FeaturedJobs() {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Spotify",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      tags: ["UI/UX", "Figma", "Design Systems"],
      featured: true,
      postedTime: "2 days ago",
      applicants: 24,
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Airbnb",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100k - $130k",
      tags: ["React", "TypeScript", "Next.js"],
      featured: true,
      postedTime: "1 day ago",
      applicants: 18,
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$140k - $180k",
      tags: ["Python", "ML", "Analytics"],
      featured: true,
      postedTime: "3 days ago",
      applicants: 31,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Uber",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $140k",
      tags: ["AWS", "Docker", "Kubernetes"],
      featured: false,
      postedTime: "1 day ago",
      applicants: 12,
    },
    {
      id: 5,
      title: "Mobile Developer",
      company: "Instagram",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote",
      type: "Contract",
      salary: "$90k - $120k",
      tags: ["React Native", "iOS", "Android"],
      featured: false,
      postedTime: "4 days ago",
      applicants: 27,
    },
    {
      id: 6,
      title: "Backend Engineer",
      company: "Slack",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $160k",
      tags: ["Node.js", "PostgreSQL", "GraphQL"],
      featured: false,
      postedTime: "2 days ago",
      applicants: 19,
    },
  ]

  return (
    <section className="py-0 lg:py-5 bg-white px-4 lg:px-0">
      <div className="max-w-7xl mx-auto ">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
            <p className="text-gray-600">Discover your next career opportunity</p>
          </div>
          <Button variant="outline" className="hidden cursor-pointer text-[#0A65CC] sm:flex items-center gap-2">
            View all jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredJobs.map((job) => (
            <Card
              key={job.id}
              className="group hover:shadow-lg transition-all duration-300  border-0 shadow-sm hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Header with Company Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {job.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#0A65CC] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{job.salary}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-[#0A65CC] bg-blue-100">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{job.postedTime}</span>
                    <span>•</span>
                    <span>{job.applicants} applicants</span>
                    {job.featured && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Star className="h-3 w-3 fill-current" />
                          <span>Featured</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Button size="sm" className="bg-[#0A65CC] cursor-pointer hover:bg-blue-700">
                    Apply 
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center sm:hidden">
          <Button variant="outline" className="w-full max-w-sm">
            View all jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
