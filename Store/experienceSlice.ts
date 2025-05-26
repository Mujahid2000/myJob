import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExperienceState {
  selectedExperience: string | null; // Store the selected experience level
}

const initialState: ExperienceState = {
  selectedExperience: null, // Initially, no experience level is selected
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setExperience: (state, action: PayloadAction<string>) => {
      state.selectedExperience = action.payload; // Set the selected experience level
    },
    resetExperience: (state) => {
      state.selectedExperience = null; // Reset the selected experience level
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExperience, resetExperience } = experienceSlice.actions

export default experienceSlice.reducer