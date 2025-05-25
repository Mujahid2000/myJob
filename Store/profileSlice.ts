import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  isModalOpen: boolean;
  activeDropdown: number | null;
}

const initialState: ProfileState = {
  isModalOpen: false,
  activeDropdown: null,
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
  },
});

export const { setModalOpen, setActiveDropdown } = profileSlice.actions;
export default profileSlice.reducer;