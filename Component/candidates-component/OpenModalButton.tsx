'use client';
import { Button } from '@/components/ui/button';
import { setCompanyPositionModal, setOpenPositionModal } from '@/Store/profileSlice';

import { RootState, AppDispatch } from '@/Store/Store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const OpenModalButton = ({usersId, resumeId}: {usersId: string, resumeId:string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {isOpen, resume_Id, userId} = useSelector((state: RootState) => state.profile.CompanyPositionOpenModal)


    return (
       <div>
      <Button
        onClick={() => dispatch(setCompanyPositionModal({ isOpen:true, userId:usersId, resume_Id:resumeId,  }))}
        className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm"
      >
        View profile →
      </Button>
    </div>
    );
};

export default OpenModalButton;
