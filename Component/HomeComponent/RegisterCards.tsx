import { Button } from "@/components/ui/button";

export default function RegisterCards() {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto py-9">
      {/* Candidate Card */}
      <div className="w-[40rem] h-[18rem] p-9 bg-[#E4E5E8] rounded-lg">
        <h2 className="text-[2rem] font-semibold text-[#191F33]">Become a Candidate</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.
        </p>
        <Button className="mt-4 p-6 text-lg rounded-sm bg-white text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2">
          Register Now →
        </Button>
      </div>
      {/* Employer Card */}
      <div className="w-[40rem] h-[18rem] p-9 bg-[#0A65CC] rounded-lg text-white">
        <h2 className="text-[2rem] font-semibold ">Become an Employer</h2>
        <p className="mt-2 text-lg">
          Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliquet.
        </p>
        <Button className="mt-4 p-6 text-lg rounded-sm bg-white hover:bg-blue-600 hover:text-white text-blue-700 flex items-center gap-2">
          Register Now →
        </Button>
      </div>
    </div>
  );
}
