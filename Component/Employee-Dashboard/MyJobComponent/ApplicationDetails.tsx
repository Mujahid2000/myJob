'use client';

import { Button } from '@/components/ui/button';
import { Download, PenLine, Trash2 } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import ApplicantDetailsModal from './ApplicantDetailsModal';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetJobPostApplicantListByJobIdQuery } from '@/RTKQuery/JobApplyApiSlice';
import { useGetShortListedDataQuery } from '@/RTKQuery/ShortListedApi';
import Link from 'next/link';
import ApplicantShortlistDetailsModal from './ApplicantShortlistDetailsModal';

// Define the interface for an applicant
interface Applicant {
  _id: string;
  fullName: string;
  title: string;
  experience: string;
  education: string;
  date: string;
  resumeLink: string;
  userId: string;
  resume_Id: string;
  profilePicture?: string;
  companyName:string,
  // applicantId is optional if not always present in allApplicants
  applicantId?: string;
}

interface SortApplicant {
  _id: string;
  fullName: string;
  title: string;
  experience: string;
  education: string;
  date: string;
  resumeLink: string;
  userId: string;
  resume_Id: string;
  profilePicture?: string;
  applicantId: string;
  companyName: string
}

// Define the interface for the modal state
interface Modal {
  modalValue: boolean;
  userId: string;
  resume_Id: string;
  jobId: string;
  companyName?: string;
  title: string
}

const ApplicationDetails = ({ jobId }: { jobId: string }) => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('Newest');
  const [applicantDetails, setApplicantDetails] = useState<Modal>({
    modalValue: false,
    userId: '',
    resume_Id: '',
    jobId: '',
    companyName: '',
    title: ''

  });
  const [sortedApplicantDetails, setSortedApplicantDetails] = useState<Modal>({
    modalValue: false,
    userId: '',
    resume_Id: '',
    jobId: '',
    companyName: "",
    title: ''

  });
  const [shortlistedData, setShortlistedData] = useState<SortApplicant[]>([]);

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, isLoading: userLoading, error: userEmailError } = useGetUserByIdQuery(
    currentUser?.email || '',
    { skip: !currentUser?.email }
  );
  const userId = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';
  const { data: jobApplicantsList, isLoading: applicantsLoading, isError: applicantsError } =
    useGetJobPostApplicantListByJobIdQuery(jobId);
  const allApplicants = jobApplicantsList?.data || [];

  const {
    data: shortlistedApplicants,
    isLoading: shortLoading,
    isError: shortError,
    refetch,
  } = useGetShortListedDataQuery(jobId, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    if (shortlistedApplicants?.data) {
      setShortlistedData(
        shortlistedApplicants.data.map((item: any) => ({
          _id: item._id,
          fullName: item.fullName,
          title: item.title,
          experience: item.experience,
          education: item.education,
          date: item.date || '',
          resumeLink: item.resumeLink,
          userId: item.userId,
          resume_Id: item.resume_Id,
          profilePicture: item.profilePicture,
          applicantId: item.applicantId || '',
          companyName: item.companyName || ''
        }))
      );
    }
  }, [shortlistedApplicants]);

  const sortApplicants = (applicants: Applicant[]): SortApplicant[] => {
    return applicants
      .map((applicant) => ({
        ...applicant,
        applicantId: applicant.applicantId || '', // Provide fallback if applicantId is missing
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOption === 'Newest' ? dateB - dateA : dateA - dateB;
      });
  };

  const toggleSortDropdown = (): void => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option: string): void => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const handleApplicationDetails = ({ userId, resume_Id, companyName,jobTItle }: { userId: string; resume_Id: string, companyName:string,jobTItle:string }) => {
    setSortedApplicantDetails((prev) => ({ ...prev, modalValue: false }));
    setApplicantDetails({
      modalValue: true,
      userId,
      resume_Id,
      jobId,
      companyName,
      title: jobTItle
    });
  };

  const handleSortedApplicationDetails = ({ userId, resume_Id,jobTItle }: { userId: string; resume_Id: string,jobTItle:string }) => {
    setApplicantDetails((prev) => ({ ...prev, modalValue: false }));
    setSortedApplicantDetails({
      modalValue: true,
      userId,
      resume_Id,
      jobId,
      title: jobTItle
    });
  };

  const closeModal = () => {
    setApplicantDetails((prev) => ({
      ...prev,
      modalValue: false,
    }));
  };

  const closeShortModal = () => {
    setSortedApplicantDetails((prev) => ({
      ...prev,
      modalValue: false,
    }));
  };

  if (userLoading || applicantsLoading || shortLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (userEmailError || applicantsError || shortError) {
    return <div className="text-center text-red-500">Error loading data</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="text-sm text-gray-500 mb-4">Home / Job / Senior UI/UX Designer / Applications</div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Job Applications</h2>
        </div>
        <div className="flex space-x-3">
          <button className="rounded-md px-4 py-1.5 text-base text-gray-600 hover:bg-gray-100">Filter</button>
          <div className="relative">
            <Button
              onClick={toggleSortDropdown}
              className="bg-[#0A65CC] text-white hover:bg-gray-100 hover:text-[#0A65CC] px-4 py-1.5 text-sm"
            >
              Sort
            </Button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3">
                  <h4 className="text-xs font-medium text-gray-600 mb-2">SORT APPLICATION</h4>
                  <label className="flex items-center mb-2 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOption === 'Newest'}
                      onChange={() => handleSortSelect('Newest')}
                      className="mr-2"
                    />
                    Newest
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOption === 'Oldest'}
                      onChange={() => handleSortSelect('Oldest')}
                      className="mr-2"
                    />
                    Oldest
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="rounded-lg bg-[#F8FAFC] p-5 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">All Applications ({allApplicants?.length || 0})</h3>
            <button className="text-blue-600 text-sm hover:underline">
              <BsThreeDots />
            </button>
          </div>
          {allApplicants?.length > 0 ? (
            sortApplicants(allApplicants as Applicant[]).map((applicant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md px-4 py-3 mb-4">
                <div
                  title="click here"
                  onClick={() =>
                    handleApplicationDetails({ userId: applicant.userId, resume_Id: applicant.resume_Id, companyName: applicant.companyName, jobTItle: applicant.title })
                  }
                  className="flex justify-start border-b pb-4 items-center gap-5 cursor-pointer"
                >
                  <img
                    src={
                      applicant.profilePicture ||
                      'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png'
                    }
                    alt={applicant.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{applicant.fullName}</h3>
                    <p className="text-sm text-gray-600">{applicant.title}</p>
                  </div>
                </div>
                <ul className="py-2 text-[#5E6670] px-5 list-disc flex flex-col gap-1">
                  <li>Experience: {applicant.experience}</li>
                  <li>Education: {applicant.education}</li>
                  <li>Applied: {applicant.date}</li>
                </ul>
                <Link href={applicant.resumeLink} target="_blank">
                  <button className="hover:bg-gray-100 px-2 py-1 rounded-lg flex gap-2 items-center text-[#0A65CC] font-bold cursor-pointer">
                    <Download /> Download CV
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No applicants found</p>
          )}
        </div>
        <div className="rounded-lg bg-[#F8FAFC] p-5 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Shortlisted ({shortlistedData?.length || 0})</h3>
            <button className="text-blue-600 text-sm hover:underline">
              <BsThreeDots />
            </button>
          </div>
          {shortlistedData?.length > 0 ? (
            sortApplicants(shortlistedData).map((applicant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md px-4 py-3 mb-4">
                <div
                  title="click here"
                  onClick={() =>
                    handleSortedApplicationDetails({ userId: applicant.applicantId, resume_Id: applicant.resume_Id, jobTItle:applicant.title })
                  }
                  className="flex justify-start border-b pb-4 items-center gap-5 cursor-pointer"
                >
                  <img
                    src={
                      applicant.profilePicture ||
                      'https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png'
                    }
                    alt={applicant.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{applicant.fullName}</h3>
                    <p className="text-sm text-gray-600">{applicant.title}</p>
                  </div>
                </div>
                <ul className="py-2 text-[#5E6670] px-5 list-disc flex flex-col gap-1">
                  <li>Experience: {applicant.experience}</li>
                  <li>Education: {applicant.education}</li>
                  <li>Applied: {applicant.date}</li>
                </ul>
                <Link href={applicant.resumeLink} target="_blank">
                  <button className="hover:bg-gray-100 px-2 py-1 rounded-lg flex gap-2 items-center text-[#0A65CC] font-bold cursor-pointer">
                    <Download /> Download CV
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No shortlisted applicants found</p>
          )}
        </div>
      </div>
      <ApplicantDetailsModal
        newopen={applicantDetails.modalValue}
        setnewopen={closeModal}
        userId={applicantDetails.userId}
        resume_Id={applicantDetails.resume_Id}
        jobId={applicantDetails.jobId}
        companyname={applicantDetails.companyName}
        jobTitle={applicantDetails.title}
      />
      <ApplicantShortlistDetailsModal
        newopen={sortedApplicantDetails.modalValue}
        setnewopen={closeShortModal}
        userId={sortedApplicantDetails.userId}
        resume_Id={sortedApplicantDetails.resume_Id}
        jobId={sortedApplicantDetails.jobId}
        companyname={sortedApplicantDetails.companyName}
        jobTitle={sortedApplicantDetails.title}
      />
    </div>
  );
};

export default ApplicationDetails;