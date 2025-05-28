'use client';
import { Bookmark, MapPin } from 'lucide-react';
import React from 'react';
import './feature.css';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import './BookmarkButtonstyle.css';

const FeaturedJobs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="flex flex-row md:items-center justify-between py-4">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#191F33]">
          Featured Jobs
        </h1>
        <Button
          className="px-4 cursor-pointer py-2 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors text-sm sm:text-base"
        >
          View All →
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 lg:p-5 rounded-md my-4 hover:shadow-md border transition-shadow">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full sm:w-auto">
          <img
            src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-md object-cover"
            alt="Company logo"
          />
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#191F33]">
                Senior UX Designer
              </h3>
              <Badge className="bg-blue-100 text-[#0A65CC] text-xs sm:text-sm">
                Contract Base
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5 text-xs sm:text-sm lg:text-base">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>Australia</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <g clipPath="url(#clip0_1647_32339)">
                    <path
                      d="M11 2.0625V19.9375"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8125 7.5625C15.8125 7.11108 15.7236 6.66408 15.5508 6.24703C15.3781 5.82997 15.1249 5.45102 14.8057 5.13182C14.4865 4.81262 14.1075 4.55941 13.6905 4.38666C13.2734 4.21391 12.8264 4.125 12.375 4.125H9.28125C8.36957 4.125 7.49523 4.48716 6.85057 5.13182C6.20591 5.77648 5.84375 6.65082 5.84375 7.5625C5.84375 8.47418 6.20591 9.34852 6.85057 9.99318C7.49523 10.6378 8.36957 11 9.28125 11H13.0625C13.9742 11 14.8485 11.3622 15.4932 12.0068C16.1378 12.6515 16.5 13.5258 16.5 14.4375C16.5 15.3492 16.1378 16.2235 15.4932 16.8682C14.8485 17.5128 13.9742 17.875 13.0625 17.875H8.9375C8.02582 17.875 7.15148 17.5128 6.50682 16.8682C5.86216 16.2235 5.5 15.3492 5.5 14.4375"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1647_32339">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>30K-35K</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <g clipPath="url(#clip0_1647_32345)">
                    <path
                      d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.125 2.0625V4.8125"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.875 2.0625V4.8125"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.4375 7.5625H18.5625"
                      stroke="#C5C9D6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1647_32345">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>4 Days Remaining</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 pt-3 sm:pt-0">
          <button className="cursor-pointer text-blue-600 group p-1 hover:bg-blue-50 rounded-md transition-colors">
            <Bookmark className="bookmark-icon w-5 h-5 sm:w-6 sm:h-6 group-hover:fill-[#0A65CC] group-hover:text-[#0A65CC]" />
          </button>
          <button
            className="text-xs cursor-pointer sm:text-sm lg:text-base bg-[#0A65CC] text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-md hover:bg-gray-100 hover:text-[#0A65CC] font-medium transition-colors"
            name="Apply Now"
          >
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;