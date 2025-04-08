'use client'
import { Bookmark, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import './feature.css'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';

const FeaturedJobs = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between'>
            <h1 className='text-[2.5rem] text-[#191F33]'>Featured Jobs</h1>
            <Button className='p-3 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'>View All →</Button>
            </div>
            <div className='flex justify-between p-[1.25rem] rounded-sm my-4 hover:shadow-md border '>
            <div className='flex items-center gap-6'>
            <Image
            src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"
            width={80}
            height={80}
            alt="Picture of the author"
      />
     <div className='flex flex-col gap-4'>
     <div className='flex items-center gap-3 '>
        <h3 className='text-lg text-[#191F33]'>Senior UX Designer</h3>
        <Badge className='bg-blue-100 text-[#0A65CC]'>Contract Base</Badge>
        
      </div>
      
      <div className='flex gap-5'>

        <div className='flex gap-2'>
            <MapPin/>
            <p>Australia</p>
        </div>
        <div className='flex gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <g clipPath="url(#clip0_1647_32339)">
    <path d="M11 2.0625V19.9375" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.8125 7.5625C15.8125 7.11108 15.7236 6.66408 15.5508 6.24703C15.3781 5.82997 15.1249 5.45102 14.8057 5.13182C14.4865 4.81262 14.1075 4.55941 13.6905 4.38666C13.2734 4.21391 12.8264 4.125 12.375 4.125H9.28125C8.36957 4.125 7.49523 4.48716 6.85057 5.13182C6.20591 5.77648 5.84375 6.65082 5.84375 7.5625C5.84375 8.47418 6.20591 9.34852 6.85057 9.99318C7.49523 10.6378 8.36957 11 9.28125 11H13.0625C13.9742 11 14.8485 11.3622 15.4932 12.0068C16.1378 12.6515 16.5 13.5258 16.5 14.4375C16.5 15.3492 16.1378 16.2235 15.4932 16.8682C14.8485 17.5128 13.9742 17.875 13.0625 17.875H8.9375C8.02582 17.875 7.15148 17.5128 6.50682 16.8682C5.86216 16.2235 5.5 15.3492 5.5 14.4375" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_32339">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
            <p>$30K-$35K</p>
        </div>
        <div className='flex gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <g clipPath="url(#clip0_1647_32345)">
    <path d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.125 2.0625V4.8125" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.875 2.0625V4.8125" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.4375 7.5625H18.5625" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_32345">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
            <p>4 Days Remaining</p>
        </div>

      </div>
     </div>
            </div>

            <div className='flex items-center gap-5'>
            <Button variant="secondary" className='cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'>
            <Bookmark/>
</Button>

                <Button className='bg-[#E7F0FA] hover:bg-blue-600 hover:text-white text-blue-600' name='Appley Now'>Apply Now →</Button>
            </div>
        </div>
        </div>
    );
};

export default FeaturedJobs;