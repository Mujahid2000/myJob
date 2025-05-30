import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface candidateApply {
  success: boolean
  data: candidateJobApply[]
}

export interface candidateJobApply {
  _id: string
  jobId: string
  date: string
  logo: string
  jobTitle: string
  location: string
  minSalary: number
  maxSalary: number
  jobType: string
  status: string
}

export interface CandidateFavorite {
  success: boolean
  data: Favortite[]
}

export interface Favortite {
  companyId: string
  jobId: string
  email: string
  logo: string
  jobTitle: string
  location: string
  minSalary: number
  maxSalary: number
  jobType: string
  postedDate: string
  jobStatus: string
}


export const candidateJObApplyData = createApi({
    reducerPath: 'candidateJobApply',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://serverjob.vercel.app'
    }),
    tagTypes: ['candidateJob'],
    endpoints: (builder) =>({
        getCandidateJObApplyData: builder.query<candidateApply, string>({
            query: (userId) =>({
                url: `/candidateJobApplyData/candidateApplyJobList/${userId}`
            })
        }),
        getCandidateFavoriteJobList: builder.query<CandidateFavorite, string>({
            query: (email) =>({
                url: `/candidateJobApplyData/candidateFavoriteJobList/${email}`
            })
        })
    })
})

export const {useGetCandidateJObApplyDataQuery, useGetCandidateFavoriteJobListQuery} = candidateJObApplyData;