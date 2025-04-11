"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Define the props type
interface CheckboxDemoProps {
  title: string; // Title is a string
  list: string[]; // List is an array of strings
}

export function CheckboxDemo({ ...props }: CheckboxDemoProps) {
  const [arrow, setArrow] = useState(true); // Renamed SelectArrow to setArrow for better naming convention

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex justify-between">
        {props.title}
        <span
          className="cursor-pointer"
          onClick={() => setArrow(!arrow)} // Toggle arrow state
        >
          <ChevronDown
            className={`${arrow ? "rotate-180 duration-400" : "duration-400"}`}
            size={20}
          />
        </span>
      </h2>
      {props.list &&
        props.list.map((li: string, index: number) => (
          <div
            className={`flex items-center space-x-2 transition-all duration-500 ${
              arrow ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
            key={index}
          >
            <Checkbox id={`terms-${index}`} /> {/* Unique ID for each checkbox */}
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