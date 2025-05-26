import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EducationState {
  checkedItems: string[];
}

const initialState: EducationState = {
  checkedItems: [],
};

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    toggleCheckbox: (state, action: PayloadAction<string>) => {
      if (state.checkedItems.includes(action.payload)) {
        state.checkedItems = state.checkedItems.filter(
          (item) => item !== action.payload
        );
      } else {
        state.checkedItems.push(action.payload);
      }
    },
    resetCheckboxes: (state) => {
      state.checkedItems = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const {  resetCheckboxes,toggleCheckbox  } = educationSlice.actions

export default educationSlice.reducer