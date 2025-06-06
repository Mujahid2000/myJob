import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from "react-icons/sl";
import JobSearch from './JobSearch';

const Banner = () => {
    return (
        <div className='bg-[#F1F2F4] pt-22 lg:pt-44'>
            <div className='flex  max-w-7xl pt-10 mx-auto items-center  justify-between'>
            <div>
            <h1 className='text-[2rem] px-2 md:text-[2.2rem] lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[3.5rem] font-semibold leading-none py-3 text-[#18191C]'>Find a job that suits <br /> your interest & skills.</h1>
            <p className='px-2 text-[1rem] lg:text-[1.125rem] max-w-[33.5rem] text-[#18191C] py-3'>Turn yourself, time will not wait for you. Dream big, because you are the creator of your future.</p>
            <JobSearch/>

            <h1 className='text-[#474C54] text-sm lg:text-base px-2 lg:px-0 py-5'>Suggestions: Designer, Programming, <span className='text-blue-600'>Digital Marketing,</span> Video, Animation</h1>
            </div>
            <div>
                <Image className='hidden md:flex' alt="Logo" src='https://res.cloudinary.com/diez3alve/image/upload/v1740507104/Screenshot_2025-02-25_010742-removebg-preview_ejpmnb.png' width={600} height={600}/>
            </div>
        </div>
        <div className='flex flex-col md:flex-col gap-2 lg:gap-0 lg:flex-row xl:flex-row 2xl:flex-row justify-between max-w-7xl mx-auto PY-5 lg:py-20'>
                <div className='flex items-center px-3 py-3 w-full lg:w-[19rem] rounded-sm gap-1 bg-white'>
                    <div className='p-5 rounded-sm bg-blue-100'>
                    <Image alt='' src='https://res.cloudinary.com/diez3alve/image/upload/v1740570665/briefcase-duotone_1_-_Copy_wrbjrq.svg' width={40} height={40}/>
                    </div>
                    <div className='px-8'>
                        <p className='text-[1.5rem] pb-2'>1,75,324</p>
                        <p className='text-[#767F8C] text-[1.1rem]'>Live Job</p>
                    </div>
                </div>
                <div className='flex items-center px-3 py-3 w-full lg:w-[19rem] rounded-sm gap-1 bg-white'>
                    <div className='p-5 rounded-sm bg-blue-500'>
                    <Image alt='' src='https://res.cloudinary.com/diez3alve/image/upload/v1740571611/buildings-duotone_1_lhffa8.svg' width={40} height={40}/>
                    </div>
                    <div className='px-8'>
                        <p className='text-[1.5rem] pb-2'>97,354</p>
                        <p className='text-[#767F8C] text-[1.1rem]'>Companies</p>
                    </div>
                </div>
                <div className='flex items-center px-3 py-3 w-full lg:w-[19rem] rounded-sm gap-1 bg-white'>
                    <div className='p-5 rounded-sm bg-blue-100'>
                    <Image alt='' src='https://res.cloudinary.com/diez3alve/image/upload/v1740570665/users-duotone_1_yhjzcb.svg' width={40} height={40}/>
                    </div>
                    <div className='px-8'>
                        <p className='text-[1.5rem] pb-2'>38,47,154</p>
                        <p className='text-[#767F8C] text-[1.1rem]'>Candidates</p>
                    </div>
                </div>
                <div className='flex items-center px-3 py-3 w-full lg:w-[19rem] rounded-sm gap-1 bg-white'>
                    <div className='p-5 rounded-sm bg-blue-100'>
                    <Image alt='' src='https://res.cloudinary.com/diez3alve/image/upload/v1740570665/briefcase-duotone_1_-_Copy_wrbjrq.svg' width={40} height={40}/>
                    </div>
                    <div className='px-8'>
                        <p className='text-[1.5rem] pb-2'>7,532</p>
                        <p className='text-[#767F8C] text-[1.1rem]'>New Jobs</p>
                    </div>
                </div>
                
        </div>
        </div>
        
    );
};

export default Banner;