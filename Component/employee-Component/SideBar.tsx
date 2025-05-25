'use client'
import React, { useState } from 'react';
import { SliderDemo } from './RangeSlider';
import { RadioGroupItems } from './RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { rangeData } from '@/Store/CompanyFilterState';
import { RootState } from '@/Store/Store';

const SideBar = () => {
  const [values, setValues] = React.useState(50);
  const dispatch = useDispatch();
  const {inputSelect, slider} = useSelector((state: RootState) => state.filter)
  const handleSliderChange = (newValue: number[]) => {
    setValues(newValue[0]);
    dispatch(rangeData({ slider: newValue[0], inputSelect })); // Set actual inputSelect later if needed
  };

  return (
    <div className="flex-1 max-h-80 rounded-lg shadow-md border py-6 px-3">
      <h2 className="py-2">
        Location Radius: <span className="text-blue-600">{slider} miles</span>
      </h2>

      <SliderDemo onValueChange={handleSliderChange} />
      <RadioGroupItems />
    </div>
  );
};

export default SideBar;
