import { Button } from "@/components/ui/button";
import "react-day-picker/style.css";
import React, { useState } from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DayPicker } from "react-day-picker";

// components/settings/Personal.tsx
const Personal: React.FC = () => {
  const [date, setDate] = React.useState<Date>()
  const [selected, setSelected] = useState<Date>();

    return (
      <div className="space-y-9 py-6 bg-white h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Bangladeshi</option>
            </select>
          </div>
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
      <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className={`p-4 `}
    />
      </PopoverContent>
    </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Single</option>
              <option>Married</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>S.S.C</option>
              <option>H.S.C</option>
              <option>C.S.E</option>
              <option>M.S.C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Less than 1 Year</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>5 Years</option>
            </select>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md">
          <label className="block text-sm px-3 py-2 font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write down your biography here. Let the employer know who you are..."
            className="mt-1 block h-56 w-full  px-3 py-2 h-32"
          />
          <div className="mt-2 px-3 py-2 flex space-x-2 text-gray-500">
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐁</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑰</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑼</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑺</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">🔗</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐻</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">≡</button>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default Personal;