"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setCandidateLevel } from "@/Store/candidateLevelSlice";
import { RootState } from "@/Store/Store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export function RadioGroupItemsCandidate() {
 const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedLevel = useSelector((state: RootState) => state.candidateLevel.selectedLevel);

  // Define the data array directly in the component
  const skillLevel = ['Entry Level', 'Mid Level', 'Expert Level'];



  const handleValueChange = (value: string) => {
    dispatch(setCandidateLevel(value)); // Dispatch action to update Redux state
  };

  return (
    <div className="">
      <h2 className="flex justify-between py-2">
        Candidate Level
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
        <RadioGroup onValueChange={handleValueChange} value={selectedLevel || ''}>
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