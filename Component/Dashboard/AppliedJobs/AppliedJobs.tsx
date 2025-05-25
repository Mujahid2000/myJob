'use client'
import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetCandidateJObApplyDataQuery } from "@/RTKQuery/CandidateJobApplyApiSlice";
import { Check, DollarSign, MoveRight } from "lucide-react";
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
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-gray-600 font-semibold text-sm">
              <th className="p-4">Job</th>
              <th className="p-4">Date Applied</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {jobData.map((job) => (
              <tr
                key={job._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Job Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={job.logo || '/default-logo.png'} // Fallback logo
                      alt={`${job.jobTitle} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <div className="flex gap-3">
                        <p className="font-semibold">{job.jobTitle}</p>
                        <p className="text-sm bg-[#E7F0FA] rounded-full px-2 text-[#0A65CC]">
                          {job.jobType}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 flex gap-1">
                        {job.location}{' '}
                        <span className="flex items-center">
                          <DollarSign size={16} /> {job.minSalary}k-{job.maxSalary}k/month
                        </span>
                      </p>
                    </div>
                  </div>
                </td>
                {/* Date Applied Column */}
                <td className="p-4 text-sm text-gray-600">
                  {formatDate(job.date)}
                </td>
                {/* Status Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">
                      <Check size={16} />
                    </span>
                    <span className="text-sm text-green-500">
                      {job.status === 'open' ? 'Active' : job.status}
                    </span>
                  </div>
                </td>
                {/* Action Column */}
                <td className="p-4">
                  <Link href={`/find-job/${job.jobId}`}>
                    <button className="bg-[#F1F2F4] cursor-pointer hover:bg-[#0A65CC] duration-300 font-medium text-[#0A65CC] hover:text-white px-4 py-2 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;