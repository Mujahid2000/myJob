'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { List, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '@/Store/Store';
import { setCategory, setItemsPerPage, setJobTitle, setLocation, setSortBy, setViewMode, toggleFilterOpen } from '@/Store/searchFilterSlice';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { SliderDemo } from '../employee-Component/RangeSlider';
import { RadioGroupItemsCandidate } from './CandidateLevel';
import { RadioGroupItemsExperience } from './RadioGroup';
import { CheckboxDemo } from './CheckBox';
import { RadioGroupItemsGender } from './GenderRadioGroup';


export default function HeaderSide() {
  const dispatch = useDispatch();
  const {
    jobTitle: reduxJobTitle,
    location: reduxLocation,
    category: reduxCategory,
    viewMode,
    itemsPerPage,
    sortBy,
    isFilterOpen,
  } = useSelector((state: RootState) => state.searchFilter);
  const selectedLevel = useSelector((state: RootState) => state.candidateLevel.selectedLevel);
  const checkedItems = useSelector((state: RootState) => state.education.checkedItems);
  const selectedGender = useSelector((state: RootState) => state.gender.selectedGender);
  const selectedExperience = useSelector((state: RootState) => state.experience.selectedExperience);
  const [values, setValues] = React.useState(50);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for controlled inputs (synced with Redux)
  const [localJobTitle, setLocalJobTitle] = useState(reduxJobTitle);
  const [localLocation, setLocalLocation] = useState(reduxLocation);
  const [localCategory, setLocalCategory] = useState(reduxCategory);

  // Sync local state with Redux on change
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalJobTitle(value);
    dispatch(setJobTitle(value));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalLocation(value);
    dispatch(setLocation(value));
  };

  const handleCategoryChange = (value: string) => {
    setLocalCategory(value);
    dispatch(setCategory(value));
  };



  const handleItemsPerPageChange = (value: string) => {
    dispatch(setItemsPerPage(value as '12' | '24'));
  };

  const handleSortByChange = (value: string) => {
    dispatch(setSortBy(value as 'latest' | 'popular'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedLevel) params.append('level', selectedLevel);
    if (checkedItems.length > 0) params.append('education', checkedItems.join(','));
    if (selectedGender) params.append('gender', selectedGender);
    if (selectedExperience) params.append('experience', selectedExperience);
    if (localJobTitle) params.append('jobTitle', localJobTitle);
    if (localLocation) params.append('location', localLocation);
    if (localCategory) params.append('category', localCategory);
    if (viewMode) params.append('viewMode', viewMode);
    if (itemsPerPage) params.append('itemsPerPage', itemsPerPage);
    if (sortBy) params.append('sortBy', sortBy);
   

    router.push(`/candidates?${params.toString()}`);
  };

  const handleFilterToggle = () => {
    dispatch(toggleFilterOpen());
    // Add filter panel logic here (e.g., open a modal or sidebar)
    console.log('Filter panel toggled, isFilterOpen:', isFilterOpen);
  };

  return (
    <div>
      <div className="bg-[#F1F2F4] px-2 py-6">
        <div className="flex max-w-7xl mx-auto justify-between items-center py-3">
          <h3 className="text-2xl font-semibold text-gray-800">Find Job</h3>
          <p className="text-sm text-gray-500">Home / Find Job</p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row max-w-7xl mx-auto flex-wrap md:flex-nowrap items-start lg:items-center bg-white p-2 rounded-lg shadow-sm gap-2"
        >
          {/* Job Title Search */}
          <div className="flex flex-2 w-full items-center rounded-md px-3 py-2">
            <FiSearch className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={localJobTitle}
              onChange={handleJobTitleChange}
              placeholder="Job title, Keyword..."
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Separator */}
          <div className="hidden md:block text-gray-300">|</div>

          {/* Location Search */}
          <div className="flex w-full flex-1 items-center rounded-md px-3 py-2">
            <SlLocationPin className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={localLocation}
              onChange={handleLocationChange}
              placeholder="Your Location"
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-1 items-center w-full">
            <Select onValueChange={handleCategoryChange} value={localCategory}>
              <SelectTrigger className="flex w-full items-center justify-between rounded-md px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 data-[placeholder]:text-gray-400 border-none shadow-none">
                <div className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="#0A65CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="#0A65CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="#0A65CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="z-50 bg-white rounded-md shadow-lg">
                <SelectGroup>
                  <SelectItem value="design" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    Design
                  </SelectItem>
                  <SelectItem value="development" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    Development
                  </SelectItem>
                  <SelectItem value="marketing" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    Marketing
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Find Job Button */}
          <div>
            <Button
              type="submit"
              className="bg-[#0A65CC] h-10 px-6 text-white rounded-md hover:bg-[#0A65CC]/90"
            >
              Find Job
            </Button>
          </div>
        </form>
      </div>

      {/* Filter and view mode section */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 px-4 lg:px-0 justify-between max-w-7xl mx-auto py-6">
        <div>
          <Button
            className="bg-[#0A65CC] hidden lg:flex gap-2 text-base cursor-pointer px-5 py-2 rounded-none"
            onClick={handleFilterToggle}
          >
            <SlidersHorizontal />
            Filter
          </Button>
          {/* Simple filter panel (expand this as needed) */}
         
        </div>



{/* mobile filter button with sidebar */}
<Sheet>
      <SheetTrigger asChild>
       <Button
            className="bg-[#0A65CC] w-21 lg:hidden flex gap-2 text-base cursor-pointer px-5 py-2 rounded-none"
            onClick={handleFilterToggle}
          >
            <SlidersHorizontal />
            Filter
          </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-[#0A65CC] text-xl font-bold'>Candidate Filter</SheetTitle>
        </SheetHeader>
       <div className="flex-1 flex flex-col gap-1 max-h-[90vh] overflow-y-scroll">
                 {/* Filter section */}
                 <div className=" max-h-56 rounded-lg lg:shadow-md lg:border py-3 px-3">
                   <h2 className="pb-2">
                     Location Radius:{" "}
                     <span className="text-blue-600">{values} miles</span>
                   </h2>
                   <SliderDemo onValueChange={(newValue) => setValues(newValue[0])} />
                  <RadioGroupItemsCandidate/>
                 </div> 
                 <div className="flex-1 max-h-66 rounded-lg lg:shadow-md lg:border py-2 px-3">
                   <RadioGroupItemsExperience/>
                 </div>
                 <div className="flex-1 max-h-56 rounded-lg lg:shadow-md lg:border py-3 px-3">
                   <CheckboxDemo
                   />
                 </div>
                 <div className="flex-1 max-h-32 rounded-lg lg:shadow-md lg:border py-3 px-3">
                  <RadioGroupItemsGender/>
                 </div>
               </div>
              
      </SheetContent>
    </Sheet>


        {/* Sorting and view mode buttons */}
        <div className="flex gap-5 lg:gap-9">
          <Select onValueChange={handleSortByChange} value={sortBy || 'latest'}>
            <SelectTrigger className="w-[120px] cursor-pointer">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest" className="cursor-pointer">
                Latest
              </SelectItem>
              <SelectItem value="popular" className="cursor-pointer">
                Popular
              </SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleItemsPerPageChange} value={itemsPerPage || '12'}>
            <SelectTrigger className="w-[120px] cursor-pointer">
              <SelectValue placeholder="12 per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12" className="cursor-pointer">
                12 per page
              </SelectItem>
              <SelectItem value="24" className="cursor-pointer">
                24 per page
              </SelectItem>
            </SelectContent>
          </Select>

         
        <Button
        onClick={() => {
        setViewMode("grid");
        router.push(`/candidates?viewMode=list`);
        }}
        className="cursor-pointer"
        variant="ghost">
        <List size={20} />
        </Button>
        </div>
      </div>
    </div>
  );
}