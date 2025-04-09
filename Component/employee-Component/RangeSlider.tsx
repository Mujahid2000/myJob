import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
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