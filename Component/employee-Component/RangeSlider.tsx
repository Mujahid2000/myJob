'use client';

import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Store/Store';
import { setSliderValue } from '@/Store/range';


type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  const dispatch = useDispatch();
  const sliderValue = useSelector((state: RootState) => state.slider.value);

  // Handle slider change and dispatch to Redux
  const handleValueChange = (values: number[]) => {
    const value = values[0]; // Take the first value since it's a single slider
    dispatch(setSliderValue(value));
  };



  return (
    <div className="flex flex-col gap-2">
      <Slider
        defaultValue={sliderValue !== null ? [sliderValue] : [50]} // Use Redux state or default to 50
        max={100}
        min={10}
        step={1}
        onValueChange={handleValueChange}
        className={cn('w-[100%] cursor-pointer custom-slider', className)} // Custom class for deeper styling
        {...props}
      />
     
      
    </div>
  );
}