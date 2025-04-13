import { Bookmark } from "lucide-react";
import Image from "next/image";

// Define the interface for a single job alert entry
interface JobAlert {
  id: number;
  companyLogo: string;
  jobTitle: string;
  jobType: string;
  location: string;
  salary: string;
  deadline: string;
}

// Define the job alert data array with the JobAlert interface
const jobAlertsData: JobAlert[] = [
  {
    id: 1,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Technical Support Specialist",
    jobType: "Full Time",
    location: "Idaho, USA",
    salary: "$15K-20K",
    deadline: "4 Days Remaining",
  },
  {
    id: 2,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "UI/UX Designer",
    jobType: "Full Time",
    location: "Minnesota, USA",
    salary: "$10K-15K",
    deadline: "4 Days Remaining",
  },
  {
    id: 3,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Front End Developer",
    jobType: "Internship",
    location: "Mymensingh, Bangladesh",
    salary: "$10K-15K",
    deadline: "4 Days Remaining",
  },
  {
    id: 4,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Marketing Officer",
    jobType: "Full Time",
    location: "Montana, USA",
    salary: "$50K-80K",
    deadline: "4 Days Remaining",
  },
  {
    id: 5,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Networking Engineer",
    jobType: "Full Time",
    location: "Michigan, USA",
    salary: "$5K-10K",
    deadline: "4 Days Remaining",
  },
  {
    id: 6,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Senior UX Designer",
    jobType: "Full Time",
    location: "United Kingdom of Great Britain",
    salary: "$30K-35K",
    deadline: "4 Days Remaining",
  },
  {
    id: 7,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Junior Graphic Designer",
    jobType: "Full Time",
    location: "Mymensingh, Bangladesh",
    salary: "$40K-50K",
    deadline: "4 Days Remaining",
  },
  {
    id: 8,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Product Designer",
    jobType: "Full Time",
    location: "Sivas, Turkey",
    salary: "$50K-70K",
    deadline: "4 Days Remaining",
  },
  {
    id: 9,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Project Manager",
    jobType: "Full Time",
    location: "Ohio, USA",
    salary: "$50K-80K",
    deadline: "4 Days Remaining",
  },
  {
    id: 10,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Marketing Manager",
    jobType: "Temporary",
    location: "Konya, Turkey",
    salary: "$20K-25K",
    deadline: "4 Days Remaining",
  },
  {
    id: 11,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Visual Designer",
    jobType: "Part Time",
    location: "Washington, USA",
    salary: "$10K-15K",
    deadline: "4 Days Remaining",
  },
  {
    id: 12,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Interaction Designer",
    jobType: "Remote",
    location: "Penn, USA",
    salary: "$35K-40K",
    deadline: "4 Days Remaining",
  },
  {
    id: 13,
    companyLogo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png", // Replace with actual path to logo
    jobTitle: "Senior UX Designer",
    jobType: "Contract Base",
    location: "Sylhet, Bangladesh",
    salary: "$30K-35K",
    deadline: "4 Days Remaining",
  },
];

// Define the JobAlertList component
const JobAlertList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Job Alerts ({jobAlertsData.length} new jobs)
        </h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          <span className="mr-1">✎</span> Edit Job Alerts
        </a>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {jobAlertsData.map((job) => (
           <div
           key={job.id}
           className="flex bg-white items-center justify-between p-5 border-b border-gray-200 hover:bg-gray-50"
         >
           {/* Job Details */}
           <div className="flex items-center space-x-4">
             <Image
               src={job.companyLogo}
               alt={`${job.jobTitle} logo`}
               width={40}
               height={40}
               className="rounded"
             />
             <div className="">
               <div className="flex items-center gap-3">
               <p className="font-semibold">{job.jobTitle}</p>
               <p className="text-sm text-gray-500 bg-[#E8F1FF] px-2 rounded-full">{job.jobType}</p>
               </div>
               <div className="flex items-center gap-4 ">

               <p className="text-sm text-gray-500">
                 {job.location} • {job.salary}
               </p>
               <span
               className={`text-sm text-gray-500`}
             >
               {job.deadline}
             </span>
               </div>
             </div>
           </div>
           {/* Deadline and Action */}
           <div className="flex items-center space-x-4">
             <button className="hover:bg-gray-300 cursor-pointer p-1 rounded-sm"><Bookmark size={20}/></button>
             <button
               className={`px-4 py-2 rounded  flex items-center space-x-2  bg-[#0A65CC] cursor-pointer text-white hover:bg-blue-700
               `}
               
             >
               <span>Apply Now</span>
               <span>→</span>
             </button>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default JobAlertList;