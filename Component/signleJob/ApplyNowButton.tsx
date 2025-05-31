'use client'
import { Button } from "@/components/ui/button";
import { openModal } from "@/Store/ModalSlice";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";

const ApplyNowButton = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const jobId = id
  const handleOpen = () => {
    dispatch(openModal({ value: true, jobId }));
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white  px-[2rem] py-[1rem] rounded-none"
      >
        Apply Now →
      </Button>
    </>
  );
};

export default ApplyNowButton;
