"use client";

import { PaginationDemo } from "@/Component/employee-Component/Pagination";
import { RadioGroupItems } from "@/Component/employee-Component/RadioGroup";
import { SliderDemo } from "@/Component/employee-Component/RangeSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bookmark, 
  CalendarMinus2,
  Grid,
  List,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

const jobListings = [
  {
    id: 1,
    company: "Reddit",
    role: "Marketing Officer",
    location: "United Kingdom",
    salary: "$30K-$35K",
    type: "Full Time",
    featured: true,
    logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
  },
  {
    id: 2,
    company: "Dribbble",
    role: "Senior UX Designer",
    location: "California",
    salary: "$50K-$80K/month",
    type: "Full-Time",
    featured: true,
    logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
  },
  {
    id: 3,
    company: "Figma",
    role: "UI/UX Designer",
    location: "Canada",
    salary: "$50K-$70K",
    type: "Full Time",
    featured: true,
    logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
  },
  {
    id: 4,
    company: "Microsoft",
    role: "Product Designer",
    location: "Australia",
    salary: "$40K-$50K",
    type: "Full Time",
    featured: false,
    logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
  },
  {
    id: 5,
    company: "Slack",
    role: "Networking Engineer",
    location: "Germany",
    salary: "$50K-$90K",
    type: "Remote",
    featured: false,
    logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
  },
];


const FindJobPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [values, setValues] = React.useState(50);
  const [viewMode, setViewMode] = useState<string>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ jobTitle, location, category });
    // Perform search logic here
  };

  return (
    // Main container for the Find Job page
    <div className="pt-29 ">
      {/* Header section */}
      <div className="bg-[#F1F2F4] px-2 py-6 ">
        <div className="flex max-w-7xl mx-auto justify-between items-center py-3">
          <h3 className="text-2xl font-semibold text-gray-800">Find Job</h3>
          <p className="text-sm text-gray-500">Home / Find Job</p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex max-w-7xl mx-auto flex-wrap md:flex-nowrap items-center bg-white p-2 rounded-lg shadow-sm gap-2"
        >
          {/* Job Title Search */}
          <div className="flex flex-2 items-center  rounded-md px-3 py-2">
            <FiSearch className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title, Keyword..."
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Separator */}
          <div className="hidden md:block text-gray-300">|</div>

          {/* Location Search */}
          <div className="flex flex-1 items-center  rounded-md px-3 py-2">
            <SlLocationPin className="text-blue-500 text-lg mr-2" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your Location"
              className="bg-transparent border-none shadow-none outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-1 items-center">
            <Select onValueChange={setCategory}>
              <SelectTrigger className="flex  w-full items-center justify-between rounded-md px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 data-[placeholder]:text-gray-400 border-none shadow-none">
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
                  <SelectItem
                    value="design"
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Design
                  </SelectItem>
                  <SelectItem
                    value="development"
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Development
                  </SelectItem>
                  <SelectItem
                    value="marketing"
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
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
      <div className="flex justify-between max-w-7xl mx-auto py-6">
        <div>
          <Button className="bg-[#0A65CC] flex gap-2 text-base cursor-pointer px-5 py-2 rounded-none">
            <SlidersHorizontal />
            Filter
          </Button>
        </div>

        {/* Sorting and view mode buttons */}
        <div className="flex gap-9">
          <Select>
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

          <Select>
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
            className="cursor-pointer"
            variant="ghost"
            onClick={() => setViewMode("grid")}
          >
            <Grid size={20} />
          </Button>
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </Button>
        </div>
      </div>

      {/* Job listings and filters */}
      <div className="max-w-7xl mx-auto flex gap-5">
        {/* Filter section */}
        <div className="flex-1 max-h-80 rounded-lg shadow-md border py-6 px-3">
          <h2 className="py-2">
            Location Radius: <span className="text-blue-600">{values} miles</span>
          </h2>

          <SliderDemo onValueChange={(newValue) => setValues(newValue[0])} />
          <RadioGroupItems />
        </div>

        {/* Job listings section */}
        <div className="flex-2">
          {viewMode == "grid" ? (
            <div className={`grid grid-cols-2 gap-4`}>
              {jobListings.map((job) => (
                <Link href={`/employers/${job.id}`} key={job.id}>
                  <Card className=" border hover:shadow-lg transition">
                    <CardContent className={`flex flex-col gap-3 p-4`}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={55}
                          height={55}
                          className="rounded-md"
                        />
                        <div>
                          <div className="flex gap-3">
                            <h4 className="font-semibold text-[1rem]">
                              {job.company}
                            </h4>
                            {job.featured && (
                              <span className="bg-[#FFE0E0] text-[#FF4F4F] px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1 items-center">
                            <MapPin className="w-4" />
                            <p className="text-[0.875rem] text-gray-400">
                              {job.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-blue-600 font-semibold cursor-pointer text-[1.15rem]">
                        {job.role}
                      </h3>
                      <p className="text-gray-500">
                        {job.type} • {job.salary}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobListings.map((job) => (
                <Card
                  key={job.id}
                  className={`border  hover:hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white}`}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    {/* Left Section: Logo & Job Info */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={job.logo}
                        alt={job.role}
                        width={55}
                        height={55}
                        className="rounded-md"
                      />

                      <div>
                        <div className="flex gap-3 ">
                          <h3 className="font-semibold text-[#18191C] text-lg">
                            {job.role}
                          </h3>
                          
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{job.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                          <CalendarMinus2 size={16} />
                            <span>3 - open Job</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Bookmark & Apply Button */}
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" className="cursor-pointer">
                        <Bookmark />
                      </Button>
                      <Link href={`/employers/${job.id}`}>
                        <Button className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm">
                          Apply Now →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination section */}
      <PaginationDemo />
    </div>
  );
};

export default FindJobPage;
