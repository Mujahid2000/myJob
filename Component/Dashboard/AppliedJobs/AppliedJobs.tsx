'use client'
import { AuthContext } from "@/Authentication/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetCandidateJObApplyDataQuery } from "@/RTKQuery/CandidateJobApplyApiSlice";
import { Calendar, Check, CheckCircle, DollarSign, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const AppliedJobs: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError, isLoading: isUserLoading } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const { data: candidateJObApplyData, error: jobApplyError, isLoading: isJobLoading } = useGetCandidateJObApplyDataQuery(userId);
  const jobData = candidateJObApplyData?.data;

  // Format date for display (assuming date is in YYYY-MM-DD format)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString; // Fallback to raw string if parsing fails
    }
  };

  // Loading state
  if (isUserLoading || isJobLoading) {
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
  if (userEmailError || jobApplyError) {
    return (
      <div className="max-w-4xl mx-auto py-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <strong>Error:</strong> Failed to load applied jobs. Please try again later.
        </div>
      </div>
    );
  }

  // Empty state
  if (!Array.isArray(jobData) || jobData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-6 text-center">
        <div className="bg-gray-100 border border-gray-300 text-gray-600 px-4 py-3 rounded-md">
          <p>No jobs applied yet.</p>
          <Link href="/find-job" className="text-blue-600 hover:underline flex justify-center items-center gap-2 mt-2">
            Browse Jobs <MoveRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Applied Jobs ({jobData.length})</h2>
        
      </div>
       <Card className="py-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">Job</th>
                    <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">
                      Date Applied
                    </th>
                    <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">Status</th>
                    <th className="text-left p-3 md:p-4 font-medium text-gray-600 text-sm md:text-base">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobData && jobData.map((job) => (
                    <tr key={job._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <img src={job.logo} alt="" className="w-10 h-10"/>
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
                              <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{job.jobTitle}</h3>
                              <Badge className={`bg-[#E7F0FA] text-[#0A65CC] text-xs self-start lg:self-center`}>{job?.jobType}</Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs md:text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{job.minSalary}-{job.maxSalary}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">{job.date}</span>
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-green-600 font-medium whitespace-nowrap">
                            {job.status=== 'open' ? 'Active' : 'Closed'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                       <Link href={`/find-job/${job.jobId}`}>
                      <button
                        className="mt-3 cursor-pointer w-full bg-[#F1F2F4] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white px-3 py-2 rounded text-xs font-medium transition-all duration-300 hover:shadow-md"
                        aria-label={`View details for ${job.jobTitle}`}
                      >
                        View Details
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

export default AppliedJobs;