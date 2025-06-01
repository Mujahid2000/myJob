import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

interface ProfileState {
  isModalOpen: boolean;
  activeDropdown: number | null;
  positionOpenModal: {
    isOpen: boolean,
    userId: string,
    companyIndustry: string,
    companyLogo: string,
    companyName: string
  },
  CompanyPositionOpenModal: boolean
}

interface positionOpenModalT{
    isOpen: boolean,
    userId: string,
    companyIndustry: string,
    companyLogo: string,
    companyName: string
}

const initialState: ProfileState = {
  isModalOpen: false,
  activeDropdown: null,
  positionOpenModal: {
    isOpen: false,
    userId: '',
    companyIndustry: '',
    companyLogo: '',
    companyName: ''

  },
  CompanyPositionOpenModal: false
};



const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setModalOpen: (state, action: { payload: boolean }) => {
      state.isModalOpen = action.payload;
    },
    setActiveDropdown: (state, action: { payload: number | null }) => {
      state.activeDropdown = action.payload;
    },
    setOpenPositionModal: (state, action: { payload: positionOpenModalT }) => {
      state.positionOpenModal.isOpen = action.payload.isOpen;
      state.positionOpenModal.userId = action.payload.userId;
      state.positionOpenModal.companyIndustry = action.payload.companyIndustry;
      state.positionOpenModal.companyLogo = action.payload.companyLogo;
      state.positionOpenModal.companyName = action.payload.companyName;
    },
    setCompanyPositionModal: (state, action: { payload: boolean }) => {
      state.CompanyPositionOpenModal = action.payload;
    },
  },
});

export const { setModalOpen, setActiveDropdown, setOpenPositionModal, setCompanyPositionModal } = profileSlice.actions;
export default profileSlice.reducer;