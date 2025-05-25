// Store/foundingInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoundingInfoState {
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyVision: string;
}

const initialState: FoundingInfoState = {
  organizationType: '',
  industryTypes: '',
  teamSize: '',
  yearOfEstablishment: '',
  companyWebsite: '',
  companyVision: '',
};

const foundingInfoSlice = createSlice({
  name: 'foundingInfo',
  initialState,
  reducers: {
    setOrganizationType: (state, action: PayloadAction<string>) => {
      state.organizationType = action.payload;
    },
    setIndustryTypes: (state, action: PayloadAction<string>) => {
      state.industryTypes = action.payload;
    },
    setTeamSize: (state, action: PayloadAction<string>) => {
      state.teamSize = action.payload;
    },
    setYearOfEstablishment: (state, action: PayloadAction<string>) => {
      state.yearOfEstablishment = action.payload;
    },
    setCompanyWebsite: (state, action: PayloadAction<string>) => {
      state.companyWebsite = action.payload;
    },
    setCompanyVision: (state, action: PayloadAction<string>) => {
      state.companyVision = action.payload;
    },
    resetForm: (state) => {
      state.organizationType = '';
      state.industryTypes = '';
      state.teamSize = '';
      state.yearOfEstablishment = '';
      state.companyWebsite = '';
      state.companyVision = '';
    },
  },
});

export const {
  setOrganizationType,
  setIndustryTypes,
  setTeamSize,
  setYearOfEstablishment,
  setCompanyWebsite,
  setCompanyVision,
  resetForm,
} = foundingInfoSlice.actions;

export default foundingInfoSlice.reducer;