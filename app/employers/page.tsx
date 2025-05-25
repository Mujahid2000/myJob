

import { PaginationDemo } from "@/Component/employee-Component/Pagination";
import FilteringSide from "@/Component/employee-Component/FilteringSide";
import SideBar from "@/Component/employee-Component/SideBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


import {
  Bookmark, 
  CalendarMinus2,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";



interface PageProps {
  viewMode?: string;
  location?: string;
  category?: string;
  jobRole?: string;
  companyName?: string;
  organizationType?: string,
  jobTitle?: string,
  tags?: string[]
}

export interface JobItem {
  _id: string;
  title: string;
  tags: string[];
  location: string;
  jobRole: string;
  postedDate: string; // You can change to `Date` if you parse it
  companyName: string;
  totalUpcomingCount: number;
  logo: string;
  organizationType: string
  userId: string
}

export interface JobApiResponse {
  message: string;
  data: JobItem[];
}


const page = async ({ searchParams = {} }: { searchParams?: PageProps }) => { //Type '{}' is missing the following properties from type 'PageProps': companyName, organizationType, jobTitle, tagsts(2739)
  const viewMode = searchParams.viewMode || "grid";
  const data = await fetch('http://localhost:5000/jobs/getCompanyData');
  const jobListings: JobApiResponse = await data.json();
  const companyList = jobListings.data


  // Filter client-side for now (later move to API)
const filteredJobs = companyList.filter((job) => {
  const lower = {
    jobTitle: searchParams.jobTitle?.toLowerCase(),
    jobRole: searchParams.jobRole?.toLowerCase(),
    location: searchParams.location?.toLowerCase(),
    organizationType: searchParams.organizationType?.toLowerCase(),
  };

  // Title, Company, Tags filtering using jobTitle
  const matchesJobTitle = lower.jobTitle
    ? job.title.toLowerCase().includes(lower.jobTitle) ||
      job.companyName.toLowerCase().includes(lower.jobTitle) ||
      job.tags?.some((tag) => tag.toLowerCase().includes(lower.jobTitle!))
    : true;

  // Job Role fuzzy search on title, company, tags
  const matchesCategory = searchParams.category
      ? job.jobRole.toLowerCase().includes(searchParams.category.toLowerCase())
      : true;

  const matchesLocation = lower.location
    ? job.location?.toLowerCase().includes(lower.location)
    : true;

  const matchesOrgType = lower.organizationType
    ? job.organizationType?.toLowerCase().includes(lower.organizationType)
    : true;

  return (
    matchesJobTitle &&
    matchesCategory &&
    matchesLocation &&
    matchesOrgType
  );
});



  return (
    // Main container for the Find Job page
    <div className="pt-29 ">
      <FilteringSide/>
      {/* Job listings and filters */}
      <div className="max-w-7xl mx-auto flex gap-5">
        {/* Filter section */}
        <SideBar/>
        {/* Job listings section */}
        <div className="flex-2">
          {viewMode == "list" ? (
           <div className={`grid grid-cols-2 gap-4`}>
              {filteredJobs.map((job) => (
                <Link href={`/employers/${job._id}`} key={job._id}>
                  <Card className=" border hover:shadow-lg transition">
                    <CardContent className={`flex flex-col gap-3 p-4`}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={job?.logo}
                          alt={job?.companyName}
                          width={55}
                          height={55}
                          className="rounded-md"
                        />
                        <div>
                          <div className="flex gap-3">
                            <h4 className="font-semibold text-[1rem]">
                              {job?.companyName}
                            </h4>
                           
                              <span className="bg-[#FFE0E0] text-[#FF4F4F] px-2 py-1 rounded">
                                Featured
                              </span>
                           
                          </div>
                          <div className="flex gap-1 items-center">
                            <MapPin className="w-4" />
                            <p className="text-[0.875rem] text-gray-400">
                              {job?.location}
                            </p>
                          </div>
                          <p></p>
                        </div>
                      </div>

                      <h3 className="text-blue-600 font-semibold cursor-pointer text-[1.15rem]">
                       jlkwdjvawv
                      </h3>
                      <p className="text-gray-500">
                        {job?.jobRole} • $100-200/month
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div> 
          ) : (
            
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs?.map((job) => (
                <Card
                  key={job._id}
                  className={`border  hover:hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white}`}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    {/* Left Section: Logo & Job Info */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={job?.logo}
                        alt={job?.companyName}
                        width={55}
                        height={55}
                        className="rounded-md"
                      />

                      <div>
                        <div className="flex gap-3 ">
                          <h3 className="font-semibold text-[#18191C] text-lg">
                           {job.companyName}
                          </h3>
                          
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{job?.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                          <CalendarMinus2 size={16} />
                            <span>{job.totalUpcomingCount} - open Job</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Bookmark & Apply Button */}
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" className="cursor-pointer">
                        <Bookmark />
                      </Button>
                      <Link href={`/employers/${job.userId}`}>
                        <Button className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm">
                          Open Position →
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

export default page;
