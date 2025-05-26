'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

export default function HeaderSide() {
    const [jobTitle, setJobTitle] = useState("");
      const [location, setLocation] = useState("");
      const [category, setCategory] = useState("");
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ jobTitle, location, category });
        // Perform search logic here
      };

    return (
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
    )
}