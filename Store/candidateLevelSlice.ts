import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from 'react-hook-form';

interface CandidateLevelState {
  selectedLevel: string | null; // Store the selected candidate level
}

const initialState: CandidateLevelState = {
  selectedLevel: null, // Initially, no level is selected
};

export const candidateLevelSlice = createSlice({
  name: 'candidateLevel',
  initialState,
  reducers: {
    setCandidateLevel: (state, action:PayloadAction<string>) => {
      state.selectedLevel = action.payload; // Update the selected level
    },
    resetCandidateLevel: (state) => {
      state.selectedLevel = null; // Reset the selected level
    },
  }
})

// Action creators are generated for each case reducer function
export const { setCandidateLevel, resetCandidateLevel } = candidateLevelSlice.actions

export default candidateLevelSlice.reducer