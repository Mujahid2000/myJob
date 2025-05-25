'use client';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useDeleteSaveProfileMutation, useGetSaveCandidateProfileQuery } from '@/RTKQuery/ShortListedApi';
import {  MoveRight, Mail, Download, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';
import { IoBookmarkSharp } from "react-icons/io5";

// Define the interface for a candidate
interface Candidate {
  _id: string;
  fullName: string;
  title: string;
  profilePicture: string;
}

const Page: React.FC = () => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [localCandidates, setLocalCandidates] = useState<Candidate[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, isLoading: userLoading } = useGetUserByIdQuery(
    currentUser?.email || '',
    { skip: !currentUser?.email }
  );
  const userId = userEmail?.user?._id || '';

  // Fetch saved candidates
  const { data: saveCandidate, isLoading: candidatesLoading, isFetching } = useGetSaveCandidateProfileQuery(
    userId,
    { skip: !userId }
  );

  const [deleteProfileSave, { isLoading: deleteLoading }] = useDeleteSaveProfileMutation();

  // Sync localCandidates with server data
  useEffect(() => {
    console.log('saveCandidate:', saveCandidate);
    const fetchedCandidates = Array.isArray(saveCandidate?.data) ? saveCandidate.data : [];
    console.log('Fetched Candidates:', fetchedCandidates);
    setLocalCandidates(fetchedCandidates);
  }, [saveCandidate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log('Closing dropdown due to outside click');
        setDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown for a specific candidate
  const toggleDropdown = (index: number): void => {
    console.log(`Toggling dropdown for index: ${index}, current: ${dropdownIndex}`);
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // Handle profile deletion
  const handleSaveProfileDelete = async (id: string) => {
    try {
      const result = await deleteProfileSave(id).unwrap();
      console.log('Delete result:', result);
      if (result?.message === 'Saved candidate profile deleted successfully') {
        toast.success(result.message);
        setLocalCandidates((prev) => prev.filter((candidate) => candidate._id !== id));
      } else {
        toast.error(result?.message || 'Failed to delete candidate profile');
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        (error.status === 'FETCH_ERROR' ? 'Network error: Please check your connection' : 'Failed to delete candidate profile');
      toast.error(errorMessage);
      console.error('Delete profile error:', error);
    }
  };

  // Handle dropdown actions
  const handleSendEmail = (candidate: Candidate) => {
    console.log(`Sending email to ${candidate.fullName}`);
    toast.info(`Email feature coming soon for ${candidate.fullName}!`);
    setDropdownIndex(null);
  };

  const handleDownloadCV = (candidate: Candidate) => {
    console.log(`Downloading CV for ${candidate.fullName}`);
    toast.info(`CV download feature coming soon for ${candidate.fullName}!`);
    setDropdownIndex(null);
  };

  // Render the dropdown menu
  const renderDropdown = (candidate: Candidate, index: number) => (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-40 bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-xl shadow-2xl z-30 animate-dropdown"
    >
      <div className="">
        <button
          onClick={() => handleSendEmail(candidate)}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-all duration-150 ease-in-out rounded-t-xl group"
          aria-label={`Send email to ${candidate.fullName}`}
        >
          <Mail size={18} className="mr-3 text-blue-500 group-hover:text-blue-700 transition-colors" />
          Send Email
        </button>
        <button
          onClick={() => handleDownloadCV(candidate)}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-all duration-150 ease-in-out rounded-b-xl group"
          aria-label={`Download CV for ${candidate.fullName}`}
        >
          <Download size={18} className="mr-3 text-blue-500 group-hover:text-blue-700 transition-colors" />
          Download CV
        </button>
      </div>
    </div>
  );

  // Handle loading and empty states
  if (userLoading || candidatesLoading) {
    return <div className="text-center text-gray-600 p-6">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Candidates</h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-1">ℹ️</span>
          <p>All the candidates are visible until 24 March, 2021</p>
        </div>
      </div>

      {/* Candidate List */}
      {isFetching ? (
        <div className="text-center text-gray-600 p-6">Updating candidates...</div>
      ) : localCandidates.length > 0 ? (
        <div className="space-y-4">
          {localCandidates.map((candidate, index) => (
            <div
              key={candidate._id}
              className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${deleteLoading ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-full"
                  src={candidate.profilePicture}
                  width={48}
                  height={48}
                  alt={`${candidate.fullName}'s profile`}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{candidate.fullName}</h3>
                  <p className="text-sm text-gray-600">{candidate.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 relative min-w-[180px]">
                <button
                  onClick={() => handleSaveProfileDelete(candidate._id)}
                  className="p-2 cursor-pointer rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                  disabled={deleteLoading}
                  title="Delete saved profile"
                  aria-label="Delete saved profile"
                >
                  {deleteLoading ? (
                    <span className="animate-spin text-xl">⏳</span>
                  ) : (
                    <IoBookmarkSharp fill='#0A65CC' size={20} />
                  )}
                </button>

                <Link href={`/company-dashboard/saved-candidates/${candidate._id}`}>
                <button className="flex gap-2 bg-[#0A65CC] px-4 py-2 cursor-pointer items-center text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  View Profile <MoveRight size={16} />
                </button>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    title="More options"
                    aria-label="More options"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {dropdownIndex === index && renderDropdown(candidate, index)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 p-6">
          No saved candidates found. Save some profiles to see them here!
        </div>
      )}
      <Toaster richColors />
      <style jsx>{`
        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Page;