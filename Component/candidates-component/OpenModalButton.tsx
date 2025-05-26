'use client';
import { Button } from '@/components/ui/button';
import { candidateModal } from '@/Store/CandidateModal';

import { RootState, AppDispatch } from '@/Store/Store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const OpenModalButton = ({candidateId}: {candidateId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
  const { value } = useSelector((state: RootState) => state.candidateModal);

console.log(value)

    return (
       <div>
      <Button
        onClick={() => dispatch(candidateModal({ value: !value, candidateId }))}
        className="bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white px-4 py-2 rounded-sm"
      >
        View profile →
      </Button>
    </div>
    );
};

export default OpenModalButton;
