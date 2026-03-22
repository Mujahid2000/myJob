// RTKQuery/foundingInfoSlice.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

interface FoundingInfoRequest {
  userId: string;
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearEstablished: string;
  companyWebsite: string;
  companyVision: string;
}

interface FoundingInfoResponse {
  userId: string;
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearEstablished: string;
  companyWebsite: string;
  companyVision: string;
}

export const foundingInfoApi = createApi({
  reducerPath: 'foundingInfoApi',
  baseQuery: baseQueryWithReauth,
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