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
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import SideBar from './SideBar';
import { RadioGroupItems } from './RadioGroup';

const FilteringSide = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [viewMode, setViewMode] = useState<string>('grid');
  const { inputSelect, slider } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const mode = searchParams.get('viewMode');
    if (mode) setViewMode(mode);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (jobTitle) params.append('jobTitle', jobTitle);
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    if (viewMode) params.append('viewMode', viewMode);
    if (inputSelect) params.append('organizationType', inputSelect);
    

    router.push(`/employers?${params.toString()}`);
  };

  const HandleOpenSideBar = () => {
    
  }

  return (
    <div>
      <div className="bg-[#F1F2F4] px-2 py-6">
        <div className="flex max-w-7xl mx-auto justify-between items-center py-3">
          <h3 className="text-2xl font-semibold text-gray-800">Find Company</h3>
          <p className="text-sm text-gray-500">Home / Find Company</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row item-start max-w-7xl mx-auto flex-wrap md:flex-nowrap lg:items-center bg-white p-2 rounded-lg shadow-sm gap-2"
        >
          <div className="flex flex-2 items-center rounded-md px-3 py-2">
            <FiSearch className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Company Name, Keyword..."
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="hidden md:block text-gray-300">|</div>

          <div className="flex flex-1 items-center rounded-md px-3 py-2">
            <SlLocationPin className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your Location"
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-1 items-center">
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="flex w-full items-center rounded-md px-3 text-gray-700 border-none shadow-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white rounded-md shadow-lg">
                <SelectGroup>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button
              type="submit"
              className="bg-[#0A65CC] cursor-pointer h-8 text-sm lg:text-base lg:h-10 px-3 lg:px-6 text-white rounded-md hover:bg-[#0A65CC]/90"
            >
              Find Company
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 justify-between max-w-7xl px-3 lg:px-0 mx-auto py-6">
        <div>
          <Button className='bg-[#0A65CC] hidden lg:flex gap-2 text-base cursor-pointer px-5 py-2 rounded-none'>
Filter
          </Button>
        </div>
        <Sheet>
      <SheetTrigger asChild>
        <Button onClick={HandleOpenSideBar} className="bg-[#0A65CC] lg:hidden flex gap-2 text-base cursor-pointer px-5 py-2 rounded-none">
            <SlidersHorizontal />
            Filter
          </Button>
      </SheetTrigger>
      <SheetContent>
       <SheetHeader>
          <SheetTitle>Filter Employee</SheetTitle>
       </SheetHeader>
       <RadioGroupItems/>
      </SheetContent>
    </Sheet>
        <div className="flex  items-start gap-3 lg:gap-9">
          <Select>
            <SelectTrigger className="w-[120px] cursor-pointer">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[120px] cursor-pointer">
              <SelectValue placeholder="12 per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 per page</SelectItem>
              <SelectItem value="24">24 per page</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              setViewMode("list");
              router.push(`/employers?viewMode=list`);
            }}
            
            className="cursor-pointer"
            variant="ghost"
          >
            <Grid size={20} />
          </Button>
          <Button
          onClick={() => {
              setViewMode("grid");
              router.push(`/employers?viewMode=grid`);
            }}
            className="cursor-pointer"
            variant="ghost"
          >
            <List size={20} />
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default FilteringSide;
