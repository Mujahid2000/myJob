import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Users, MapPin, ArrowRight, Briefcase } from "lucide-react"

export default function TopCompanies() {
  const topCompanies = [
    {
      id: 1,
      name: "Google",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Search engine and cloud computing",
      type: "Technology",
      location: "Mountain View, CA",
      employees: "100k+",
      openJobs: 234,
      featured: true,
      benefits: ["Health Insurance", "Remote Work", "Stock Options"],
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Software and cloud services",
      type: "Technology",
      location: "Redmond, WA",
      employees: "200k+",
      openJobs: 189,
      featured: true,
      benefits: ["401k Match", "Flexible Hours", "Learning Budget"],
    },
    {
      id: 3,
      name: "Apple",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Consumer electronics and software",
      type: "Technology",
      location: "Cupertino, CA",
      employees: "150k+",
      openJobs: 156,
      featured: false,
      benefits: ["Health Insurance", "Employee Discounts", "Wellness"],
    },
    {
      id: 4,
      name: "Amazon",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Online retail and cloud computing",
      type: "E-commerce",
      location: "Seattle, WA",
      employees: "1.5M+",
      openJobs: 312,
      featured: false,
      benefits: ["Career Development", "Parental Leave", "Health Benefits"],
    },
    {
      id: 5,
      name: "Meta",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Social networking and VR/AR",
      type: "Social Media",
      location: "Menlo Park, CA",
      employees: "80k+",
      openJobs: 98,
      featured: true,
      benefits: ["Free Meals", "Transportation", "Gym Membership"],
    },
    {
      id: 6,
      name: "Tesla",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Electric vehicles and clean energy",
      type: "Automotive",
      location: "Austin, TX",
      employees: "120k+",
      openJobs: 145,
      featured: false,
      benefits: ["Stock Purchase Plan", "Health Insurance", "Commuter Benefits"],
    },
    {
      id: 7,
      name: "Netflix",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Streaming and content production",
      type: "Entertainment",
      location: "Los Gatos, CA",
      employees: "12k+",
      openJobs: 67,
      featured: false,
      benefits: ["Unlimited PTO", "Parental Leave", "Learning Budget"],
    },
    {
      id: 8,
      name: "Spotify",
      logo: "/placeholder.svg?height=64&width=64",
      service: "Music streaming platform",
      type: "Music Tech",
      location: "Stockholm, Sweden",
      employees: "8k+",
      openJobs: 43,
      featured: false,
      benefits: ["Flexible Work", "Wellness Budget", "Music Perks"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Companies Hiring</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing career opportunities at the world's most innovative companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topCompanies.map((company) => (
            <Card
              key={company.id}
              className="group hover:shadow-xl transition-all duration-300  border hover:border-blue-200 relative overflow-hidden py-0"
            >
              {company.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Featured
                </div>
              )}

              <CardContent className="p-6">
                {/* Company Header */}
                <div className="text-center mb-4">
                  <Avatar className="h-16 w-16 mx-auto mb-3 ring-2 ring-gray-100 group-hover:ring-[#0A65CC] transition-all">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback className="bg-blue-100 text-[#0A65CC] font-bold text-lg">
                      {company.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0A65CC] transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{company.service}</p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {company.type}
                  </Badge>
                </div>

                {/* Company Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#0A65CC]">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-medium">{company.openJobs} open jobs</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{company.employees} employees</span>
                  </div>
                </div>

              

                {/* Action Button */}
                <Button
                  className="w-full cursor-pointer bg-[#0A65CC] hover:bg-blue-700 group-hover:bg-blue-700 transition-all"
                  size="sm"
                >
                  View Jobs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Companies Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Companies
            <Building2 className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
