'use client'
import { AuthContext } from "@/Authentication/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetProfileCompleteMessageQuery } from "@/RTKQuery/CandidateInfo";
import { useGetCandidateJObApplyDataQuery } from "@/RTKQuery/CandidateJobApplyApiSlice";
import { Calendar, Check, CheckCircle, ChevronRight, DollarSign, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

// Define the interface for a single job entry
interface Job {
  id: number;
  companyLogo: string;
  jobTitle: string;
  jobType: string;
  location: string;
  salary: string;
  dateApplied: string;
  status: string;
}

// Define the job data array with the Job interface


// Define the JobTable component as a functional component with TypeScript
const JobTable: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const {data:candidateJObApplyData} = useGetCandidateJObApplyDataQuery(userId)
  const jobData = candidateJObApplyData?.data
  const {data:profileMessage} = useGetProfileCompleteMessageQuery(userId);
  const messageProfile = profileMessage?.data?.message || '';
  console.log(jobData)
  return (
   <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-1 ">
      {/* Header */}
     <h1 className="text-xl sm:text-2xl font-bold py-2">Hello, Esther Howard</h1>
      <p className="pb-5 text-sm sm:text-base text-gray-600">
        Here is your daily activities and job alerts
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-[#E7F0FA] shadow-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-medium">{jobData?.length || 0}</h2>
            <p className="text-sm text-gray-600">Applied Jobs</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <g clipPath="url(#clip0_1647_30666)">
                <path
                  opacity="0.2"
                  d="M16 19.0004C11.7872 19.007 7.64764 17.8995 4.00098 15.7902V26.0004C4.00098 26.1317 4.02684 26.2618 4.0771 26.3831C4.12735 26.5044 4.20101 26.6147 4.29387 26.7075C4.38673 26.8004 4.49697 26.8741 4.61829 26.9243C4.73962 26.9746 4.86965 27.0004 5.00098 27.0004H27.001C27.1323 27.0004 27.2623 26.9746 27.3837 26.9243C27.505 26.8741 27.6152 26.8004 27.7081 26.7075C27.8009 26.6147 27.8746 26.5044 27.9249 26.3831C27.9751 26.2618 28.001 26.1317 28.001 26.0004V15.7891C24.3539 17.8991 20.2135 19.0071 16 19.0004Z"
                  fill="#0A65CC"
                />
                <path
                  d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                  stroke="#0A65CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                  stroke="#0A65CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M28.001 15.7891C24.3538 17.8991 20.2135 19.007 16 19.0004C11.7872 19.007 7.64749 17.8995 4.00079 15.7901"
                  stroke="#0A65CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 15H17.5"
                  stroke="#0A65CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1647_30666">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-[#FFF6E6] shadow-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-medium">{jobData?.length || 0}</h2>
            <p className="text-sm text-gray-600">Favorite Jobs</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                d="M24 28L15.9991 23L8 28V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H23C23.2652 5 23.5196 5.10536 23.7071 5.29289C23.8946 5.48043 24 5.73478 24 6V28Z"
                fill="#FFF6E6"
                stroke="#FFA500"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-[#E7F6EA] shadow-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-medium">589</h2>
            <p className="text-sm text-gray-600">Job Alerts</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                d="M7.02535 14.0002C7.02205 12.8195 7.25176 11.6497 7.70133 10.5579C8.15089 9.46608 8.81147 8.47371 9.64522 7.63763C10.479 6.80155 11.4695 6.1382 12.56 5.68559C13.6506 5.23298 14.8197 5 16.0005 5C17.1812 5 18.3503 5.23298 19.4409 5.68559C20.5314 6.1382 21.522 6.80155 22.3557 7.63763C23.1895 8.47371 23.85 9.46608 24.2996 10.5579C24.7492 11.6497 24.9789 12.8195 24.9756 14.0002V14.0002C24.9756 18.4772 25.9122 21.0751 26.7372 22.495C26.8261 22.6467 26.8734 22.8192 26.8743 22.995C26.8752 23.1708 26.8298 23.3438 26.7426 23.4965C26.6553 23.6491 26.5294 23.7761 26.3774 23.8645C26.2254 23.953 26.0528 23.9998 25.877 24.0002H6.12292C5.94707 23.9998 5.77445 23.9529 5.62248 23.8645C5.4705 23.776 5.34454 23.649 5.25731 23.4963C5.17008 23.3437 5.12465 23.1707 5.12563 22.9948C5.1266 22.819 5.17393 22.6465 5.26284 22.4948C6.08825 21.0748 7.02534 18.4769 7.02534 14.0002H7.02535Z"
                fill="#E7F6EA"
                stroke="#0BA02C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 24V25C12 26.0609 12.4214 27.0783 13.1716 27.8284C13.9217 28.5786 14.9391 29 16 29C17.0609 29 18.0783 28.5786 18.8284 27.8284C19.5786 27.0783 20 26.0609 20 25V24"
                stroke="#0BA02C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.9291 2.99902C24.9639 4.2836 26.6042 6.10545 27.6689 8.26347"
                stroke="#0BA02C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.33118 8.26348C5.39587 6.10545 7.03617 4.2836 9.07099 2.99902"
                stroke="#0BA02C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

     {/* Profile Completion Banner */}
      {messageProfile === 'User not found or no data available.' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 my-6 rounded-md bg-[#E05151] shadow-sm">
          <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <Image
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1744468423~exp=1744472023~hmac=f6080d476eff1e42b77bdc424c4eda6e63a501be446fc3990a456b7ee48035b6&w=996"
              alt="Profile image"
              width={48}
              height={48}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-base sm:text-lg font-medium">
                Your profile is not complete
              </h2>
              <p className="text-white text-xs sm:text-sm">
                Complete your profile & build your custom resume
              </p>
            </div>
          </div>
          <Link href="/profile/edit">
            <button className="relative h-10 sm:h-12 w-full sm:w-40 overflow-hidden border border-red-500 bg-white px-3 sm:px-4 text-red-500 text-sm sm:text-base font-medium shadow-md transition-all duration-300 hover:text-white hover:bg-red-500 hover:shadow-lg">
              <span className="relative flex items-center justify-center gap-2">
                Edit Profile <MoveRight size={16} />
              </span>
            </button>
          </Link>
        </div>
      )}

      {/* Recently Applied Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
         <h2 className="text-base sm:text-lg font-semibold">Recently Applied</h2>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 self-start sm:self-center">
            View all
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Responsive Table */}
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
                              <Badge className={`bg-[#E7F0FA] text-xs text-[#0A65CC] self-start lg:self-center`}>{job?.jobType}</Badge>
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
                            {job.status === 'open' ? 'Active' : "Closed"}
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
    </div>
  );
};

export default JobTable;