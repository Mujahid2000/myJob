'use client';

import { AuthContext } from '@/Authentication/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetJobPostDataQuery } from '@/RTKQuery/JobApplyApiSlice';
import { Check, CircleX, Eye, MoveRight, PlusCircle, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';

// Define the Job interface
interface Job {
  _id: string;
  title: string;
  logo: string;
  jobType: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  status: string;
  applicationCount: number;
}

// Define the JobApplicationReceiveList component
const JobApplicationReceiveList: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });
  const userId = userEmail?.user?._id || '';
  console.log(userId)
  const { data: jobsData, isLoading: jobsLoading } = useGetJobPostDataQuery(userId);
const jobDatas = jobsData?.jobs || []
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Hello, Instagram</h1>
        <p className="text-gray-600 text-sm sm:text-base">Here is your daily activities and applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-[#E7F0FA] shadow-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-medium">{jobsData?.jobs?.length || 0}</h2>
            <p className="text-sm text-gray-600">Total Jobs</p>
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
            <h2 className="text-lg sm:text-xl font-medium">{jobsData?.jobs?.length || 0}</h2>
            <p className="text-sm text-gray-600">Active Jobs</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            <ShieldCheck stroke="#0A65CC" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
      </div>

      {/* Recently Posted Jobs Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center my-5">
          <h2 className="text-base sm:text-lg font-semibold">Recently Posted</h2>
          <Link href="/company-dashboard/my-jobs">
            <button className="text-blue-600 hover:underline flex items-center gap-2 text-sm sm:text-base">
              View all <MoveRight size={16} />
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {jobsLoading && (
          <div className="text-center p-4 text-sm sm:text-base text-gray-600 bg-white rounded-lg shadow-md">
            Loading jobs...
          </div>
        )}

        {/* Empty State */}
        {!jobsLoading && (!jobsData?.jobs || jobsData.jobs.length === 0) && (
          <div className="text-center p-4 text-sm sm:text-base text-gray-600 bg-white rounded-lg shadow-md">
            No jobs posted yet.
          </div>
        )}

        {/* Table */}
        {!jobsLoading && jobDatas?.length > 0 && (
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full text-left min-w-[600px]" role="grid">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm font-semibold uppercase">
                      <th className="p-2 sm:p-3 min-w-[200px] sm:min-w-[250px]">Job</th>
                      <th className="p-2 sm:p-3 min-w-[100px]">Status</th>
                      <th className="p-2 sm:p-3 min-w-[120px]">Applications</th>
                      <th className="p-2 sm:p-3 min-w-[180px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobDatas.map((job: Job) => (
                      <tr
                        key={job._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                        role="row"
                      >
                        <td className="p-2 sm:p-3">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <Image
                              src={job.logo || '/default-logo.png'}
                              alt={`${job.title} logo`}
                              width={32}
                              height={32}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                            />
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <p className="font-semibold text-xs sm:text-sm truncate max-w-[150px] sm:max-w-[200px]">
                                  {job.title}
                                </p>
                                <p className="text-xs bg-[#E7F0FA] rounded-full px-2 py-1 text-[#0A65CC]">
                                  {job.jobType}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-[200px]">
                                {job.location} • ${job.minSalary}k-${job.maxSalary}k
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-green-500">
                              <Check size={12} className="sm:h-4 sm:w-4" />
                            </span>
                            <Badge className="text-xs bg-[#E7F0FA] sm:text-sm text-[#0A65CC]">
                              {job.status === 'open' ? 'Active' : job.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="flex items-center space-x-1">
                            <Users size={12} className="sm:h-4 sm:w-4" />
                            <p className="text-xs sm:text-sm">{job.applicationCount} Applications</p>
                          </div>
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Link href={`/company-dashboard/my-jobs/${job._id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm"
                                aria-label={`View details for ${job.title}`}
                              >
                                View Details
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  aria-label="More actions"
                                  className="p-1 sm:p-2"
                                >
                                  <BsThreeDots className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40 sm:w-48">
                                <DropdownMenuItem asChild>
                                  <button className="flex items-center gap-2 w-full text-left text-xs sm:text-sm">
                                    <PlusCircle size={14} className="sm:h-4 sm:w-4" />
                                    Promote Job
                                  </button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/company-dashboard/my-jobs/${job._id}`}
                                    className="flex items-center gap-2 w-full text-xs sm:text-sm"
                                  >
                                    <Eye size={14} className="sm:h-4 sm:w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <button className="flex items-center gap-2 w-full text-left text-xs sm:text-sm">
                                    <CircleX size={14} className="sm:h-4 sm:w-4" />
                                    Mark as Expired
                                  </button>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobApplicationReceiveList;