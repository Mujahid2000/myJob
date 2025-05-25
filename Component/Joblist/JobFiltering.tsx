'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import './page.css'
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';


const JobFiltering = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('search')
    const [arrow , setArrow] = useState<boolean>(false);
    const [selectedExperience, setSelectedExperience] = useState<string>();
    const [selectedSalary, setSelectedSalary] = useState<string>("");
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [jobTitleKeyword, setJobTitleKeyword] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('')
  

  const handleCheckboxChange = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) // Uncheck
        : [...prev, type] // Check
    );
  };

  const handleCheckboxChange1 = (edu: string) => {
    setSelectedEducation((prev) =>
      prev.includes(edu)
        ? prev.filter((e) => e !== edu) // Uncheck
        : [...prev, edu] // Check
    );
  };




  const handleFiltering = () =>{
    const params = new URLSearchParams();
    if(selectedExperience) params.set('experience',selectedExperience);
    if(selectedSalary) params.set('salary',selectedSalary);
    if(selectedJobTypes.length > 0) params.set('jobType',selectedJobTypes.join(','));
    if(selectedEducation.length > 0) params.set('education',selectedEducation.join(','));
    if(selectedLevel) params.set('jobLevel',selectedLevel);
    if(jobTitleKeyword) params.set('jobRole', jobTitleKeyword);
    if(selectedLocation) params.set('location',selectedLocation);
    if(selectedCategory) params.set('category',selectedCategory);
    router.push(`/find-job?${params.toString()}`);
  }


    return (
        <div className='pt-29 '>
            <div className=''>
                {/* Page Header */}
                <div className='bg-[#F1F2F4] px-2 py-[2rem]' >
                <div className='flex max-w-7xl mx-auto justify-between items-center py-3'>
                    <h3 className='text-2xl font-semibold text-gray-800'>Find Job</h3>
                    <p className='text-gray-500'>Home / Find Job</p>
                </div>

                {/* Search Bar */}
                <div className='flex  max-w-7xl mx-auto flex-wrap md:flex-nowrap justify-between items-center bg-white p-3 rounded-md shadow-md gap-4'>
                  <div className='flex gap-3 items-center '>
                    <FiSearch className='text-blue-500 text-2xl' />
                    <Input 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitleKeyword([e.target.value])} 
                      value={jobTitleKeyword} 
                      type='text' 
                      placeholder='Job title, Keyword...' 
                      className='border-none shadow-none outline-none' 
                    />
                  </div>
                  <div className='flex gap-3 items-center '>
                    <SlLocationPin className='text-blue-500 text-2xl' />
                    <Input 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedLocation(e.target.value)} 
                      value={selectedLocation} 
                      type='text' 
                      placeholder='Your Location' 
                      className='border-none shadow-none outline-none' 
                    />
                  </div>
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className='overscroll-none w-[180px] cursor-pointer'>
                      <SelectValue placeholder='Category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='design' className='cursor-pointer'>Design</SelectItem>
                        <SelectItem value='development' className='cursor-pointer'>Development</SelectItem>
                        <SelectItem value='marketing' className='cursor-pointer'>Marketing</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button className='bg-white cursor-pointer text-gray-400 hover:bg-white focus:outline-blue-300' onClick={() => setArrow(!arrow)}>Advance Filter <ChevronDown className={`${arrow ? 'rotate-180' : ''} duration-300`}/> </Button>

                  <Button onClick={handleFiltering} className='bg-[#0A65CC] h-[3rem] w-[8rem] hover:bg-[#0A65CC] cursor-pointer'>Find Job</Button>
                </div>
                </div>

                {/* advanced search filte section */}
                {
                  arrow && (
                    <div className={`max-w-7xl  mx-auto  `}>
                <div className=' bg-white  shadow-lg rounded-lg'>
                <div className='grid grid-cols-5 absolute bg-white -mt-8'>
                
                
                {/* Experience */}
<div className="border p-4 w-64 mx-auto">
      <h2 className="text-[1.25rem] font-semibold mb-2">Experience</h2>
      <div className="space-y-2">
        {[
          "Freshers",
          "1 - 2 Years",
          "2 - 4 Years",
          "4 - 6 Years",
          "6 - 8 Years",
          "8 - 10 Years",
          "10 - 15 Years",
          "15+ Years",
        ].map((exp, index) => (
          <label
            key={index}
            htmlFor={`exp-${index}`}
            className="flex items-center cursor-pointer space-x-2"
          >
            {/* Custom Radio Input */}
            <input
              id={`exp-${index}`}
              type="radio"
              name="experience"
              value={exp}
              checked={selectedExperience === exp}
              onChange={() => setSelectedExperience(exp)}
              className="hidden peer"
            />

            {/* Custom Circle */}
            <div
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center 
              ${
                selectedExperience === exp
                  ? "border-[#0066FF]" // Active border
                  : "border-gray-400"
              }`}
            >
              {/* Inner Filled Circle (only visible when selected) */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-200
                ${
                  selectedExperience === exp
                    ? "bg-[#0066FF]" // Active fill
                    : "bg-transparent"
                }`}
              ></div>
            </div>

            {/* Label Text */}
            <span
              className={`text-lg font-medium transition-all duration-200 ${
                selectedExperience === exp ? "text-[#0066FF]" : "text-gray-700"
              }`}
            >
              {exp}
            </span>
          </label>
        ))}
      </div>
    </div>


{/* Salary */}
<div className="border p-4 w-64 mx-auto">
      <h2 className="text-[1.25rem] font-semibold mb-2">Salary</h2>
      <div className="space-y-2">
        {[
          "$50 - $1000",
          "$1000 - $2000",
          "$3000 - $4000",
          "$4000 - $6000",
          "$6000 - $8000",
          "$8000 - $10000",
          "$10000 - $15000",
          "$15000+",
        ].map((sal, index) => (
          <label
            key={index}
            htmlFor={`sal-${index}`}
            className="flex items-center cursor-pointer space-x-2"
          >
            {/* Hidden Radio Input */}
            <input
              id={`sal-${index}`}
              type="radio"
              name="salary"
              value={sal}
              checked={selectedSalary === sal}
              onChange={() => setSelectedSalary(sal)}
              className="hidden peer"
            />

            {/* Custom Radio Styling */}
            <div
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center 
              ${
                selectedSalary === sal
                  ? "border-[#0066FF]" // Active border
                  : "border-gray-400"
              }`}
            >
              {/* Inner Filled Circle (only visible when selected) */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-200
                ${
                  selectedSalary === sal
                    ? "bg-[#0066FF]" // Active fill
                    : "bg-transparent"
                }`}
              ></div>
            </div>

            {/* Label Text */}
            <span
              className={`text-lg font-medium transition-all duration-200 ${
                selectedSalary === sal ? "text-[#0066FF]" : "text-gray-700"
              }`}
            >
              {sal}
            </span>
          </label>
        ))}
      </div>
    </div>

{/* Job Type */}
<div className="border p-4 w-64 mx-auto">
      <label className="font-semibold text-lg">Job Type</label>
      <div className="flex flex-col gap-2 mt-2">
        {[
          "All",
          "Full Time",
          "Part Time",
          "Internship",
          "Remote",
          "Temporary",
          "Contract Base",
        ].map((type, index) => (
          <label
            key={index}
            htmlFor={`jobType-${index}`}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {/* Hidden Checkbox Input */}
            <input
              id={`jobType-${index}`}
              type="checkbox"
              value={type}
              checked={selectedJobTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
              className="hidden peer"
            />

            {/* Custom Checkbox */}
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
              ${
                selectedJobTypes.includes(type)
                  ? "border-[#0066FF] bg-[#0066FF]" // Checked state
                  : "border-gray-400 bg-transparent"
              }`}
            >
              {/* Inner Checkmark (✓) */}
              {selectedJobTypes.includes(type) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>

            {/* Label Text */}
            <span
              className={`text-lg font-medium transition-all duration-200 ${
                selectedJobTypes.includes(type) ? "text-[#0066FF]" : "text-gray-700"
              }`}
            >
              {type}
            </span>
          </label>
        ))}
      </div>
    </div>

{/* Education */}
<div className="border p-4 w-64 mx-auto">
      <h2 className="text-[1.25rem] font-semibold mb-2">Education</h2>
      <div className="flex flex-col gap-2">
        {[
          "All",
          "High School",
          "Intermediate",
          "Graduation",
          "Master Degree",
          "Bachelor Degree",
        ].map((edu, index) => (
          <label
            key={index}
            htmlFor={`edu-${index}`}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {/* Hidden Checkbox Input */}
            <input
              id={`edu-${index}`}
              type="checkbox"
              value={edu}
              checked={selectedEducation.includes(edu)}
              onChange={() => handleCheckboxChange1(edu)}
              className="hidden peer"
            />

            {/* Custom Checkbox */}
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
              ${
                selectedEducation.includes(edu)
                  ? "border-[#0066FF] bg-[#0066FF]" // Checked state
                  : "border-gray-400 bg-transparent"
              }`}
            >
              {/* Inner Checkmark (✓) */}
              {selectedEducation.includes(edu) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>

            {/* Label Text */}
            <span
              className={`text-lg font-medium transition-all duration-200 ${
                selectedEducation.includes(edu) ? "text-[#0066FF]" : "text-gray-700"
              }`}
            >
              {edu}
            </span>
          </label>
        ))}
      </div>
    </div>

{/* Job Level */}
<div className="border p-4 w-64  mx-auto">
      <h2 className="text-[1.25rem] font-semibold mb-2">Job Level</h2>
      <div className="flex flex-col gap-2">
        {["Entry Level", "Mid Level", "Expert Level"].map((level, index) => (
          <label
            key={index}
            htmlFor={`level-${index}`}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {/* Hidden Radio Input */}
            <input
              id={`level-${index}`}
              type="radio"
              name="jobLevel"
              value={level}
              checked={selectedLevel === level}
              onChange={() => setSelectedLevel(level)}
              className="hidden peer"
            />

            {/* Custom Radio Button */}
            <div
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200
              ${
                selectedLevel === level
                  ? "border-[#0066FF]" // Outer border color when selected
                  : "border-gray-400"
              }`}
            >
              {/* Inner Circle (Selected State) */}
              {selectedLevel === level && (
                <div className="w-3 h-3 bg-[#0066FF] rounded-full"></div>
              )}
            </div>

            {/* Label Text */}
            <span
              className={`text-lg font-medium transition-all duration-200 ${
                selectedLevel === level ? "text-[#0066FF]" : "text-gray-700"
              }`}
            >
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>
                </div>
                </div>
                </div>
                  )
                }
                {/* Job Listings Section */}

            </div>
            
        </div>
    );
};

export default JobFiltering;