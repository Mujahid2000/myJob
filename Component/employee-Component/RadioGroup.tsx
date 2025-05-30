import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { rangeData } from "@/Store/CompanyFilterState";
import { RootState } from "@/Store/Store";
import { useDispatch, useSelector } from "react-redux";

const orgTypes = [
  { label: "Nonprofit Organization", value: "Nonprofit Organization" },
  { label: "International Agencies", value: "International_Agencies" },
  { label: "Semi Government", value: "Semi_Government" },
  { label: "Private Company", value: "Private_Company" },
  { label: "Government", value: "Government" },
  { label: "NGO", value: "NGO" },
  { label: "Others", value: "Others" },
];

export function RadioGroupItems() {
  const dispatch = useDispatch();
  const { inputSelect, slider } = useSelector((state: RootState) => state.filter);

  const handleSelectChange = (value: string) => {
    dispatch(rangeData({ slider, inputSelect: value }));
  };

  return (
    <Accordion type="single" collapsible defaultValue="org-type" className="">
      <AccordionItem value="org-type">
        <AccordionTrigger className="hover:no-underline hidden lg:flex">Organization Type</AccordionTrigger>
        <h1 className="px-2 flex lg:hidden py-3 font-semibold">Organization Type</h1>
        <AccordionContent>
          <RadioGroup value={inputSelect} onValueChange={handleSelectChange}>
            {orgTypes.map(({ label, value }, index) => (
              <div key={value} className="flex items-center space-x-2 px-2 lg:px-0">
                <RadioGroupItem value={value} id={`org-type-${index}`} />
                <Label htmlFor={`org-type-${index}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
