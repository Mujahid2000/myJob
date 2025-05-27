import { PaginationDemo } from '@/Component/employee-Component/Pagination';
import FilteringSide from '@/Component/employee-Component/FilteringSide';
import SideBar from '@/Component/employee-Component/SideBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, CalendarMinus2, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  viewMode?: string;
  location?: string;
  category?: string;
  jobRole?: string;
  companyName?: string;
  organizationType?: string;
  jobTitle?: string;
  tags?: string[];
  page?: string; // Add page for pagination
}

export interface JobApiResponse {
  message: string
  data: jobItem[]
}

export interface jobItem {
  _id: string
  userId: string
  title: string
  tags: string[]
  jobRole: string
  location?: string
  postedDate: string
  companyName?: string
  logo?: string
  organizationType?: string
  totalCompanyJobs: number
}


/**
 * Page component for displaying job listings with filtering and pagination.
 * @param searchParams - A promise that resolves to query parameters for filtering jobs.
 */
export default async function Page({ searchParams }: { searchParams: Promise<PageProps> }) {
  // Resolve searchParams
  let resolvedSearchParams: PageProps;
  try {
    resolvedSearchParams = await searchParams;
  } catch (error) {
    console.error('Error resolving searchParams:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error loading filters: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // Default values for searchParams
  const viewMode = resolvedSearchParams.viewMode || 'grid';
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Fetch job data
  let jobListings: JobApiResponse;
  try {
    const response = await fetch('https://job-server-497l.vercel.app/jobs/getCompanyData', {
      cache: 'no-store', // Disable caching for fresh data
    });
    if (!response.ok) {
      throw new Error('Failed to fetch job data');
    }
    jobListings = await response.json();
  } catch (error) {
    console.error('Error fetching job data:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error loading jobs: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  const companyList = jobListings.data || [];

  // Filter jobs based on searchParams
  const filteredJobs = companyList.filter((job) => {
    const lower = {
      jobTitle: resolvedSearchParams.jobTitle?.toLowerCase(),
      jobRole: resolvedSearchParams.jobRole?.toLowerCase(),
      location: resolvedSearchParams.location?.toLowerCase(),
      organizationType: resolvedSearchParams.organizationType?.toLowerCase(),
    };

    const matchesJobTitle = !lower.jobTitle
      ? true
      : job.title.toLowerCase().includes(lower.jobTitle) ||
        (job.companyName?.toLowerCase().includes(lower.jobTitle) ?? false) ||
        (job.tags?.some((tag) => tag.toLowerCase().includes(lower.jobTitle!)) ?? false);

    const matchesCategory = !resolvedSearchParams.category
      ? true
      : job.jobRole.toLowerCase().includes(resolvedSearchParams.category.toLowerCase());

    const matchesLocation = !lower.location
      ? true
      : job.location?.toLowerCase().includes(lower.location) ?? false;

    const matchesOrgType = !lower.organizationType
      ? true
      : job.organizationType?.toLowerCase().includes(lower.organizationType) ?? false;

    return matchesJobTitle && matchesCategory && matchesLocation && matchesOrgType;
  });

  // Pagination logic
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="pt-29 pb-5">
      <FilteringSide />
      {/* Job listings and filters */}
      <div className="max-w-7xl mx-auto flex gap-5">
        {/* Filter section */}
        <SideBar />
        {/* Job listings section */}
        <div className="flex-2">
          {viewMode === 'list' ? (
            <div className="grid grid-cols-2 gap-4">
              {paginatedJobs.map((job) => (
                <Link href={`/employers/${job.userId}`} key={job._id}>
                  <Card className="border hover:shadow-lg transition">
                    <CardContent className="flex flex-col gap-3 p-4">
                      <div className="flex items-center gap-3">
                       <img className='w-12 h-12' src={job.logo || 'https://via.placeholder.com/55'} alt="" />
                        <div>
                          <div className="flex gap-3">
                            <h4 className="font-semibold text-[1rem]">
                              {job.companyName}
                            </h4>
                            <span className="bg-[#FFE0E0] text-[#FF4F4F] px-2 py-1 rounded">
                              Featured
                            </span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <MapPin className="w-4" />
                            <p className="text-[0.875rem] text-gray-400">
                              {job.location || 'Unknown Location'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-blue-600 font-semibold cursor-pointer text-[1.15rem]">
                        {job.title || 'Untitled Job'}
                      </h3>
                      <p className="text-gray-500">
                        {job.jobRole} • $100-200/month
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
                  className="border hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white"
                >
                  <CardContent className="flex items-center justify-between p-6">
                    {/* Left Section: Logo & Job Info */}
                    <div className="flex items-center gap-4">
                      <img className='w-12 h-12' src={job.logo} alt={job.companyName}  />
                      <div>
                        <div className="flex gap-3">
                          <h3 className="font-semibold text-[#18191C] text-lg">
                            {job.companyName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{job.location || 'Unknown Location'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarMinus2 size={16} />
                            <span>{job.totalCompanyJobs} - open Job</span>
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
          {paginatedJobs.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No jobs found matching your criteria.
            </div>
          )}
        </div>
      </div>
      {/* Pagination section */}
      {
        paginatedJobs.length >= 12 ? <PaginationDemo currentPage={currentPage} totalPages={totalPages} /> : '' 
      }
      
    </div>
  );
}