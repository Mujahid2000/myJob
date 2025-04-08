import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function CountryDropDown() {
  return (
    <Select>
      <SelectTrigger className="w-[100px] text-lg  border-none shadow-none focus:outline-none">
        <SelectValue className="text-base text-black" placeholder="Bangla" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="text-base" value="Bangla">Bangla</SelectItem>
          <SelectItem className="text-base" value="English" >English</SelectItem>
          <SelectItem className="text-base" value="French">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
