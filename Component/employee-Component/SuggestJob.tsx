

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Calendar, DollarSign,  MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";




export interface JobListing {
  _id: string
  userId: string
  companyId: string
  title: string
  tags: string[]
  jobRole: string
  salaryType: string
  minSalary: number
  maxSalary: number
  education: string
  experience: string
  jobType: string
  jobLevel: string
  responsibilities: string
  location: string
  status: string
  promotedSystem?: string
  logo?: string
  companyName?: string
}


export default async function SuggestJob() {
  

    let jobListings: JobListing[] = [];
   
  try {
    const res = await fetch("https://job-server-497l.vercel.app/jobs/getAllPostedData", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();
    const newJobList = data.data; // Adjust based on the actual response structure
   
    jobListings = Array.isArray(newJobList) ? newJobList : newJobList.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="max-w-7xl mx-auto py-10 text-center text-red-500">
        Error loading job listings. Please try again later.
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto py-7'>
     <h1 className="text-3xl font-medium py-5">Open Position ({jobListings.length})</h1>
      {/* Job Listings */}
      
          <div className={`grid grid-cols-3 gap-4`}>
        {jobListings.map((job) => (
          <Link href={`/find-job/${job._id}`} key={job._id}>
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <img src={job?.logo} alt={job?.companyName} className='rounded-md w-12 h-12' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>{job?.companyName}</h4>
              <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>{job?.location}</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>{job?.title}</h3>
              <p className='text-gray-500'>{job?.jobType} • {job?.minSalary}-{job?.maxSalary} </p>
            

              
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
        
       
    </div>
  );
}
