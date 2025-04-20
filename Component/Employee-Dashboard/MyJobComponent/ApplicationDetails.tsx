'use client'
import { Button } from '@/components/ui/button';
import { CirclePlus, Download, PenLine, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import AddColumnModal from './AddColumnModal';
import ApplicantDetailsModal from './ApplicantDetailsModal';

// Define the interface for an applicant
interface Applicant {
  name: string;
  role: string;
  experience: string;
  education: string;
  appliedDate: string;
}

// Define the interface for a custom column
interface CustomColumn {
  name: string;
  applicants: Applicant[];
}

// Sample data for applicants
const allApplicants: Applicant[] = [
  {
    name: 'Ronald Richards',
    role: 'UI/UX Designer',
    experience: '7 Years Experience',
    education: 'Master Degree',
    appliedDate: 'Jan 23, 2022',
  },
  {
    name: 'Theresa Webb',
    role: 'Product Designer',
    experience: '7 Years Experience',
    education: 'High School Degree',
    appliedDate: 'Jan 23, 2022',
  },
  {
    name: 'Devon Lane',
    role: 'UI/UX Designer',
    experience: '7 Years Experience',
    education: 'Master Degree',
    appliedDate: 'Jan 23, 2022',
  },
  {
    name: 'Kathryn Murphy',
    role: 'UI/UX Designer',
    experience: '7 Years Experience',
    education: 'Master Degree',
    appliedDate: 'Jan 23, 2022',
  },
];

const shortlistedApplicants: Applicant[] = [
  {
    name: 'Darre',
    role: 'UI/UX',
    experience: '7 Years Experience',
    education: 'Intermediate Degree',
    appliedDate: 'Jan 23, 2022',
  },
  {
    name: 'Jenny Wilson',
    role: 'UI Designer',
    experience: '7 Years Experience',
    education: 'Bachelor Degree',
    appliedDate: 'Jan 23, 2022',
  },
];

const ApplicationDetails: React.FC = () => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('Newest');
  const [editDelete, setEditDelete] = useState<boolean>(false);
  const [editDelete1, setEditDelete1] = useState<boolean>(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState<boolean>(false);
  const [customColumns, setCustomColumns] = useState<CustomColumn[]>([]);
  const [applicantDetails, setApplicationDetails] = useState<boolean>()
  // Toggle sort dropdown
  const toggleSortDropdown = (): void => {
    setIsSortOpen((prev) => !prev);
  };

  // Handle sort option selection
  const handleSortSelect = (option: string): void => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const handleThreeDots = (): void => {
    setEditDelete((prev) => !prev);
  };

  const handleThreeDots1 = (): void => {
    setEditDelete1((prev) => !prev);
  };

  const handleOpenAddColumnModal = (): void => {
    setIsAddColumnModalOpen(true);
  };

  const handleCloseAddColumnModal = (): void => {
    setIsAddColumnModalOpen(false);
  };

  const handleAddColumn = (columnName: string): void => {
    setCustomColumns([...customColumns, { name: columnName, applicants: [] }]);
  };

  const handleApplicationDetails =() =>{
    setApplicationDetails((prev) => !prev)
  }

  // Render the edit/delete dropdown
  const editDeleteCard = () => (
    <div className="bg-white flex flex-col justify-start items-start absolute ml-37 -mt-3 rounded-lg shadow-md">
      <button className="flex w-full items-center rounded-sm gap-3 hover:bg-gray-200 px-2 py-1">
        <PenLine size={16} /> Edit Column
      </button>
      <button className="flex text-red-500 w-full items-center rounded-sm gap-3 hover:bg-gray-200 px-2 py-1">
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );

  // Render an applicant card
  const renderApplicantCard = (applicant: Applicant) => (
    <div  className="bg-white  rounded-lg shadow-md px-4 py-3 mb-4">
      <div onClick={handleApplicationDetails} className="flex justify-start border-b pb-4 items-center gap-5 cursor-pointer">
        <img
          src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3>{applicant.name}</h3>
          <p>{applicant.role}</p>
        </div>
      </div>
      <ul className="py-2 text-[#5E6670] px-5 list-disc flex flex-col gap-1">
        <li>{applicant.experience}</li>
        <li>Eduction: {applicant.education}</li>
        <li>Applied: {applicant.appliedDate}</li>
      </ul>
      <button className="hover:bg-gray-100 px-2 py-1 rounded-lg flex gap-2 items-center text-[#0A65CC] font-bold cursor-pointer">
        <Download /> Download Cv
      </button>
    </div>
  );

  // Render a column
  const renderColumn = (title: string, applicants: Applicant[], showEditDelete: boolean, onEditDelete: () => void) => (
    <div className="rounded-lg bg-[#F8FAFC] p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title} ({applicants.length})
        </h3>
        <button onClick={onEditDelete} className="text-blue-600 text-sm hover:underline">
          <BsThreeDots />
        </button>
      </div>
      {showEditDelete && editDeleteCard()}
      {applicants.map((applicant, index) => (
        <div key={index}>{renderApplicantCard(applicant)}</div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home / Job / Senior UI/UX Designer / Applications
      </div>

      {/* Parent Div with Flex for Headline and Buttons */}
      <div className="flex justify-between items-center mb-6">
        {/* Child 1: Headline */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Job Applications</h2>
        </div>

        {/* Child 2: Filter and Sort Buttons */}
        <div className="flex space-x-3">
          <p className="rounded-md px-4 py-1.5 text-base text-gray-600">Filter</p>
          <div className="relative">
            <button
              onClick={toggleSortDropdown}
              className="border bg-[#0A65CC] cursor-pointer text-white border-gray-300 rounded-md px-4 py-1.5 text-sm hover:text-[#0A65CC] hover:bg-gray-100 flex items-center"
            >
              Sort
            </button>
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

      {/* Parent Div with Columns */}
      <div className="flex justify-between space-x-3">
        {/* Column 1: All Application */}
        {renderColumn('All Application', allApplicants, editDelete, handleThreeDots)}

        {/* Column 2: Shortlisted */}
        {renderColumn('Shortlisted', shortlistedApplicants, editDelete1, handleThreeDots1)}

        {/* Dynamic Custom Columns */}
        {customColumns.map((column, index) => (
          <div key={index} className="rounded-lg bg-[#F8FAFC] p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {column.name} ({column.applicants.length})
              </h3>
              <button className="text-blue-600 text-sm hover:underline">
                <BsThreeDots />
              </button>
            </div>
            {column.applicants.map((applicant, applicantIndex) => (
              <div key={applicantIndex}>{renderApplicantCard(applicant)}</div>
            ))}
          </div>
        ))}

        {/* Last Column: Create New Column Button */}
        <button
          onClick={handleOpenAddColumnModal}
          className="h-12 flex items-center gap-2 px-5 rounded-lg bg-[#F8FAFC] text-blue-600 text-lg w-auto font-medium hover:text-blue-800"
        >
          <CirclePlus /> Create New Column
        </button>
      </div>

      {/* AddColumnModal */}
      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={handleCloseAddColumnModal}
        onAddColumn={handleAddColumn}
      />

      <ApplicantDetailsModal newopen={applicantDetails} setnewopen={setApplicationDetails}/>
    </div>
  );
};

export default ApplicationDetails;