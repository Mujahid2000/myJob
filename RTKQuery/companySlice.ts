// app/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CompanyInfoRequest {
  logo: File | null;
  banner: File | null;
  companyName: string;
  biography: string;
}

interface CompanyInfoResponse {
  id: string;
  logoUrl: File;
  bannerUrl: File;
  companyName: string;
  biography: string;
}

export interface CompanyPersonal {
  _id: string
  userId: string
  companyName: string
  logo: string
  banner: string
  biography: string
  __v: number
}

export interface CompanyProfile {
  _id: string
  userId: string
  organizationType: string
  industryTypes: string
  teamSize: string
  yearEstablished: string
  companyWebsite: string
  companyVision: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CompanySocialLinks {
  _id: string
  userId: string
  socialLinks: SocialLink[]
  __v: number
}

export interface SocialLink {
  platform: string
  url: string
  _id: string
}


export interface CompanyContacts {
  _id: string
  userId: string
  mapLocation: string
  phoneNumber: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}




export const companyApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://serverjob.vercel.app/', // Replace with your API base URL
  }),
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    updateCompanyInfo: builder.mutation<CompanyInfoResponse, FormData>({
      query: (formData) => ({
        url: '/companyData/companyInfo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Company'],
    }),
    getCompanyPersonal: builder.query<CompanyPersonal, string>({
      query: (userId) =>({
        url: `/getCompanyData/companyPersonal/${userId}`
      })
    }),
    getCompanyProfile: builder.query<CompanyProfile, string>({
      query: (userId) =>({
        url: `/getCompanyData/companyProfile/${userId}`
      })
    }),
    getCompanySocialLinks: builder.query<CompanySocialLinks, string>({
      query: (userId) =>({
        url: `/getCompanyData/companySocialLink/${userId}`
      })
    }),
    getCompanyContacts: builder.query<CompanyContacts, string>({
      query: (userId) =>({
        url: `/getCompanyData/companyContacts/${userId}`
      })
    })
  }),
});

export const { useUpdateCompanyInfoMutation, useGetCompanyPersonalQuery, useGetCompanyProfileQuery, useGetCompanySocialLinksQuery, useGetCompanyContactsQuery } = companyApiSlice;