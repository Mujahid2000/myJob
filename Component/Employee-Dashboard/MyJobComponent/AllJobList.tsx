'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CircleX, Eye, MoveRight, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

// Define the interface for a single job entry
interface Job {
  id: number;
  companyLogo: string;
  jobTitle: string;
  jobType: string;
  location: string;
  salary: string;
  applicationCount: number;
  status: string;
}

// Define the job data array with the Job interface
const jobData: Job[] = [
    {
        id: 1,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Networking Engineer",
        jobType: "Remote",
        location: "Washington",
        salary: "$50K-80K/month",
        applicationCount: 729,
        status: "Active",
    },
    {
        id: 2,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Product Designer",
        jobType: "Full Time",
        location: "Dhaka",
        salary: "$50K-80K/month",
        applicationCount: 729,
        status: "Active",
    },
    {
        id: 3,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", 
        jobTitle: "Junior Graphic Designer",
        jobType: "Temporary",
        location: "Brazil",
        salary: "$50K-80K/month",
        applicationCount: 729,
        status: "Active",
    },
    {
        id: 4,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", 
        jobTitle: "Visual Designer",
        jobType: "Contract Base",
        location: "Wisconsin",
        salary: "$50K-80K/month",
        applicationCount: 729,
        status: "Active",
    },
    {
        id: 5,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Software Engineer",
        jobType: "Full Time",
        location: "California",
        salary: "$90K-120K/year",
        applicationCount: 500,
        status: "Active",
    },
    {
        id: 6,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Data Scientist",
        jobType: "Remote",
        location: "New York",
        salary: "$100K-150K/year",
        applicationCount: 300,
        status: "Active",
    },
    {
        id: 7,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Marketing Specialist",
        jobType: "Part Time",
        location: "London",
        salary: "$40K-60K/year",
        applicationCount: 200,
        status: "Active",
    },
    {
        id: 8,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "HR Manager",
        jobType: "Full Time",
        location: "Berlin",
        salary: "$70K-90K/year",
        applicationCount: 150,
        status: "Active",
    },
    {
        id: 9,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Frontend Developer",
        jobType: "Remote",
        location: "Toronto",
        salary: "$80K-100K/year",
        applicationCount: 400,
        status: "Active",
    },
    {
        id: 10,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Backend Developer",
        jobType: "Full Time",
        location: "Sydney",
        salary: "$85K-110K/year",
        applicationCount: 350,
        status: "Active",
    },
    {
        id: 11,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "DevOps Engineer",
        jobType: "Contract Base",
        location: "Singapore",
        salary: "$95K-130K/year",
        applicationCount: 250,
        status: "Active",
    },
    {
        id: 12,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "UI/UX Designer",
        jobType: "Temporary",
        location: "Paris",
        salary: "$60K-80K/year",
        applicationCount: 180,
        status: "Active",
    },
    {
        id: 13,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Project Manager",
        jobType: "Full Time",
        location: "Tokyo",
        salary: "$100K-140K/year",
        applicationCount: 220,
        status: "Active",
    },
    {
        id: 14,
        companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
        jobTitle: "Content Writer",
        jobType: "Part Time",
        location: "Mumbai",
        salary: "$30K-50K/year",
        applicationCount: 100,
        status: "Active",
    },
];

// Define the JobTable component as a functional component with TypeScript
const AllJobList: React.FC = () => {
    const [openModalId, setOpenModalId] = useState<number | null>(null);

console.log(openModalId)
    const handle3Dot = (id: number) =>{
        setOpenModalId(prevId => prevId === id ? null : id);
    }

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Jobs (589)</h2>
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
            <tr className="bg-gray-100 text-gray-600  text-sm">
              <th className="p-4 uppercase">Job</th>
              <th className="p-4 uppercase">Status</th>
              <th className="p-4 uppercase">Applications</th>
              <th className="p-4 uppercase">Action</th>
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
                <td className="p-3">
                <div className="flex items-center space-x-2">
                    <span className="text-green-500"><Check size={16} /></span>
                    <span className="text-sm text-green-500">{job.status}</span>
                  </div>
                </td>
                {/* Status Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users/>
                    <p>{job.applicationCount} Applications</p>
                  </div>
                </td>
                {/* Action Column */}
                <td className="p-4 flex gap-5">
                  <Link href={'/company-dashboard/my-jobs/details'}>
                  <button className="bg-[#F1F2F4] cursor-pointer hover:bg-[#0A65CC] duration-300 font-medium text-[#0A65CC] cursor-pointer hover:text-white px-4 py-2 rounded">
                    View Details
                  </button>
                  </Link>
                  <button onClick={()=>handle3Dot(job.id)} className="cursor-pointer "> <BsThreeDots/> </button>
                  {openModalId === job.id && (
                    <div className="absolute  mt-16 w-48 bg-white shadow-lg rounded-lg z-10">
                      <button className="flex gap-2 hover:bg-[#E7F0FA] hover:text-[#0A65CC] px-3 py-2 cursor-pointer w-full text-left">
                        <PlusCircle size={16} />
                        Promote Job
                      </button>
                      <Link href={'/company-dashboard/my-jobs/details'}>
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

