// Store/foundingInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoundingInfoState {
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearEstablished: string;
  companyWebsite: string;
  companyVision: string;
}

const initialState: FoundingInfoState = {
  organizationType: '',
  industryTypes: '',
  teamSize: '',
  yearEstablished: '',
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
    setyearEstablished: (state, action: PayloadAction<string>) => {
      state.yearEstablished = action.payload;
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
      state.yearEstablished = '';
      state.companyWebsite = '';
      state.companyVision = '';
    },
  },
});

export const {
  setOrganizationType,
  setIndustryTypes,
  setTeamSize,
  setyearEstablished,
  setCompanyWebsite,
  setCompanyVision,
  resetForm,
} = foundingInfoSlice.actions;

export default foundingInfoSlice.reducer;