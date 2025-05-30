'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { setGender } from '@/Store/genderSlice';
import { RootState } from '@/Store/Store';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';




export function RadioGroupItemsGender() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedGender = useSelector((state: RootState) => state.gender.selectedGender);

  // Define the data array directly in the component
  const skillLevel = ['Male', 'Female', 'Others'];



  const handleValueChange = (value: string) => {
    dispatch(setGender(value)); // Dispatch action to update Redux state
    
  };

  return (
    <div className="">
      <h2 className="flex justify-between pb-2">
        Gender
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
        <RadioGroup onValueChange={handleValueChange} value={selectedGender || ''}>
          {skillLevel.map((li, index) => (
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