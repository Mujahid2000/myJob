"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bookmark, ChevronRight, Clock, Edit } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const jobAlertsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    companyLogo: "G",
    companyBg: "bg-blue-600",
    location: "Idaho, USA",
    salary: "$15K-$20K",
    type: "Full Time",
    typeColor: "bg-blue-100 text-blue-700",
    timeRemaining: "4 Days Remaining",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "YouTube",
    companyLogo: "▶",
    companyBg: "bg-red-600",
    location: "Minnesota, USA",
    salary: "$10K-$15K",
    type: "Full Time",
    typeColor: "bg-blue-100 text-blue-700",
    timeRemaining: "4 Days Remaining",
    isBookmarked: false,
  },
  {
    id: 3,
    title: "Front End Developer",
    company: "Stack Overflow",
    companyLogo: "SO",
    companyBg: "bg-orange-500",
    location: "Mymensingh, Bangladesh",
    salary: "$10K-$15K",
    type: "Internship",
    typeColor: "bg-orange-100 text-orange-700",
    timeRemaining: "4 Days Remaining",
    isBookmarked: true,
  },
  {
    id: 4,
    title: "Marketing Officer",
    company: "Dropbox",
    companyLogo: "📦",
    companyBg: "bg-blue-500",
    location: "Montana, USA",
    salary: "$20K-$40K",
    type: "Full Time",
    typeColor: "bg-blue-100 text-blue-700",
    timeRemaining: "5 Days Remaining",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Networking Engineer",
    company: "Instagram",
    companyLogo: "📷",
    companyBg: "bg-gradient-to-r from-purple-500 to-pink-500",
    location: "Michigan, USA",
    salary: "$15K-$20K",
    type: "Full Time",
    typeColor: "bg-blue-100 text-blue-700",
    timeRemaining: "5 Days Remaining",
    isBookmarked: true,
  },
]

export function JobAlertList() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="max-w-7xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Job Alerts</h1>
          <p className="text-sm text-gray-500">(5 new jobs)</p>
        </div>
        <Button variant="outline" className="self-start sm:self-center">
          <Edit className="mr-2 h-4 w-4" />
          Edit Job Alerts
        </Button>
      </div>

      {/* Table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">Job Details</th>
                  <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">
                    Location & Salary
                  </th>
                  <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">
                    Time Remaining
                  </th>
                  <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading? 
                   Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        {/* Job Details Column */}
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-md animate-pulse flex-shrink-0"></div>
                            <div className="space-y-2 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                              </div>
                              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                            </div>
                          </div>
                        </td>

                        {/* Location & Salary Column */}
                        <td className="p-3 md:p-4">
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                          </div>
                        </td>

                        {/* Time Remaining Column */}
                        <td className="p-3 md:p-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        </td>

                        {/* Actions Column */}
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                          </div>
                        </td>
                      </tr>
                    )): 
                    jobAlertsData.map((job, index) => (
                      <tr key={job.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        {/* Job Details Column */}
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 md:w-12 md:h-12 ${job.companyBg} rounded-md flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-white font-bold text-sm md:text-base">{job.companyLogo}</span>
                            </div>
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{job.title}</h3>
                                <Badge className={`${job.typeColor} text-xs`}>{job.type}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{job.company}</p>
                            </div>
                          </div>
                        </td>
    
                        {/* Location & Salary Column */}
                        <td className="p-3 md:p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{job.salary}</div>
                          </div>
                        </td>
    
                        {/* Time Remaining Column */}
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 flex-shrink-0 text-gray-500" />
                            <span className="text-sm text-gray-600">{job.timeRemaining}</span>
                          </div>
                        </td>
    
                        {/* Actions Column */}
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-2">
                            <Bookmark
                              className={`h-5 w-5 flex-shrink-0 cursor-pointer ${
                                job.isBookmarked ? "fill-gray-900 text-gray-900" : "text-gray-400"
                              }`}
                            />
                             <Link href={`/find-job/${job.id}`}>
                        <button className="bg-[#F1F2F4] cursor-pointer hover:bg-[#0A65CC] duration-300 font-medium text-[#0A65CC] hover:text-white px-4 py-2 rounded">
                          View Details
                        </button>
                      </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
