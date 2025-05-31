import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  isModalOpen: boolean;
  activeDropdown: number | null;
  positionOpenModal: boolean
}

const initialState: ProfileState = {
  isModalOpen: false,
  activeDropdown: null,
  positionOpenModal: false
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
    setOpenPositionModal: (state, action: { payload: boolean }) => {
      state.positionOpenModal = action.payload;
    },
  },
});

export const { setModalOpen, setActiveDropdown, setOpenPositionModal } = profileSlice.actions;
export default profileSlice.reducer;