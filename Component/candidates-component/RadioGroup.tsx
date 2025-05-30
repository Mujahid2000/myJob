'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { setExperience } from '@/Store/experienceSlice';
import { RootState } from '@/Store/Store';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';




export function RadioGroupItemsExperience() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedExperience = useSelector((state: RootState) => state.experience.selectedExperience);

  // Define the data array directly in the component
  const experienceLevels = [
    'Freshers',
    '1 - 2 Years',
    '2 - 4 Years',
    '4 - 6 Years',
    '6 - 8 Years',
    '8 - 10 Years',
    '10 - 15 Years',
    '15+ Years',
  ];



  const handleValueChange = (value: string) => {
    dispatch(setExperience(value)); // Dispatch action to update Redux state
    
  };

  return (
    <div className="">
      <h2 className="flex justify-between pb-2">
        Experience
        <span className="cursor-pointer hidden lg:flex" onClick={() => setOpen(!open)}>
          <ChevronDown
            className={`${open ? 'rotate-180 duration-400' : 'duration-400'}`}
            size={20}
          />
        </span>
      </h2>
      <div
        className={`transition-all duration-500 ${
          open ? 'max-h-full opacity-100' : 'h-0 opacity-0'
        } overflow-hidden`}
      >
        <RadioGroup onValueChange={handleValueChange} value={selectedExperience || ''}>
          {experienceLevels.map((li, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem
                value={li} // Use the list item as the unique value
                id={`option-${index}`} // Unique ID for each radio button
              />
              <Label htmlFor={`option-${index}`}>{li}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}