import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  const [sliderValues, setSliderValues] = useState<number>()
  console.log(props)
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      min={10}
      step={1}
      className={cn("w-[100%] cursor-pointer custom-slider", className)} // Custom class for deeper styling
      {...props}
    />
  );
}