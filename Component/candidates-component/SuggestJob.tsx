'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Calendar, DollarSign,  MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";

const jobListings = [
  { id: 1, company: 'Reddit', role: 'Marketing Officer', location: 'United Kingdom', salary: '$30K-$35K', type: 'Full Time', featured: true, logo: 'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' },
  { id: 2, company: 'Dribbble', role: 'Senior UX Designer', location: 'California', salary: '$50K-$80K/month', type: 'Full-Time', featured: true, logo: 'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' },
  { id: 3, company: 'Figma', role: 'UI/UX Designer', location: 'Canada', salary: '$50K-$70K', type: 'Full Time', featured: true, logo: 'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' },
  { id: 4, company: 'Microsoft', role: 'Product Designer', location: 'Australia', salary: '$40K-$50K', type: 'Full Time', featured: false, logo: 'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' },
  { id: 5, company: 'Slack', role: 'Networking Engineer', location: 'Germany', salary: '$50K-$90K', type: 'Remote', featured: false, logo: 'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' },
];
interface ViewModeData {
  name: string;
}
type ViewMode = 'grid' | 'list';



export default function SuggestJob() {
  const [viewMode, setViewMode] = useState<string>('grid');

  return (
    <div className='max-w-7xl mx-auto py-7'>
     <h1 className="text-3xl font-medium py-5">Open Position ({jobListings.length})</h1>
      {/* Job Listings */}
      {
        viewMode == 'grid' ? (
          <div className={`grid grid-cols-3 gap-4`}>
        {jobListings.map((job) => (
          <Link href='/find-job/single-job' key={job.id}>
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <Image src={job.logo} alt={job.company} width={55} height={55} className='rounded-md' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>{job.company}</h4>
                  {job.featured && <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>}
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>{job.location}</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>{job.role}</h3>
              <p className='text-gray-500'>{job.type} • {job.salary}</p>
            

              
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
        ):
        (
          <div className='grid grid-cols-1 gap-4'>
            {
              jobListings.map((job) =>(
                
                <Card key={job.id} className={`border  hover:hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white}`} >
      <CardContent className="flex items-center justify-between p-6">
        
        {/* Left Section: Logo & Job Info */}
        <div className="flex items-center gap-4">
          <Image src={job.logo} alt={job.role} width={55} height={55} className="rounded-md" />

          <div>
            <div className='flex gap-3 '>
            <h3 className="font-semibold text-[#18191C] text-lg">{job.role}</h3>
            <div className="flex gap-2 mt-1">
              {job.featured && <Badge variant="destructive" className="bg-red-100 text-red-600">Featured</Badge>}
              {job.type && <Badge variant="secondary" className="bg-blue-100 text-blue-600">{job.type}</Badge>}
            </div>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm mt-2">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex text-[#5E6670] items-center gap-1">
                <DollarSign size={16} />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>6 Days Remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Bookmark & Apply Button */}
        <div className='flex items-center gap-4'>
            <Button variant='ghost' className='cursor-pointer'>
              <Bookmark/>
            </Button>
            <Link href='/find-job//single-job'>
            <Button className='bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm'>
              Apply Now →
            </Button>
            </Link>
          </div>

      </CardContent>
    </Card>
               
              ))
            }
          </div>
        )
      }
    </div>
  );
}
