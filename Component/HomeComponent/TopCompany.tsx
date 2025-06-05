'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Users, MapPin, ArrowRight, Briefcase } from "lucide-react"
import { CompanyProfileHome, useGetCompanyDataForHomeQuery } from "@/RTKQuery/companySlice"

export default function TopCompanies() {
  const {data:companyData} = useGetCompanyDataForHomeQuery('');
  const topCompaniesData = companyData?.data;


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
          {topCompaniesData && Array.isArray(topCompaniesData) && topCompaniesData.map((company) => (
            <Card
              key={company._id}
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
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.companyName} />
                    <AvatarFallback className="bg-blue-100 text-[#0A65CC] font-bold text-lg">
                      {company.companyName?.slice(0,1)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0A65CC] transition-colors">
                    {company.companyName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{company.industryType}</p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {company.organizationType}
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
                    <span className="font-medium">{company.totalCompanyJobs} open jobs</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{company.employee} employees</span>
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
