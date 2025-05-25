'use client'

import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetCandidateFavoriteJobListQuery } from "@/RTKQuery/CandidateJobApplyApiSlice";
import { Bookmark, DollarSign } from "lucide-react";
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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">
        Favorite Jobs ({jobs.length})
      </h2>
      <div className="grid grid-cols-1 gap-2 rounded-lg overflow-hidden">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="flex bg-white items-center justify-between p-5 border-b border-gray-200 hover:bg-gray-50"
          >
            {/* Job Details */}
            <div className="flex items-center space-x-4">
              <Image
                src={job.logo}
                alt={`${job.jobTitle} logo`}
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{job.jobTitle}</p>
                  <p className="text-sm text-gray-500 bg-[#E8F1FF] px-2 rounded-full">
                    {job.jobType}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500 flex gap-1">
                    {job.location}
                    <span className="flex items-center">
                      <DollarSign size={16} /> {job.minSalary}k-{job.maxSalary}k/month
                    </span>
                  </p>
                  <span
                    className={`text-sm ${
                      job.jobStatus === 'Job Expired'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {job.jobStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center space-x-4">
              <button className="hover:bg-gray-300 cursor-pointer p-1 rounded-sm">
                <Bookmark size={20} />
              </button>
              <Link href={`/find-job/${job.jobId}`}>
                <button
                  className={`px-4 py-2 rounded flex items-center space-x-2 ${
                    job.jobStatus === 'Job Expired'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0A65CC] cursor-pointer text-white hover:bg-blue-700'
                  }`}
                  disabled={job.jobStatus === 'Job Expired'}
                >
                  <span>Apply Now</span>
                  <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteJobsList;
