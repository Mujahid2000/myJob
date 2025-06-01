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
  CompanyPositionOpenModal: {
    userId: string,
    resume_Id: string,
    isOpen: boolean
  }
}

interface positionOpenModalT{
    isOpen: boolean,
    userId: string,
    companyIndustry: string,
    companyLogo: string,
    companyName: string
}


interface CandidateModalT {
  isOpen : boolean,
  userId: string,
  resume_Id: string
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
  CompanyPositionOpenModal: {
    userId: '',
    resume_Id: '',
    isOpen: false
  }
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
    setCompanyPositionModal: (state, action: { payload: CandidateModalT }) => {
      state.CompanyPositionOpenModal.userId = action.payload.userId;
      state.CompanyPositionOpenModal.resume_Id = action.payload.resume_Id;
      state.CompanyPositionOpenModal.isOpen = action.payload.isOpen
    },
  },
});

export const { setModalOpen, setActiveDropdown, setOpenPositionModal, setCompanyPositionModal } = profileSlice.actions;
export default profileSlice.reducer;