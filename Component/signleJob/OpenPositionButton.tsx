'use client'
import { Button } from '@/components/ui/button';
import { setOpenPositionModal } from '@/Store/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const OpenPositionButton = () => {
    const dispatch = useDispatch();
    return (
        <Button
                      onClick={() => dispatch(setOpenPositionModal(true))}
                      className="hover:bg-[#D6E7FB] cursor-pointer text-xs w-full hover:text-[#0A65CC] bg-[#084899] text-white px-3 lg:px-6 py-3 lg:py-6 rounded-sm transition-colors duration-200"
                    >
                      View Open Position →
                    </Button>
    );
};

export default OpenPositionButton;