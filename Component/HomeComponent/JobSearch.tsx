'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';

const JobSearch = () => {
    const router = useRouter();
    const [jobTitle, setJobTitle] = useState<string>('');
    const [location, setLocation] = useState<string>('')
    const handleSearch = () =>{
        if (jobTitle.trim() === '' && location.trim() === ''){
            return
        }
        const params = new URLSearchParams();
        if (jobTitle.trim() !== '') {
            params.set('jobRole', jobTitle.trim())
        }
        if (location.trim() !== '') {
            params.set('location', location.trim())
        }
        router.push(`/find-job?${params.toString()}`)
    }

    return (
        <>
            <div className='px-2 '>
                        <div className='flex items-center rounded-sm mt-2 lg:mt-4 bg-white sm:mx-2 lg:mx-0 px-2 gap-3 py-2 lg:py-3'>
                        <div className='flex gap-1 lg:gap-3 justify-center items-center'>
                        <FiSearch className="text-blue-500 text-xl md:text-2xl lg:text-3xl" />
                        <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="Job tittle, Keyword..." className='border-none shadow-none h-[2rem] lg:h-[3rem] outline-none '/>
                        </div>
                        <div className='flex gap-1 lg:gap-3 justify-center items-center'>
                        <SlLocationPin className="text-blue-500 text-lg lg:text-2xl" />
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Your Location" className='border-none shadow-none h-[2rem] lg:h-[3rem] '/>
                        </div>
                        <Button onClick={handleSearch} className='bg-[#0A65CC] cursor-pointer h-[2.2rem] lg:h-[3rem] w-[5rem] lg:w-[8rem] hover:bg-blue-500'>Find Job</Button>
                        </div>
            
                        </div>
        </>
    );
};

export default JobSearch;