// RTKQuery/foundingInfoSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FoundingInfoRequest {
  userId: string;
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyVision: string;
}

interface FoundingInfoResponse {
  userId: string;
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyVision: string;
}

export const foundingInfoApi = createApi({
  reducerPath: 'foundingInfoApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['FoundingInfo'],
  endpoints: (builder) => ({
    postFounderInfo: builder.mutation<FoundingInfoResponse, FoundingInfoRequest>({
      query: (formData) => ({
        url: '/companyData/founderInfo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['FoundingInfo'],
    }),
  }),
});

export const { usePostFounderInfoMutation } = foundingInfoApi;