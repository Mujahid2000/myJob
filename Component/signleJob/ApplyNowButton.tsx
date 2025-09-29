'use client'
import { AuthContext } from "@/Authentication/AuthContext";
import { Button } from "@/components/ui/button";
import { openModal } from "@/Store/ModalSlice";
import { AppDispatch } from "@/Store/Store";
import { useContext } from "react";
import { useDispatch } from "react-redux";

import { toast, Toaster } from "sonner";

const ApplyNowButton = ({ id }: { id: string }) => {
   const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
  const dispatch = useDispatch<AppDispatch>();
  const jobId = id
  const handleOpen = () => {
    if(!currentUser){
      console.log('first')
      toast.error("Please log in to apply for jobs.");
      return; 
    } else{
      dispatch(openModal({ value: true, jobId }));
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white  px-[2rem] py-[1rem] rounded-none"
      >
        Apply Now →
      </Button>
      <Toaster richColors/>
    </>
  );
};

export default ApplyNowButton;
