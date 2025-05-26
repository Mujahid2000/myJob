'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Calendar, DollarSign,  MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";


interface JobListing {
  _id: string;
  userId: string;
  companyId: string;
  companyName: string;
  tags: string[];
  jobRole: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  education: string;
  experience: string;
  jobType: string;
  expireDate: string;
  vacancy: string;
  jobLevel: string;
  description: string;
  responsibilities: string;
  location: string;
  status: string;
  title: string;
  promotedSystem?: string | null;
  logo?: string ;
}

export default async function SuggestJob({userId}: { userId?: string }) {
  

    let jobListings: JobListing[] = [];
  try {
    const res = await fetch("http://localhost:5000jobs/getAllPostedData", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();
    jobListings = Array.isArray(data) ? data : data.data || [];
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
          <Link href={`/employers/${job.userId}`} key={job._id}>
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <img src={job.logo} alt={job.companyName} className='rounded-md w-12 h-12' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>{job.companyName}</h4>
              <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>{job.location}</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>{job.title}</h3>
              <p className='text-gray-500'>{job.jobType} • {job.minSalary}-{job.maxSalary} </p>
            

              
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
        
       
    </div>
  );
}
