'use client';

import { AuthContext } from '@/Authentication/AuthContext';
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
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-4 uppercase">Job</th>
              <th className="p-4 uppercase">Status</th>
              <th className="p-4 uppercase">Applications</th>
              <th className="p-4 uppercase">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {jobsData.jobs.map((job: Job) => (
              <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50">
                {/* Job Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={job.logo || 'https://via.placeholder.com/40'}
                      alt={`${job.title} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                      }}
                    />
                    <div>
                      <div className="flex gap-3">
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm bg-[#E7F0FA] rounded-full px-2 text-[#0A65CC]">{job.jobType}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {job.location} • {job.minSalary} - {job.maxSalary}/{job.salaryType}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Status Column */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">
                      <Check size={16} />
                    </span>
                    <span className="text-sm text-green-500">{job.status === 'open' ? 'Active' : 'Expired'}</span>
                  </div>
                </td>
                {/* Applications Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users />
                    <p>{job.applicationCount} Applications</p>
                  </div>
                </td>
                {/* Action Column */}
                <td className="p-4 flex gap-5 relative">
                  <Link href={`/company-dashboard/my-jobs/${job._id}`}>
                    <button className="bg-[#F1F2F4] hover:bg-[#0A65CC] hover:text-white duration-300 font-medium text-[#0A65CC] px-4 py-2 rounded">
                      View Details
                    </button>
                  </Link>
                  <button onClick={() => handle3Dot(job._id)} className="cursor-pointer">
                    <BsThreeDots />
                  </button>
                  {openModalId === job._id && (
                    <div
                      className="absolute mt-10 w-48 bg-white shadow-lg rounded-lg z-10 right-0"
                      style={{ top: '100%' }}
                    >
                      <button className="flex gap-2 hover:bg-[#E7F0FA] hover:text-[#0A65CC] px-3 py-2 cursor-pointer w-full text-left">
                        <PlusCircle size={16} />
                        Promote Job
                      </button>
                      <Link href={`/company-dashboard/my-jobs/${job._id}`}>
                        <button className="flex gap-2 hover:bg-[#E7F0FA] hover:text-[#0A65CC] px-3 py-2 cursor-pointer w-full text-left">
                          <Eye size={16} />
                          View Details
                        </button>
                      </Link>
                      <button className="flex gap-2 hover:bg-[#E7F0FA] hover:text-[#0A65CC] px-3 py-2 cursor-pointer w-full text-left">
                        <CircleX size={16} />
                        Mark as Expired
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobList;