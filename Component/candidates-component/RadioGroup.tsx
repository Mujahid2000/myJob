import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
interface RadioGroupDemo {
    title: string; // Title is a string
    list: string[]; // List is an array of strings
  }

export function RadioGroupItems({...props}: RadioGroupDemo) {
    const [arrow, SelectArrow] = useState(true);

    return (
        <div className="">
            <h2 className="flex justify-between pb-2">
                {props.title}
                <span
                    className="cursor-pointer"
                    onClick={() => SelectArrow(!arrow)}
                >
                    <ChevronDown className={`${arrow== true? 'rotate-180 duration-400' :"duration-400"}`} size={20} />
                </span>
            </h2>
            <div
                className={`transition-all duration-500 ${
                    arrow== true ? "max-h-full opacity-100" : "h-0 opacity-0"
                } overflow-hidden`}
            >
                <RadioGroup className="">
                    {
                        props.list && props.list.map((li, index) =>(
                    <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem value="Government" id="option-one" />
                        <Label htmlFor="option-one">{li}</Label>
                    </div>

                        ))
                    }
                   
                </RadioGroup>
            </div>
        </div>
    );
}
