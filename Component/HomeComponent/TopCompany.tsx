import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function TopCompany() {
  return (
    <div className="max-w-7xl mx-auto my-7">
      <div className="flex justify-between ">
        <h1 className='text-[2.5rem] text-[#191F33]'>Top companies</h1>
      <div className="flex gap-4">
      <Button className="w-10 h-10 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-sm flex items-center justify-center">
        <ChevronLeft className="w-5 h-5 " />
      </Button>
      <Button className="w-10 h-10 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-sm flex items-center justify-center">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
      </div>
      <Card className="w-[19rem] h-[10rem] py-5 px-0 hover:shadow-md border my-5 rounded-lg">
      <CardContent className="flex flex-col  items-center gap-6">
        <div className="flex items-center gap-2 w-full">
          <Image
            src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"
            alt="Dribbble Logo"
            width={60}
            height={60}
            className="rounded-md"
          />
          <div className="flex flex-col gap-3 flex-grow">
            <div className="flex gap-4">
            <p className="font-semibold text-lg">Dribbble</p>
            <Badge className="bg-red-100 text-red-600">Featured</Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" /> United States
            </div>
          </div>
        </div>
        <Button className="w-[15.5rem] hover:duration-500 rounded-sm hover:bg-blue-600 bg-blue-100 text-blue-600 hover:text-white">
          Open Position
        </Button>
      </CardContent>
    </Card>
    </div>
  );
}
