import { PaginationDemo } from '@/Component/candidates-component/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, BriefcaseConveyorBelt, MapPin } from 'lucide-react';
import Image from 'next/image';
import HeaderSide from '@/Component/candidates-component/HeaderSide';
import Sidebar from '@/Component/candidates-component/Sidebar';
import OpenModalButton from '@/Component/candidates-component/OpenModalButton';
import CandidateModal from '@/Component/candidates-component/CandidateModal';

interface CandidateFilteringList {
  level: string;
  education: string | string[];
  gender: string;
  experience: string;
  jobTitle: string;
  location: string;
  category: string;
  itemsPerPage: number;
  sortBy: string;
}

export interface CandidateList {
  success: boolean;
  data: Candidate[];
}

export interface Candidate {
  _id: string;
  profilePicture: string;
  experience: string;
  fullName: string;
  title: string;
  education: string;
  gender: string;
  location?: string;
  level?: string;
  category?: string;
  createdAt?: string;
  popularityScore?: number;
}

export default async function FindJobPage({ searchParams }: { searchParams: Promise<CandidateFilteringList> }) {
  let resolvedSearchParams: CandidateFilteringList;

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

  let candidateData: Candidate[] = [];
  let errorMessage: string | null = null;
  let filteredCandidates: Candidate[] = [];
  let level: string | undefined = undefined;
  let category: string | undefined = undefined;
  let education: string | string[] | undefined = undefined;
  let experience: string | undefined = undefined;
  let gender: string | undefined = undefined;
  let itemsPerPage: number | undefined = undefined;
  let jobTitle: string | undefined = undefined;
  let location: string | undefined = undefined;
  let sortBy: string | undefined = undefined;

  // Fetch candidate data
  try {
    const response = await fetch(`https://serverjob.vercel.app/candidateJobApplyData/candidateList`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch job listings: ${response.statusText}`);
    }

    const candidateListings = await response.json();

    if (!candidateListings || typeof candidateListings !== 'object' || !candidateListings.success || !Array.isArray(candidateListings.data)) {
      throw new Error('Invalid response format from API');
    }

    candidateData = candidateListings.data || [];
    if (candidateData.length === 0) {
      errorMessage = 'No candidates found.';
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);
    errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while fetching candidates.';
  }

  // Filter candidates
  try {
    const params = await searchParams;
    // console.log('Resolved searchParams:', JSON.stringify(params, null, 2)); // Debug searchParams
    level = params.level;
    category = params.category;
    education = params.education;
    experience = params.experience;
    gender = params.gender;
    itemsPerPage = params.itemsPerPage;
    jobTitle = params.jobTitle;
    location = params.location;
    sortBy = params.sortBy;

    if (!errorMessage && candidateData.length > 0) {
      filteredCandidates = candidateData.filter((candidate: Candidate) => {
        let matches = true;

        // Filter by level
        if (level && candidate.level && candidate.level.toLowerCase() !== level.toLowerCase()) {
          matches = false;
        }

        // Filter by education
        if (education) {
          const educationArray = Array.isArray(education)
            ? education
            : typeof education === 'string' && education
            ? education.split(',').map(e => e.trim())
            : [];
          if (!educationArray.includes(candidate.education)) {
            matches = false;
          }
        }

        // Filter by gender
        if (gender && candidate.gender.toLowerCase() !== gender.toLowerCase()) {
          matches = false;
        }

        // Filter by jobTitle (matches either fullName or title)
        if (
          jobTitle &&
          !(candidate.fullName?.toLowerCase().includes(jobTitle.toLowerCase()) || candidate.title.toLowerCase().includes(jobTitle.toLowerCase()))
        ) {
          matches = false;
        }

        // Filter by experience
        if (experience && candidate.experience.toLowerCase() !== experience.toLowerCase()) {
          matches = false;
        }

        // Filter by location
        if (location && candidate.location && !candidate.location.toLowerCase().includes(location.toLowerCase())) {
          matches = false;
        }

        // Filter by category
        if (category && candidate.category && candidate.category.toLowerCase() !== category.toLowerCase()) {
          matches = false;
        }

        return matches;
      });

      // Sort candidates
      if (sortBy) {
        if (sortBy === 'latest' && filteredCandidates.every(c => c.createdAt)) {
          filteredCandidates.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        } else if (sortBy === 'popular' && filteredCandidates.every(c => typeof c.popularityScore === 'number')) {
          filteredCandidates.sort((a, b) => (b.popularityScore! - a.popularityScore!));
        }
      }

      if (filteredCandidates.length === 0) {
        errorMessage = 'No candidates match the selected filters.';
      }
    }
  } catch (error) {
    console.error('Error processing search params or filtering candidates:', error);
    errorMessage = 'An error occurred while filtering candidates.';
  }

  // Validate itemsPerPage for pagination
  const validatedItemsPerPage = itemsPerPage && !isNaN(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 10;


  return (
    <div className="pt-29 pb-5">
      <HeaderSide />

      <div className="max-w-7xl mx-auto flex gap-5">
        <Sidebar />

        <div className="flex-2">
          {errorMessage ? (
            <div className="text-red-500 text-center p-4">
              {errorMessage}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 px-3">
              {filteredCandidates.map((job) => (
                <Card key={job._id} className="border hover:bg-gradient-to-r hover:from-[#FFF6E6] hover:to-[#FFF] bg-white transition-all duration-200 hover:shadow-md">
      <CardContent className="">
        {/* Mobile Layout (< sm) */}
        <div className="sm:hidden">
          {/* Top Section: Profile Picture and Basic Info */}
          <div className="flex items-start gap-3 mb-4">
            <Image
              src={job.profilePicture || "/placeholder.svg"}
              alt={job.fullName}
              width={60}
              height={60}
              className="rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#18191C] text-base truncate">{job.fullName}</h3>
              <h4 className="text-sm text-gray-600 truncate">{job.title}</h4>
            </div>
            <Button variant="ghost" size="sm" className="cursor-pointer p-2 flex-shrink-0">
              <Bookmark size={16} />
            </Button>
          </div>

          {/* Middle Section: Location and Experience */}
          <div className="flex flex-col gap-2 text-gray-500 text-sm mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="truncate">{job.location || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-1">
              <BriefcaseConveyorBelt size={14} className="flex-shrink-0" />
              <span className="truncate">{job.experience || "Not specified"}</span>
            </div>
          </div>

          {/* Bottom Section: Action Button */}
          <div className="flex justify-end">
            <OpenModalButton candidateId={job._id} />
          </div>
        </div>

        {/* Tablet Layout (sm to lg) */}
        <div className="hidden sm:flex lg:hidden items-start justify-between gap-4">
          {/* Left Section: Profile Picture and Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <Image
              src={job.profilePicture || "/placeholder.svg"}
              alt={job.fullName}
              width={70}
              height={70}
              className="rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h3 className="font-semibold text-[#18191C] text-lg truncate">{job.fullName}</h3>
                <h4 className="text-sm text-gray-600 truncate">{job.title}</h4>
              </div>
              <div className="flex flex-col gap-1 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span className="truncate">{job.location || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BriefcaseConveyorBelt size={16} />
                  <span className="truncate">{job.experience || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button variant="ghost" className="cursor-pointer">
              <Bookmark size={16} />
            </Button>
            <OpenModalButton candidateId={job._id} />
          </div>
        </div>

        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-6">
          {/* Left Section: Profile Picture and Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Image
              src={job.profilePicture || "/placeholder.svg"}
              alt={job.fullName}
              width={75}
              height={75}
              className="rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h3 className="font-semibold text-[#18191C] text-lg">{job.fullName}</h3>
                <h4 className="text-sm text-gray-600">{job.title}</h4>
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{job.location || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BriefcaseConveyorBelt size={16} />
                  <span>{job.experience || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button variant="ghost" className="cursor-pointer">
              <Bookmark />
            </Button>
            <OpenModalButton candidateId={job._id} />
          </div>
        </div>
      </CardContent>
    </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredCandidates.length >= 12 && <PaginationDemo itemsPerPage={validatedItemsPerPage} candidates={filteredCandidates} />}
      <CandidateModal />
    </div>
  );
}