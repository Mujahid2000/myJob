"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function CheckboxDemo({...props}) {
    const [arrow, SelectArrow] = useState(true);
   

  return (
    <div className="flex flex-col gap-3 ">
        <h2 className="flex justify-between">
                {props.title}
                <span
                    className="cursor-pointer"
                    onClick={() => SelectArrow(!arrow)}
                >
                    <ChevronDown className={`${arrow== true? 'rotate-180 duration-400' :"duration-400"}`} size={20} />
                </span>
            </h2>
        {
            props.list && props.list.map((li, index) =>(
                <div className={`flex items-center space-x-2 transition-all duration-500 ${
                    arrow ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`} key={index}>
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {li}
      </label>
    </div>
            ))
        }
    
    </div>
  )
}
