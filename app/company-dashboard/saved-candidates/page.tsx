'use client'
import { Bookmark, MoveRight } from 'lucide-react';
import React, { useState } from 'react';

// Define the interface for a candidate
interface Candidate {
  name: string;
  role: string;
}

// Sample data for candidates
const candidates: Candidate[] = [
  { name: 'Guy Hawkins', role: 'Technical Support Specialist' },
  { name: 'Jacob Jones', role: 'Product Designer' },
  { name: 'Cameron Williamson', role: 'Marketing Officer' },
  { name: 'Robert Fox', role: 'Marketing Manager' },
  { name: 'Kathryn Murphy', role: 'Junior Graphic Designer' },
  { name: 'Darlene Robertson', role: 'Visual Designer' },
  { name: 'Kristin Watson', role: 'Senior UX Designer' },
  { name: 'Jenny Wilson', role: 'Interaction Designer' },
  { name: 'Marvin McKinney', role: 'Networking Engineer' },
  { name: 'Theresa Webb', role: 'Software Engineer' },
];

const page: React.FC = () => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  // Toggle dropdown for a specific candidate
  const toggleDropdown = (index: number): void => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // Render the dropdown menu
  const renderDropdown = () => (
    <div className="absolute right-0 mt-42 w-48 bg-white rounded-md shadow-lg z-10">
      <div className="p-2">
        <button className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100">
          <span className="mr-2">📧</span> Send Email
        </button>
        <button className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100">
          <span className="mr-2">⬇️</span> Download CV
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Saved Candidates</h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-1">ℹ️</span>
          <p>All the candidates are visible until 24 March, 2021</p>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-md `}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-sm mr-4"></div>
              <div>
                <h3 className="text-base font-medium text-gray-800">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 relative">
                <button className='p-1 rounded-sm hover:bg-gray-200'><Bookmark size={20}/></button>
              <button className="flex gap-5 bg-[#0A65CC] px-5 text-lg py-3 items-center text-white text-sm ">
                View Profile <MoveRight size={20} />
              </button>
              <button onClick={() => toggleDropdown(index)} className="text-gray-500 hover:text-gray-700">
                ⋮
              </button>
            {dropdownIndex === index && renderDropdown()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;