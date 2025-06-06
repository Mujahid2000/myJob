import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterCards() {
  return (
    <div className="flex flex-col px-2 md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-6 max-w-7xl mx-auto py-9">
      {/* Candidate Card */}
      <div className="max-w-[40rem] max-h-[18rem] p-9 bg-[#E4E5E8] rounded-lg">
        <h2 className="text-2xl md:text-[2rem] font-semibold text-[#191F33]">Become a Candidate</h2>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.
        </p>
        <Link href={'/register'}>
        <Button className="mt-4 cursor-pointer p-6 text-base md:text-lg rounded-sm bg-white text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2">
          Register Now →
        </Button>
        </Link>
      </div>
      {/* Employer Card */}
      <div className="max-w-[40rem] max-h-[18rem] p-9 bg-[#0A65CC] rounded-lg text-white">
        <h2 className="text-2xl md:text-[2rem] font-semibold ">Become an Employer</h2>
        <p className="mt-2 text-base md:text-lg">
          Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliquet.
        </p>
        <Link href={'/register'}>
        <Button className="mt-4 cursor-pointer p-6 text-base md:text-lg rounded-sm bg-white hover:bg-blue-600 hover:text-white text-blue-700 flex items-center gap-2">
          Register Now →
        </Button>
        </Link>
      </div>
    </div>
  );
}
