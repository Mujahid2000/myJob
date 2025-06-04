'use client';

import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import {
  useDeleteSaveProfileMutation,
  useGetSaveCandidateProfileQuery,
} from '@/RTKQuery/ShortListedApi';
import { MoveRight, Mail, Download, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { IoBookmarkSharp } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// Define the interface for a candidate
interface Candidate {
  _id: string;
  fullName: string;
  title: string;
  profilePicture: string;
}

const Page: React.FC = () => {
  const [localCandidates, setLocalCandidates] = useState<Candidate[]>([]);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const { data: userEmail, isLoading: userLoading } = useGetUserByIdQuery(
    currentUser?.email || '',
    { skip: !currentUser?.email }
  );

  const userId = userEmail?.user?._id || '';

  const {
    data: saveCandidate,
    isLoading: candidatesLoading,
    isFetching,
  } = useGetSaveCandidateProfileQuery(userId, { skip: !userId });

  const [deleteProfileSave, { isLoading: deleteLoading }] =
    useDeleteSaveProfileMutation();

  useEffect(() => {
    const fetchedCandidates = Array.isArray(saveCandidate?.data)
      ? saveCandidate.data
      : [];
    setLocalCandidates(fetchedCandidates);
  }, [saveCandidate]);

  const handleSaveProfileDelete = async (id: string) => {
    try {
      const result = await deleteProfileSave(id).unwrap();
      if (result?.message === 'Saved candidate profile deleted successfully') {
        toast.success(result.message);
        setLocalCandidates((prev) =>
          prev.filter((candidate) => candidate._id !== id)
        );
      } else {
        toast.error(result?.message || 'Failed to delete candidate profile');
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        (error.status === 'FETCH_ERROR'
          ? 'Network error: Please check your connection'
          : 'Failed to delete candidate profile');
      toast.error(errorMessage);
      console.error('Delete profile error:', error);
    }
  };

  const handleSendEmail = (candidate: Candidate) => {
    toast.info(`Email feature coming soon for ${candidate.fullName}!`);
  };

  const handleDownloadCV = (candidate: Candidate) => {
    toast.info(`CV download feature coming soon for ${candidate.fullName}!`);
  };

  if (userLoading || candidatesLoading) {
    return <div className="text-center text-gray-600 p-6">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-900">Saved Candidates</h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-1">ℹ️</span>
          <p>All the candidates are visible until 24 March, 2021</p>
        </div>
      </div>

      {/* Candidate List */}
      {isFetching ? (
        <div className="text-center text-gray-600 p-6">
          Updating candidates...
        </div>
      ) : localCandidates.length > 0 ? (
        <div className="space-y-4">
          {localCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${
                deleteLoading ? 'opacity-50' : ''
              }`}
            >
              {/* Candidate Info */}
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-full"
                  src={candidate.profilePicture}
                  width={48}
                  height={48}
                  alt={`${candidate.fullName}'s profile`}
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {candidate.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">{candidate.title}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-start sm:justify-end">
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
                    <IoBookmarkSharp fill="#0A65CC" size={20} />
                  )}
                </button>

                <Link href={`/company-dashboard/saved-candidates/${candidate._id}`}>
                  <p className="flex gap-2 bg-[#0A65CC] px-4 py-2 items-center text-white text-sm rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap">
                    View Profile <MoveRight size={16} />
                  </p>
                </Link>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                      title="More options"
                      aria-label="More options"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => handleSendEmail(candidate)}
                      className="flex items-center gap-2 text-gray-800 hover:text-blue-700 cursor-pointer"
                    >
                      <Mail size={16} className="text-blue-500" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDownloadCV(candidate)}
                      className="flex items-center gap-2 text-gray-800 hover:text-blue-700 cursor-pointer"
                    >
                      <Download size={16} className="text-blue-500" />
                      Download CV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </div>
  );
};

export default Page;
