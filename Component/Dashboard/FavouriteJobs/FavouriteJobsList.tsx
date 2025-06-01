'use client'

import { AuthContext } from "@/Authentication/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetCandidateFavoriteJobListQuery } from "@/RTKQuery/CandidateJobApplyApiSlice";
import { Bookmark, ChevronRight, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

// Define the interface for a single job entry
interface FavoriteJob {
  jobId: string;
  companyId: string;
  email: string;
  logo: string;
  jobTitle: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  postedDate: string;
  jobStatus: string;
}

// Define the FavoriteJobsList component
const FavoriteJobsList: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const {
    data: userEmail,
    error: userEmailError,
    isLoading: isUserLoading,
  } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });

  const email = userEmail?.user?.email || '';

  const {
    data: favoriteJobsData,
    error: favoriteJobsError,
    isLoading: isFavoriteLoading,
  } = useGetCandidateFavoriteJobListQuery(email, {
    skip: !email,
  });

  // Loading state
  if (isUserLoading || isFavoriteLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading applied jobs...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (userEmailError || favoriteJobsError) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Failed to load favorite jobs. Please try again later.
      </div>
    );
  }

  const jobs = favoriteJobsData?.data as FavoriteJob[];

  // Empty state
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        You haven’t bookmarked any jobs yet.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-0 md:p-6 lg:p-0">
      {/* Header */}
      <div className="mb-6">
       <h2 className="text-lg font-semibold mb-4">
        Favorite Jobs ({jobs.length})
      </h2>
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
                {jobs.map((job) => (
                  <tr
                    key={job.jobId}
                    className={`border-b last:border-b-0 `}
                  >
                    {/* Job Details Column */}
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <img src={job.logo} alt={'companyLogo'} className="w-10 h-10"/>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{job.jobTitle}</h3>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">{job.jobType}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Hello</p>
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
                        <div className="text-sm font-medium text-gray-900">${job.minSalary}-{job.maxSalary}</div>
                      </div>
                    </td>

                    {/* Time Remaining Column */}
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className={`text-sm ${job.jobStatus === "expired" ? "text-red-500" : "text-gray-600"}`}>
                          {job.postedDate}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="p-3 md:p-4">
                      <Link href={`/find-job/${job.jobId}`}>
                <button
                  className={`px-4 py-2 rounded flex items-center space-x-2 ${
                    job.jobStatus === 'Job Expired'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0A65CC] cursor-pointer text-white hover:bg-blue-700'
                  }`}
                  disabled={job.jobStatus === 'Job Expired'}
                >
                  <span className="text-sm xl:text-base">Apply Now</span>
                  <span>→</span>
                </button>
              </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoriteJobsList;
