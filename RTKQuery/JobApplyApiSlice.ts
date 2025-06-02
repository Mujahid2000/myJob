import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface postJobAppliedDataRequest{
    userId: string,
    email: string,
    jobId: string,
    resume_Id: string,
    coverLetter: string
}

interface postJobAppliedDataResponse {
    message: string,
    result: postJobAppliedDataRequest
}

export interface Root {
  jobs: Job[]
}

export interface Job {
  _id: string
  userId: string
  title: string
  salaryType: string
  minSalary: number
  maxSalary: number
  jobType: string
  location: string
  status: string
  logo: string
  applicationCount: number
}


export interface ApplicantListByJobPost {
  data: Applicant[]
}

export interface Applicant {
  _id: string
  userId: string
  date: string
  profilePicture: string
  experience: string
  education: string
  fullName: string
  title: string
  resumeLink: string
  resume_Id: string
}

export interface ApplicantDetails {
  success: boolean
  applicant: Applicant
}

export interface Applicant {
  _id: string
  email: string
  profilePicture: string
  portfolio: string
  fullName: string
  title: string
  mapLocation: string
  phoneNumber: string
  biography: string
  dateOfBirth: string
  country: string
  experience: string
  education: string
  gender: string
  maritalStatus: string
  socialLink: SocialLink[]
  resumeName: string
  resumeUrl: string,
  resumeId: string,
  resumeSize: number
  coverLetter: string
  ApplyDate: string
}

export interface SocialLink {
  platform: string
  url: string
  _id: string
}





export const jobApply = createApi({
    reducerPath: 'jobApply',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://job-server-1.onrender.com'
    }),
    tagTypes: ['jobSlice'],
    endpoints: (builder) =>({
       postJobApplyData: builder.mutation<postJobAppliedDataResponse, postJobAppliedDataRequest>({
        query: (applyData) =>({
            url: '/appliedJobs/jobAppliedJobPost',
            method: 'POST',
            body: applyData
        })
       }),
    // এখানে একটা জব পোস্ট প্রতি কতজন আবেদন করেছে তার মোট সংখ্যা দেখানো হয়েছে।
       getJobPostData: builder.query<Root, string>({
        query: (userId) =>({
            url: `appliedJobs/getUserJobPostData/${userId}`
        })
       }),
    //    একটা আবেদনে কতজন আবেদন করছে তার লিস্ট
       getJobPostApplicantListByJobId: builder.query<ApplicantListByJobPost, string>({
        query: (jobId) =>({
            
            url: `/appliedJobs/getJobApplicantData/${jobId}`
        })
       }),
    //   একজন আবেদনকারীর বিবরনী যে পোস্টে সে আবেদন করেছে
       getJobPostApplicantDetails: builder.query<ApplicantDetails, { userId: string; resume_Id: string }>({
        query: ({ userId, resume_Id }) => ({
            url:  `/appliedJobs/getApplicantDetails`,
            method: "GET",
            params: { userId, resumeId: resume_Id }
        })
       }),
       
    })
})


export const {usePostJobApplyDataMutation, useGetJobPostDataQuery, useGetJobPostApplicantListByJobIdQuery, useGetJobPostApplicantDetailsQuery} = jobApply