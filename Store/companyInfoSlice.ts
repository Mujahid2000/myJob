// app/companyInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyInfoState {
  logo: string | null;
  banner: string | null;
  companyName: string;
  biography: string;
}

const initialState: CompanyInfoState = {
  logo: null,
  banner: null,
  companyName: '',
  biography: '',
};

const companyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    setLogo: (state, action: PayloadAction<string | null>) => {
      state.logo = action.payload;
    },
    setBanner: (state, action: PayloadAction<string | null>) => {
      state.banner = action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    setBiography: (state, action: PayloadAction<string>) => {
      state.biography = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setLogo, setBanner, setCompanyName, setBiography, resetForm } =
  companyInfoSlice.actions;
export default companyInfoSlice.reducer;