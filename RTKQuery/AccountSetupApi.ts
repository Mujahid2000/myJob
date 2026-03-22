import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export interface AccountSetUpProfile {
  _id: string
  companyName: string
  logo: string
  banner: string
  biography: string
  social: Social[]
  mapLocation: string
  phoneNumber: string
  email: string
  organizationType: string
  industryType: string[] 
  teamSize: string
  yearEstablished: string
  companyWebsite: string
  noComplete: boolean
}

export interface Social {
  platform: string
  url: string
  _id: string
}

export const AccountSetupApi = createApi({
  reducerPath: 'AccountSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['accountSetup'],
  endpoints: (builder) => ({
    accountInfoGet: builder.query<AccountSetUpProfile, string>({
      query: (userId) => ({
        url: `/getCompanyData/companyProfileComplete/${userId}` // make sure it matches your Express route
      })
    })
  })
})


export const { useAccountInfoGetQuery } = AccountSetupApi
