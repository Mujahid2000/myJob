"use client";
import { useState } from "react";
import { X, MapPin, Clock, DollarSign, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPositionModal } from "@/Store/profileSlice";
import { RootState } from "@/Store/Store";
import Image from "next/image";

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
}

interface JobPositionsModalProps {
  userId: string;
  companyName: string;
  companyLogo: string;
  companyIndustry: string;
}

export default function OpenJobPositionsModal({ userId, companyName, companyLogo, companyIndustry }: JobPositionsModalProps) {
  const openPositions: JobPosition[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      posted: "2 days ago",
      description: "We're looking for a Senior Frontend Developer to join our growing engineering team...",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $170,000",
      posted: "1 week ago",
      description: "Join our product team to help shape the future of our platform...",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "3 days ago",
      description: "We're seeking a talented UX/UI Designer to create exceptional user experiences...",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      posted: "5 days ago",
      description: "Help us scale our infrastructure and improve our deployment processes...",
    },
  ];

  const dispatch = useDispatch();
  const { positionOpenModal } = useSelector((state: RootState) => state.profile);
  const [isClosing, setIsClosing] = useState(false);

  // Handle modal close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(setOpenPositionModal(false));
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  return (
    <>
      {positionOpenModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 pt-4 pb-4 sm:pb-20">
            {/* Background overlay */}
            <div
              className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 ease-out ${
                isClosing ? "opacity-0" : "opacity-50"
              }`}
              onClick={handleClose}
            ></div>

            {/* Modal panel */}
            <div
              className={`inline-block w-full max-w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-3 sm:p-6 my-4 sm:my-8 overflow-hidden text-left align-middle transition-all duration-300 ease-out transform bg-white shadow-2xl rounded-lg sm:rounded-2xl ${
                isClosing ? "scale-95 opacity-0 translate-y-4" : "scale-100 opacity-100 translate-y-0"
              }`}
            >
              {/* Modal header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                    {companyLogo ? (
                      <Image
                        src={companyLogo}
                        alt={`${companyName} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                        onError={(e) => (e.currentTarget.src = "/default-logo.png")} // Fallback image
                      />
                    ) : (
                      <Instagram className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Open Positions at {companyName}</h3>
                    <p className="text-sm sm:text-base text-gray-600 truncate">{companyIndustry || "Industry not specified"}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="self-end cursor-pointer sm:self-auto p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Job listings */}
              <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                {openPositions.length > 0 ? (
                  openPositions.map((position, index) => (
                    <div
                      key={position.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                      style={{
                        animation: isClosing ? "none" : `slideInFromLeft 0.4s ease-out ${0.3 + index * 0.1}s both`,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 truncate">{position.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 whitespace-nowrap">
                              {position.department}
                            </span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate max-w-[150px] sm:max-w-none">{position.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="whitespace-nowrap">{position.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600 mb-2 sm:mb-3">
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate max-w-[150px] sm:max-w-none">{position.salary}</span>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right space-x-3 sm:space-x-0">
                          <p className="text-xs sm:text-sm text-gray-500 mb-0 sm:mb-2 whitespace-nowrap">Posted {position.posted}</p>
                          <Button className="bg-[#084899] cursor-pointer hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{position.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm text-center">No open positions available.</p>
                )}
              </div>

              {/* Modal footer */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                    Showing {openPositions.length} open positions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations and scrollbar */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
}