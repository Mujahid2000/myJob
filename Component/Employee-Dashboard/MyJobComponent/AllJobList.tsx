'use client';

import { AuthContext } from '@/Authentication/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetJobPostDataQuery } from '@/RTKQuery/JobApplyApiSlice';
import { Check, CircleX, Eye, MoveRight, PlusCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

// Define the interface for a single job entry
interface Job {
  _id: string;
  userId: string;
  title: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  location: string;
  logo: string;
  applicationCount: number;
  status: string;
}

// Define the JobTable component as a functional component with TypeScript
const AllJobList: React.FC = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  // Handle user data fetching
  const { data: userEmail, error: userEmailError, isLoading: userLoading } = useGetUserByIdQuery(
    currentUser?.email || '',
    { skip: !currentUser?.email }
  );
  const userId = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';

  // Handle job data fetching
  const { data: jobsData, error: jobsError, isLoading: jobsLoading } = useGetJobPostDataQuery(userId);

  // Handle 3-dot menu toggle
  const handle3Dot = (id: string) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };

  // Render loading state
  if (userLoading || jobsLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  // Render error state
  if (userEmailError || jobsError) {
    return (
      <div className="text-center text-red-500">
        Error loading data: { 'Unknown error'}
      </div>
    );
  }

  // Check if jobsData is valid
  if (!jobsData || !Array.isArray(jobsData.jobs)) {
    return <div className="text-center text-gray-600">No jobs available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Jobs ({jobsData.jobs.length})</h2>
        <div className="flex items-center gap-5">
          <p>Job status</p>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="new">New to Old</SelectItem>
                <SelectItem value="old">Old to New</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
    
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
        {!jobsLoading && jobsData.jobs?.length > 0 && (
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
                    {jobsData.jobs.map((job: Job) => (
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

export default AllJobList;