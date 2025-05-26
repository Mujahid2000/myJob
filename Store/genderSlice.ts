import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GenderState {
  selectedGender: string | null; // Store the selected gender
}

const initialState: GenderState = {
  selectedGender: null, // Initially, no gender is selected
};

export const genderSlice = createSlice({
 name: 'gender',
  initialState,
  reducers: {
    setGender: (state, action: PayloadAction<string>) => {
      state.selectedGender = action.payload; // Set the selected gender
    },
    resetGender: (state) => {
      state.selectedGender = null; // Reset the selected gender
    },
  },
})

// Action creators are generated for each case reducer function
export const {resetGender, setGender } = genderSlice.actions

export default genderSlice.reducer