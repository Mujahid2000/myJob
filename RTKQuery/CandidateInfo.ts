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
export const CandidatePersonalData = createApi({
    reducerPath: 'candidateApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://job-server-497l.vercel.app' 
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
        })
    })
})

export const { usePostCandidatePersonalDataMutation } = CandidatePersonalData;