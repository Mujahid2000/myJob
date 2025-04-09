import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { useState } from "react";


export function RadioGroupItems() {
    const [arrow, SelectArrow] = useState(true);

    return (
        <div className="">
            <h2 className="flex justify-between py-6">
                Organization Type{" "}
                <span
                    className="cursor-pointer"
                    onClick={() => SelectArrow(!arrow)}
                >
                    <ChevronDown className={`${arrow== true? 'rotate-180 duration-400' :"duration-400"}`} size={20} />
                </span>
            </h2>
            <div
                className={`transition-all duration-500 ${
                    arrow ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <RadioGroup className="">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Government" id="option-one" />
                        <Label htmlFor="option-one">Government</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Semi_Government" id="option-one" />
                        <Label htmlFor="option-one">Semi Government</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="NGO" id="option-one" />
                        <Label htmlFor="option-one">NGO</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Private_Company" id="option-one" />
                        <Label htmlFor="option-one">Private Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="International_Agencies" id="option-two" />
                        <Label htmlFor="option-two">International Agencies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Others" id="option-two" />
                        <Label htmlFor="option-two">Others </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
}
