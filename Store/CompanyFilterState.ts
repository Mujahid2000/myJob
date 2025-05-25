import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

interface Filter {
  slider: number;
  inputSelect: string;
}

const initialState: Filter = {
  slider: 50,
  inputSelect: ""
};

const CompanyFilter = createSlice({
  name: 'Filter',
  initialState: initialState,
  reducers: {
    rangeData: (state, action: PayloadAction<Filter>) => {
      state.slider = action.payload.slider;
      state.inputSelect = action.payload.inputSelect;
    }
  }
});


export const {rangeData} = CompanyFilter.actions

export default CompanyFilter.reducer;