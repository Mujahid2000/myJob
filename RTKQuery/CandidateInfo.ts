import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface personalData {
    country: string,
    dateOfBirth: string,
    gender: string,
    maritalStatus: string,
    education: string,
    experience: string,
    userId: string,
    email: string,
    biography: string
}

interface personalDataResponse {
    message: string,
    data: {
    country: string,
    dateOfBirth: string,
    gender: string,
    maritalStatus: string,
    education: string,
    experience: string,
    userId: string,
    biography: string
    email: string,
     _id: string;
    __v: number;
    }
}


export interface ProfileMessage {
  message: string
  data: Data
}

export interface Data {
  userId: string
  social: Social[]
  location: string
  email: string
  phoneNumber: string
  country: string
  education: string
  experience: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  biography: string
  message: string
}

export interface Social {
  platform: string
  url: string
  _id: string
}




export const CandidatePersonalData = createApi({
    reducerPath: 'candidateApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://serverjob.vercel.app' 
    }),
    tagTypes: ['candidate'],
    endpoints: builder =>({
        postCandidatePersonalData : builder.mutation<personalDataResponse['data'], personalData>({
            query: (formData) => ({
                 url: '/applicantData/personal',
                method: 'POST',
                body: formData
            }),
            transformResponse: (response) => (response as personalDataResponse).data
        }),
        getProfileCompleteMessage: builder.query<ProfileMessage, string>({
            query: (userId) => ({
                url: `/applicantData/profileComplete/${userId}`,
                method: 'GET'
            }),
            transformResponse: (response) => (response as ProfileMessage)
        })
    })
})

export const { usePostCandidatePersonalDataMutation, useGetProfileCompleteMessageQuery } = CandidatePersonalData;