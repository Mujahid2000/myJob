import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  isModalOpen: boolean;
  activeDropdown: number | null;
  positionOpenModal: {
    isOpen: boolean,
    userId: string,
    resume_Id: string
  }
}

interface positionOpenModalT{
    isOpen: boolean,
    userId: string,
    resume_Id: string
}

const initialState: ProfileState = {
  isModalOpen: false,
  activeDropdown: null,
  positionOpenModal: {
    isOpen: false,
    userId: '',
    resume_Id: ''

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
      state.positionOpenModal.resume_Id = action.payload.resume_Id;
      state.positionOpenModal.userId = action.payload.userId;
    },
  },
});

export const { setModalOpen, setActiveDropdown, setOpenPositionModal } = profileSlice.actions;
export default profileSlice.reducer;