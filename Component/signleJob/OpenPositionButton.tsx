'use client';

import { Button } from '@/components/ui/button';
import { setOpenPositionModal } from '@/Store/profileSlice';
import { RootState } from '@/Store/Store';
import { useDispatch, useSelector } from 'react-redux';

interface OpenPositionButtonProps {
  companyId: string;
  companyindustry: string;
  logo: string;
  companyname: string;
}

const OpenPositionButton: React.FC<OpenPositionButtonProps> = ({
  companyId,
  companyindustry,
  logo,
  companyname,
}) => {
  const { isOpen, userId, companyIndustry, companyLogo, companyName } = useSelector((state: RootState) => state.profile.positionOpenModal);
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() =>
        dispatch(
          setOpenPositionModal({
            isOpen: true,
            userId: companyId,
            companyIndustry:companyindustry,
            companyLogo:logo,
            companyName:companyname,
          })
        )
      }
      className="w-full cursor-pointer rounded-sm bg-[#084899] px-3 py-3 text-xs text-white transition-colors duration-200 hover:bg-[#D6E7FB] hover:text-[#0A65CC] lg:px-6 lg:py-6 lg:text-base"
    >
      View Open Position →
    </Button>
  );
};

export default OpenPositionButton;