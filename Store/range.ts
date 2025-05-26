// src/features/slider/sliderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
  value: number | null; // Store the slider value
}

const initialState: SliderState = {
  value: null, // Initially, no value is set
};

const range = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSliderValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload; // Set the slider value
    },
    resetSliderValue: (state) => {
      state.value = null; // Reset the slider value
    },
  },
});

// Export actions
export const { setSliderValue, resetSliderValue } = range.actions;

// Export reducer
export default range.reducer;