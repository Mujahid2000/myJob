
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Calendar, DollarSign, Grid, List, MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookMarkButton from "./BookMarkButton";

interface JobListing {
  _id: string;
  userId: string;
  companyId: string;
  companyName: string;
  tags: string[];
  jobRole: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  education: string;
  experience: string;
  jobType: string;
  expireDate: string;
  vacancy: string;
  jobLevel: string;
  description: string;
  responsibilities: string;
  location: string;
  status: string;
  title: string;
  promotedSystem?: string | null;
  logo?: string | null;
}

interface SearchParams {
  viewMode?: string;
  location?: string;
  salary?: string;
  experience?: string;
  education?: string;
  jobLevel?: string;
  jobType?: string;
  category?: string;
  jobRole?: string;
  page?: string;
}

// Utility function to parse salary range
const parseSalaryRange = (salary: string | undefined): { minSalary: number | null; maxSalary: number | null } => {
  if (!salary || !salary.includes("-")) {
    return { minSalary: null, maxSalary: null };
  }
  const [min, max] = salary.split("-").map((s) => parseFloat(s.replace(/\$/g, "").trim()));
  return { minSalary: isNaN(min) ? null : min, maxSalary: isNaN(max) ? null : max };
};

// Utility function to filter job listings
const filterJobListings = (jobListings: JobListing[], params: SearchParams): JobListing[] => {
  return jobListings.filter((job) => {
    const { minSalary: minSalaryParam, maxSalary: maxSalaryParam } = parseSalaryRange(params.salary);

    const matchesLocation = params.location
      ? job.location.toLowerCase().includes(params.location.toLowerCase())
      : true;

    const matchesSalary =
      minSalaryParam !== null && maxSalaryParam !== null
        ? job.minSalary >= minSalaryParam && job.maxSalary <= maxSalaryParam
        : true;

    const matchesExperience = params.experience
      ? job.experience.toLowerCase().includes(params.experience.replace("Years", "").trim().toLowerCase())
      : true;

    const matchesEducation = params.education
      ? params.education.split(",").some((edu) => job.education.toLowerCase().includes(edu.toLowerCase()))
      : true;

    const matchesJobLevel = params.jobLevel
      ? job.jobLevel.toLowerCase().includes(params.jobLevel.toLowerCase())
      : true;

    const matchesJobType = params.jobType
      ? params.jobType.split(",").some((type) => job.jobType.toLowerCase().includes(type.toLowerCase()))
      : true;

    const matchesCategory = params.category
      ? job.jobRole.toLowerCase().includes(params.category.toLowerCase())
      : true;

    const matchesJobRole = params.jobRole
      ? job.title.toLowerCase().includes(params.jobRole.toLowerCase())
      : true;

   // Replace both matchesJobRole and matchTags with a combined OR logic
const matchesJobTitleOrTags = params.jobRole
? (job.title.toLowerCase().includes(params.jobRole.toLowerCase()) ||
   (Array.isArray(job.tags) &&
    job.tags.some((tag) =>
      typeof tag === "string" &&
      tag.toLowerCase().includes(params.jobRole!.toLowerCase())
    )))
: true;


    return (
      matchesLocation &&
      matchesSalary &&
      matchesExperience &&
      matchesEducation &&
      matchesJobLevel &&
      matchesJobType &&
      matchesCategory &&
      matchesJobTitleOrTags
    );
  });
};

// Utility function to generate query string
const generateQueryString = (params: SearchParams): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });
  return query.toString();
};

export default async function JobListings({ searchParams = {} }: { searchParams?: SearchParams }) {
  const viewMode = searchParams.viewMode || "grid";
  const page = parseInt(searchParams.page || "1");
  const itemsPerPage = 12; // Default items per page

  // Fetch job listings
  let jobListings: JobListing[] = [];
  try {
    const res = await fetch("https://job-server-497l.vercel.app/jobs/getAllPostedData", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();
    jobListings = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="max-w-7xl mx-auto py-10 text-center text-red-500">
        Error loading job listings. Please try again later.
      </div>
    );
  }

  // Apply filters
  const filteredJobs = filterJobListings(jobListings, searchParams);

  // Pagination logic
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Active filters for badges
  const activeFilters = Object.entries(searchParams)
    .filter(([key, value]) => value && key !== "viewMode" && key !== "page")
    .map(([key, value]) => ({
      key,
      value: key === "education" || key === "jobType" ? value.split(",").join(", ") : value,
    }));


 
  return (
    <div className="max-w-7xl mx-auto py-7">
      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 flex-wrap">
          {activeFilters.map(({ key, value }) => {
            const updatedParams = { ...searchParams, [key]: "" };
            const queryString = generateQueryString(updatedParams);
            return (
              <Badge key={key} variant="outline" className="cursor-pointer px-3 py-1">
                {value}
                <Link href={`/find-job${queryString ? `?${queryString}` : ""}`}>
                  <X className="ml-2 h-4 w-4" />
                </Link>
              </Badge>
            );
          })}
          {activeFilters.length > 0 && (
            <Link href="/find-job">
              <Button variant="ghost" className="text-sm">
                Clear All
              </Button>
            </Link>
          )}
        </div>

        <div className="flex gap-4">
          <Select defaultValue="latest">
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

          <Select defaultValue="12">
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

          <Link href={`/find-job?${generateQueryString({ ...searchParams, viewMode: "grid" })}`}>
            <Button className={`cursor-pointer ${viewMode === "grid" ? "bg-gray-200" : ""}`} variant="ghost">
              <Grid size={20} />
            </Button>
          </Link>
          <Link href={`/find-job?${generateQueryString({ ...searchParams, viewMode: "list" })}`}>
            <Button className={`cursor-pointer ${viewMode === "list" ? "bg-gray-200" : ""}`} variant="ghost">
              <List size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Job Listings */}
      {paginatedJobs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No job listings found matching your criteria.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedJobs.map((job) => (
            <Link href={`/find-job/${job._id}`} key={job._id}>
              <Card className="border cursor-pointer hover:shadow-lg transition">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={job.logo || "/default-logo.png"}
                      alt={job.companyName || "Company Logo"}
                      width={55}
                      height={55}
                      className="rounded-md"
                    />
                    <div>
                      <div className="flex gap-3 items-center">
                        <h4 className="font-semibold text-[1rem]">{job.companyName}</h4>
                        {job.promotedSystem && (
                          <Badge variant="destructive" className="bg-[#FFE0E0] text-[#FF4F4F]">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 items-center">
                        <MapPin className="w-4" />
                        <p className="text-[0.875rem] text-gray-400">{job.location}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-blue-600 Dumbledore-semibold cursor-pointer text-[1.15rem]">
                    {job.title}
                  </h3>
                  <p className="text-gray-500">
                    {job.jobType} • ${job.minSalary} - ${job.maxSalary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {paginatedJobs.map((job) => (
            <Card
              key={job._id}
              className="border cursor-pointer hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={job.logo || "/default-logo.png"}
                    alt={job.jobRole}
                    width={55}
                    height={55}
                    className="rounded-md"
                  />
                  <div>
                    <div className="flex gap-3 items-center">
                      <h3 className="Dumbledore-semibold text-[#18191C] text-lg">{job.title}</h3>
                      <div className="flex gap-2">
                        {job.promotedSystem && (
                          <Badge variant="destructive" className="bg-red-100 text-red-600">
                            Featured
                          </Badge>
                        )}
                        {job.jobType && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                            {job.jobType}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex text-[#5E6670] items-center gap-1">
                        <DollarSign size={16} />
                        <span>${job.minSalary} - ${job.maxSalary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>
                          {job.expireDate
                            ? `${Math.max(
                                0,
                                Math.ceil(
                                  (new Date(job.expireDate).getTime() - new Date().getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              )} Days Remaining`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Bookmark button */}
                  <BookMarkButton jobData={job} />


                  <Link href={`/find-job/${job._id}`}>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="py-9">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/find-job?${generateQueryString({ ...searchParams, page: String(page - 1) })}`}
                className={`text-[#0A65CC] ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`/find-job?${generateQueryString({ ...searchParams, page: String(i + 1) })}`}
                  isActive={page === i + 1}
                  className={`text-[#0A65CC] ${page === i + 1 ? "bg-[#0A65CC] text-white" : ""}`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/find-job?${generateQueryString({ ...searchParams, page: String(page + 1) })}`}
                className={`text-[#0A65CC] ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
