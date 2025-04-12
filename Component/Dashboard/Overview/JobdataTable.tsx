import { Check, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
const jobData: Job[] = [
  {
    id: 1,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Networking Engineer",
    jobType: "Remote",
    location: "Washington",
    salary: "$50K-80K/month",
    dateApplied: "Feb 2, 2019 19:28",
    status: "Active",
  },
  {
    id: 2,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Product Designer",
    jobType: "Full Time",
    location: "Dhaka",
    salary: "$50K-80K/month",
    dateApplied: "Dec 7, 2019 19:26",
    status: "Active",
  },
  {
    id: 3,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Junior Graphic Designer",
    jobType: "Temporary",
    location: "Brazil",
    salary: "$50K-80K/month",
    dateApplied: "Feb 2, 2019 19:28",
    status: "Active",
  },
  {
    id: 4,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Visual Designer",
    jobType: "Contract Base",
    location: "Wisconsin",
    salary: "$50K-80K/month",
    dateApplied: "Dec 7, 2019 19:26",
    status: "Active",
  },
];

// Define the JobTable component as a functional component with TypeScript
const JobTable: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recently Applied</h2>
        <Link href={'/candidate-dashboard/applied-jobs'}>
        <button  className="text-blue-600 hover:underline flex items-center justify-between gap-3">
          View all <MoveRight size={16} />
        </button>
        </Link>
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
            {jobData.map((job: Job) => (
              <tr
                key={job.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Job Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={job.companyLogo}
                      alt={`${job.jobTitle} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <div className="flex gap-3">
                      <p className="font-semibold">{job.jobTitle}</p>
                      <p className="text-sm bg-[#E7F0FA] rounded-full px-2 text-[#0A65CC] ">{job.jobType}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {job.location} • {job.salary}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Date Applied Column */}
                <td className="p-4 text-sm text-gray-600">{job.dateApplied}</td>
                {/* Status Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500"><Check size={16} /></span>
                    <span className="text-sm text-green-500">{job.status}</span>
                  </div>
                </td>
                {/* Action Column */}
                <td className="p-4">
                  <button className="bg-[#F1F2F4] cursor-pointer hover:bg-[#0A65CC] duration-300 font-medium text-[#0A65CC] hover:text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;