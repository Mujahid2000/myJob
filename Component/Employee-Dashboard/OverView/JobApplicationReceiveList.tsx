'use client'
import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useGetJobPostDataQuery } from "@/RTKQuery/JobApplyApiSlice";
import { Check, CircleX, Eye, MoveRight, PlusCircle, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";



// Define the JobTable component as a functional component with TypeScript
const JobApplicationReceiveList: React.FC = () => {
    const [openModalId, setOpenModalId] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
        const currentUser = authContext?.currentUser;
        const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
        const userId = userEmail?.user?._id || '';
        const email = userEmail?.user?.email || '';
        const {data:jobsData, isLoading:jobsLoading} = useGetJobPostDataQuery(userId)

    const handle3Dot = (id: string) =>{
        setOpenModalId(prevId => prevId === id ? null : id);
    }

  return (
    <div>
<div className="flex flex-col md:flex-row justify-start gap-5">
          <div className="flex w-66 justify-between gap-7 border items-center p-4 rounded-sm bg-[#E7F0FA]">
            <div>
              <h1 className="text-2xl font-medium">{jobsData?.jobs.length}</h1>
              <p>Total jobs</p>
            </div>
            <div className="bg-white p-4 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clipPath="url(#clip0_1647_30666)">
    <path opacity="0.2" d="M16 19.0004C11.7872 19.007 7.64764 17.8995 4.00098 15.7902V26.0004C4.00098 26.1317 4.02684 26.2618 4.0771 26.3831C4.12735 26.5044 4.20101 26.6147 4.29387 26.7075C4.38673 26.8004 4.49697 26.8741 4.61829 26.9243C4.73962 26.9746 4.86965 27.0004 5.00098 27.0004H27.001C27.1323 27.0004 27.2623 26.9746 27.3837 26.9243C27.505 26.8741 27.6152 26.8004 27.7081 26.7075C27.8009 26.6147 27.8746 26.5044 27.9249 26.3831C27.9751 26.2618 28.001 26.1317 28.001 26.0004V15.7891C24.3539 17.8991 20.2135 19.0071 16 19.0004Z" fill="#0A65CC"/>
    <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.001 15.7891C24.3538 17.8991 20.2135 19.007 16 19.0004C11.7872 19.007 7.64749 17.8995 4.00079 15.7901" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 15H17.5" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_30666">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
          </svg>
            </div>
          </div>
          <div className="flex w-66 justify-between gap-7  items-center p-4 rounded-sm bg-[#FFF6E6]">
            <div>
              <h1 className="text-2xl font-medium">{jobsData?.jobs.length}</h1>
              <p>Active jobs</p>
            </div>
            <div className="bg-white p-4 rounded-md">
            <ShieldCheck  stroke='#0A65CC' path='bg-blue-600'/>
            </div>
          </div>
          
         
          
        </div>
    <div className="max-w-4xl mx-auto ">
      <div className="flex justify-between items-center my-5">
        <h2 className="text-lg font-semibold">Recently Applied</h2>
        <Link href={'/company-dashboard/my-jobs'}>
        <button  className="text-blue-600 cursor-pointer hover:underline flex items-center justify-between gap-3">
          View all <MoveRight size={16} />
        </button>
        </Link>
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
            {Array.isArray(jobsData?.jobs) && jobsData.jobs.map((job, index) => (
              <tr
                key={job._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Job Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={job.logo}
                      alt={`${job.title} logo`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <div className="flex gap-3">
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-sm bg-[#E7F0FA] rounded-full px-2 text-[#0A65CC] ">{job.jobType}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {job.location} • {job.minSalary}-{job.maxSalary}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Date Applied Column */}
                <td className="p-3">
                <div className="flex items-center space-x-2">
                    <span className="text-green-500"><Check size={16} /></span>
                    <span className="text-sm text-green-500">{job.status === 'open' ? 'Active' : ''}</span>
                  </div>
                </td>
                {/* Status Column */}
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Users size={16}/>
                    <p>{job.applicationCount} Applications</p>
                  </div>
                </td>
                {/* Action Column */}
                <td className="p-4 flex gap-5">
                  <Link href={`/company-dashboard/my-jobs/${job._id}`}>
                  <button className="bg-[#F1F2F4] cursor-pointer hover:bg-[#0A65CC] duration-300 font-medium text-[#0A65CC] cursor-pointer hover:text-white px-4 py-2 rounded">
                    View Details
                  </button>
                  </Link>
                  <button onClick={()=>handle3Dot(job._id)} className="cursor-pointer "> <BsThreeDots/> </button>
                  {openModalId === job._id && (
                    <div className="absolute  mt-16 w-48 bg-white shadow-lg rounded-lg z-10">
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
    </div>
  );
};

export default JobApplicationReceiveList;

