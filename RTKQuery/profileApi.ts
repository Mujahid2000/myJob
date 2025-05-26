import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define interfaces
export interface Resume {
  message: string;
  data: {
    _id: string;
    resumeName: string;
    resumeUrl: string;
    size: number; // Size in bytes
  }[];
}

interface UploadCvRequest {
  resumeName: string;
  file: File;
  userId: string;
  email: string;
}

interface UploadCvResponse {
  message: string;
  resume: {
    userId: string;
    email: string;
    resumeName: string;
    resumeUrl: string;
    size: number;
    _id: string;
    __v: number;
  };
}

interface ProfileData {
  fullName: string;
  title: string;
  experience: string;
  education: string;
  portfolio: string;
  profilePicture?: File;
  userId: string;
  email: string;
}

interface ProfileDataResponse {
  _id: string;
  fullName: string;
  title: string;
  experience: string;
  education: string;
  portfolio: string;
  profilePicture?: string; // URL or path
  userId: string;
  email: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Resumes', 'Profile'],
  endpoints: (builder) => ({
    getResumes: builder.query<Resume, string>({
      query: (email) => `/applicantData/resumes/${email}`,
      providesTags: ['Resumes'],
    }),
    uploadCv: builder.mutation<UploadCvResponse, UploadCvRequest>({
      query: ({ resumeName, file, userId, email }) => {
        const formData = new FormData();
        formData.append('resumeName', resumeName);
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('email', email);

        return {
          url: '/applicantData/uploadCv',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Resumes'],
    }),
    updateProfile: builder.mutation<void, ProfileData>({
      query: (profileData) => {
        const formData = new FormData();
        formData.append('fullName', profileData.fullName);
        formData.append('title', profileData.title);
        formData.append('experience', profileData.experience);
        formData.append('education', profileData.education);
        formData.append('portfolio', profileData.portfolio);
        if (profileData.profilePicture) {
          formData.append('profilePicture', profileData.profilePicture);
        }
        formData.append('userId', profileData.userId);
        formData.append('email', profileData.email);

        return {
          url: '/applicantData/applicant',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Profile'],
    }),
    getProfileData: builder.query<ProfileDataResponse, string>({
      query: (email) => `/applicantData/applicant/${email}`,
    }),
  }),
});

export const { useGetResumesQuery, useUploadCvMutation, useUpdateProfileMutation, useGetProfileDataQuery } = profileApi;