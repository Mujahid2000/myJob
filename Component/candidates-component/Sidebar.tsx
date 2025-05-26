import { RootState } from '@/Store/Store';
import React from 'react';
import { useSelector } from 'react-redux';
import { SliderDemo } from '../employee-Component/RangeSlider';
import { RadioGroupItemsCandidate } from './CandidateLevel';
import { RadioGroupItemsExperience } from './RadioGroup';
import { CheckboxDemo } from './CheckBox';
import { RadioGroupItemsGender } from './GenderRadioGroup';

const Sidebar = () => {
    const [values, setValues] = React.useState(50);
   return (
        <>
            <div className="flex-1 flex flex-col gap-1">
          {/* Filter section */}
          <div className=" max-h-56 rounded-lg shadow-md border py-3 px-3">
            <h2 className="pb-2">
              Location Radius:{" "}
              <span className="text-blue-600">{values} miles</span>
            </h2>
            <SliderDemo onValueChange={(newValue) => setValues(newValue[0])} />
           <RadioGroupItemsCandidate/>
          </div> 
          <div className="flex-1 max-h-66 rounded-lg shadow-md border py-2 px-3">
            <RadioGroupItemsExperience/>
          </div>
          <div className="flex-1 max-h-56 rounded-lg shadow-md border py-3 px-3">
            <CheckboxDemo
            />
          </div>
          <div className="flex-1 max-h-32 rounded-lg shadow-md border py-3 px-3">
           <RadioGroupItemsGender/>
          </div>
        </div>
        </>
    );
};

export default Sidebar;