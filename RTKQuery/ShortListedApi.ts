import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface shortlistRequest {
    jobId: string;
    userId: string;
    resumeId: string;
    email: string;
    applicantId: string;
}

export interface shortlistResponse {
    message: string;
    result: shortList[];
}

export interface ShortListResponseData {
    data: shortList[];
}

export interface shortList {
    _id: string;
    userId: string;
    jobId: string;
    profilePicture: string;
    fullName: string;
    education: string;
    experience: string;
    title: string;
    resumeLink: string;
    resumeId: string; // Changed from resume_Id to resumeId
    applicantId: string;
}

export interface ShortlistingCandidateDetails {
    success: boolean;
    applicant: Applicant;
}

export interface Applicant {
    _id: string;
    biography: string;
    dateOfBirth: string;
    country: string;
    experience: string;
    education: string;
    gender: string;
    maritalStatus: string;
    socialLink: SocialLink[];
    resumeName: string;
    resumeUrl: string;
    resumeSize: number;
    resumeId: string; // Changed from resume_Id to resumeId
    coverLetter: string;
    ApplyDate: string;
    profilePicture: string;
    portfolio: string;
    fullName: string;
    title: string;
    email: string;
    userId: string;
    phoneNumber: string,
    mapLocation: string
}

export interface SocialLink {
    platform: string;
    url: string;
    _id: string;
}

export interface saveCandidateProfileRequest{
  userId: string,
  applicantId: string,
}


export interface saveCandidateProfileResponse {
  message: string
  data: profileResponse[]
}

export interface profileResponse {
  _id: string
  applicantId: string
  fullName: string
  profilePicture: string
  title: string
}


export interface ProfileDelete {
  message: string
}



export const shortListed = createApi({
    reducerPath: 'shortListed',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['shortlist'],
    endpoints: (builder) => ({
        postShortListedData: builder.mutation<shortlistResponse, shortlistRequest>({
            query: (shortListedData) => ({
                url: '/shortList/postShortListedData',
                method: "POST",
                body: {
                    jobId: shortListedData.jobId,
                    userId: shortListedData.userId,
                    resumeId: shortListedData.resumeId,
                    email: shortListedData.email,
                    applicantId: shortListedData.applicantId
                }
            })
        }),
        getShortListedData: builder.query<ShortListResponseData, string>({
            query: (jobId) => ({
                url: `/shortList/getShortListedData/${jobId}`
            })
        }),
        getShortListedCandidateDetails: builder.query<ShortlistingCandidateDetails, { userId: string; resumeId: string }>({
            query: (applicantDetailsData) => ({
                url: '/shortList/getShortListedCandidateDetails',
                method: "GET",
                params: { userId: applicantDetailsData.userId, resumeId: applicantDetailsData.resumeId } // Fixed resume_Id to resumeId
            })
        }),
        saveCandidateProfile: builder.mutation<saveCandidateProfileResponse, saveCandidateProfileRequest>({
          query: (data) =>({
            url: '/shortList/postSaveCandidateProfile',
            method: "POST",
            body: data
          }),
          invalidatesTags: ['shortlist'],
        }),
        getSaveCandidateProfile: builder.query<saveCandidateProfileResponse, string>({
          query: (userId) =>({
            url:  `/shortList/getSavedCandidateProfiles/${userId}`
          }),
          providesTags: ['shortlist'],
        }),
        deleteSaveProfile: builder.mutation<ProfileDelete, string>({
            query: (id) =>({
                url: `/shortList/deleteSavedCandidateProfile/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['shortlist'],
        })
    })
});

export const { usePostShortListedDataMutation, useGetShortListedDataQuery, useGetShortListedCandidateDetailsQuery, useSaveCandidateProfileMutation, useGetSaveCandidateProfileQuery, useDeleteSaveProfileMutation } = shortListed;