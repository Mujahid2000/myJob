'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { toggleCheckbox } from '@/Store/EducationSlice';
import { RootState } from '@/Store/Store';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export function CheckboxDemo() {
  const [arrow, setArrow] = useState(true); // State for toggling the collapsible section
  const dispatch = useDispatch();
  const checkedItems = useSelector((state: RootState) => state.education.checkedItems);

  // Define the data array directly in the component
  const educationLevels = [
    'All',
    'High School',
    'Intermediate',
    'Graduation',
    'Master Degree',
    'Bachelor Degree',
  ];

  const handleCheckboxChange = (value: string) => {
    dispatch(toggleCheckbox(value));
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex justify-between">
        Education
        <span
          className="cursor-pointer"
          onClick={() => setArrow(!arrow)} // Toggle arrow state
        >
          <ChevronDown
            className={`${arrow ? 'rotate-180 duration-400' : 'duration-400'}`}
            size={20}
          />
        </span>
      </h2>
      {educationLevels.map((li: string, index: number) => (
        <div
          className={`flex items-center space-x-2 transition-all duration-500 ${
            arrow ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
          key={index}
        >
          <Checkbox
            id={`terms-${index}`}
            checked={checkedItems.includes(li)} // Check if the item is in the Redux state
            onCheckedChange={() => handleCheckboxChange(li)} // Dispatch toggle action
          />
          <label
            htmlFor={`terms-${index}`} // Match the unique ID
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {li}
          </label>
        </div>
      ))}
    </div>
  );
}