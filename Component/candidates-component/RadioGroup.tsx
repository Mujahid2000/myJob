import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

  interface RadioGroupDemo {
    title: string;
    list: string[];
    onValueChange?: (value: string) => void; // Optional callback for value changes
  }
  

export function RadioGroupItems({...props}: RadioGroupDemo) {
    const [open, setOpen] = useState(true);

    return (
        <div className="">
            <h2 className="flex justify-between pb-2">
                {props.title}
                <span
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <ChevronDown className={`${open== true? 'rotate-180 duration-400' :"duration-400"}`} size={20} />
                </span>
            </h2>
            <div
                className={`transition-all duration-500 ${
                    open== true ? "max-h-full duration-500 opacity-100" : "h-0 opacity-0"
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
