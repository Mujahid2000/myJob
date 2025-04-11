"use client";
import { CheckboxDemo } from "@/Component/candidates-component/CheckBox";
import { PaginationDemo } from "@/Component/candidates-component/Pagination";
import { RadioGroupItems } from "@/Component/candidates-component/RadioGroup";
import { SliderDemo } from "@/Component/candidates-component/RangeSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Bookmark,
  Briefcase,
  BriefcaseConveyorBelt,
  Cake,
  Calendar,
  CircleUserRound,
  ClipboardList,
  DollarSign,
  Download,
  FileText,
  Globe,
  Globe2,
  GraduationCap,
  Grid,
  Layers,
  List,
  Mail,
  Map,
  MapPin,
  Phone,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaReddit,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

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
  const [open, setOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto flex  gap-5">
        <div className="flex-1 flex flex-col gap-1">
          {/* Filter section */}
          <div className=" max-h-56 rounded-lg shadow-md border py-3 px-3">
            <h2 className="pb-2">
              Location Radius:{" "}
              <span className="text-blue-600">{values} miles</span>
            </h2>
            <SliderDemo onValueChange={(newValue) => setValues(newValue[0])} />
            <RadioGroupItems
              title={"Candidate Level"}
              list={["Entry Level", "Mid Level", "Expert Level  "]}
            />
          </div>
          <div className="flex-1 max-h-66 rounded-lg shadow-md border py-2 px-3">
            <RadioGroupItems
              title={"Experiences"}
              list={[
                "Freshers",
                "1 - 2 Years",
                "2 - 4 Years",
                "4 - 6 Years",
                "6 - 8 Years",
                "8 - 10 Years",
                "10 - 15 Years",
                "15+ Years",
              ]}
            />
          </div>
          <div className="flex-1 max-h-56 rounded-lg shadow-md border py-3 px-3">
            <CheckboxDemo
              title={"Education"}
              list={[
                "All",
                "High School",
                "Intermediate",
                "Graduation",
                "Master Degree",
                "Bachelor Degree",
              ]}
            />
          </div>
          <div className="flex-1 max-h-32 rounded-lg shadow-md border py-3 px-3">
            <RadioGroupItems
              title={"Gender"}
              list={["Male", "Female", "Others"]}
            />
          </div>
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
                            <BriefcaseConveyorBelt size={16} />
                            <span>3 Years experience</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Bookmark & Apply Button */}
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" className="cursor-pointer">
                        <Bookmark />
                      </Button>

                      <Button
                        onClick={() => setOpen(!open)}
                        className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm"
                      >
                        View profile →
                      </Button>
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
      <div
        className={`${
          open ? " visible" : " invisible"
        } w-full  fixed top-0 left-0 z-[200000000] bg-[#0000002a]  transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            open ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
          } w-[50%] h-screen pt-6 rounded-lg transition-all duration-300  `}
        >
          <div className="flex gap-3 ">
                      
          <div className="p-5 rounded-md bg-white ">
            <div className="max-w-7xl mx-auto px-4">
            
              <div>
                {/* this is header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <image className="w-16 h-16 bg-gray-400 rounded-full" />
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        Esther Howard
                      </h1>
                      <p className="text-sm text-gray-600">
                        Website Designer (UI/UX)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="cursor-pointer">
                      <Bookmark />
                    </Button>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Mail className="mr-2 h-4 w-4" /> Send Mail
                    </Button>
                  </div>
                </div>

                <div className="flex gap-5 justify-between pt-6">
{/* 1st parent div */}
<div className="flex-1">
<div className="pb-4">
  <h3 className="text-base font-medium text-[#18191C]">BIOGRAPHY</h3>
  <p className="text-sm">I&apos;ve been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs. I mostly use Adobe Photoshop, Illustrator, XD and Figma. *Website User Experience and Interface (UI/UX) Design - for all kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - for all kinds of IOS/Android and Hybrid Mobile Applications. *Wireframe Designs.</p>
</div>
<hr />
<div>
            <div className="border-b pb-6">
              <div>
                <h3 className="text-[#18191C] font-medium py-5">COVER LETTER</h3>
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  Dear Sir,
                  <br />
                  
                  I am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System. I learned of the opening through a notice posted on JobZone, IPFW’s job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.
                  <br />
                  <br />
                  I have just completed my Bachelor of Science degree in Elementary Education and have successfully completed Praxis I and Praxis II. During my student teaching experience, I developed and initiated a three-week curriculum sequence on animal species and earth resources. This collaborative unit involved working with three other third grade teachers within my team, and culminated in a field trip to the Indianapolis Zoo Animal Research Unit.
                  <br />
                  <br />
                  Sincerely,
                  <br />
                  <span className="pt-3 text-xl">Esther Howard</span>
                </p>
              </div>
            </div>
</div>
<div className="py-3">
  <h3>Follow me on social media</h3>
  <div className="flex gap-2 pt-3">
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaFacebookF /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"><FaTwitter /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaLinkedinIn /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"><FaReddit /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaInstagram /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaYoutube />
</button>
</div>
</div>
</div>
{/* 2rd parent div */}
<div className="">
<Card className="p-6 shadow-none hover:shadow-md duration-300 rounded-md  max-w-[33rem]">
        
        <div className="grid grid-cols-2 gap-2 text-gray-600">
          <p className="flex flex-col text-[#0A65CC] items-start "><Cake  size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Date of Birth:</span> <span className='text-black font-medium text-[14px]'>14 June, 2021</span></p>
          <p className="flex flex-col items-start "><Map className="text-[#0A65CC]" size={16} strokeWidth={1.7}/> <span className="font-normal  text-[12px] text-[#767F8C]">Nationality:</span> <span className='text-black font-medium text-[14px]'>Bangladeshi</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><ClipboardList size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">marital Status:</span> <span className='text-black font-medium text-[14px]'>Single</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><CircleUserRound size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Gender:</span> <span className='text-black font-medium text-[14px]'>Male</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><Layers size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Experience:</span> <span className='text-black font-medium text-[14px]'>7 Years</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><GraduationCap size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Educations:</span> <span className='text-black font-medium text-[14px]'>Master Degree</span></p>
        
        </div>
      </Card>


<div>
      <Card className="flex flex-col duration-300 gap-2 px-2 mt-2 shadow-none hover:shadow-md">
        <h3 className="text-[16px] text-[#18191C] px-3 ">Download My Resume</h3>
        <div className="flex justify-between items-center px-3">
        <div className="flex justify-between items-center gap-2">
        <FileText className="text-[#E4E5E8]" size={40} />
        <div className="flex flex-col gap-1">
          <h5 className="text-[#767F8C] text-sm">Esther Howard</h5>
          <h5 className="text-[#18191C] text-sm font-medium">PDF</h5>
        </div>
        </div>
        <button className="bg-[#E7F0FA] hover:bg-[#0A65CC] hover:text-white p-3 rounded-sm"><Download size={20}/></button>
        </div>
      </Card>

</div>
<div className="mt-2">
  <div className="p-4 border rounded-xl duration-300 hover:shadow-md">
    <h3 className="px-3 pb-2">Contact Information</h3>
    <div className="flex gap-5 border-b pb-4 px-6 items-center">
    <MapPin className="text-blue-500"/>
      <div>
        <p className="text-sm">Website</p>
        <p className="text-sm font-medium">www.estherhoward.com</p>
      </div>
    </div>
    
    <div className="border-b pb-3">
    <div className="flex justify-center gap-5 px-4 items-center">
    <MapPin className="text-blue-500"/>
      <div>
        <p className="text-sm">Location</p>
        <p className="text-sm font-medium">Beverly Hills, California 90202</p>
      </div>
    </div>
    <p className="text-wrap px-6 py-1 text-[#5E6670] text-sm">Zone/Block Basement 1 Unit B2, 1372 <br /> Spring Avenue, Portland, </p>
    </div>

    <div className=" pt-3 ">
    <div className="flex gap-4 px-7 items-start">
    <Phone className="text-blue-500"/>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-medium">+1-202-555-0141</p>
        <p className="text-sm font-medium text-[#767F8C] pt-1">Secondary Phone</p>
        <p className="text-sm font-medium">+1-202-555-0189</p>
      </div>
    </div>
    
    </div>
  </div>
</div>
</div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(!open)} className="bg-white hover:bg-gray-200 w-5 h-5 flex justify-center items-center text-xl cursor-pointer text-black rounded-full p-5">X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobPage;
