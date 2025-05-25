import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface NotificationRequest {
  userId: string;
  shortlist: boolean;
  jobsExpire: boolean;
  jobAlerts: boolean;
  savedProfile: boolean;
  rejected: boolean;
}

interface NotificationResponse {
  message: string;
  result: any; // ব্যাকএন্ড থেকে যেহেতু result আসছে, তাই data এর পরিবর্তে result
}

interface jobAlertsRequest {
    userId: string,
    jobRole: string,
    location: string
}

interface jobAlertsResponse {
    message: string,
    data: jobAlertsRequest
}


interface profilePrivacyRequest {
  userId: string,
  resumePublic: boolean,
  profilePublic: boolean
}

interface profilePrivacyResponse{
  message: string,
  data: profilePrivacyRequest
}

interface passwordDataRequest {
  userId: string,
  currentPassword: string,
  newPassword: string
}

interface passwordDataResponse {
  message: string,
  data: passwordDataRequest
}

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://serverjob.vercel.app/',
  }),
  tagTypes: ['notificationApi'],
  endpoints: (builder) => ({
    updateUserNotification: builder.mutation<NotificationResponse, NotificationRequest>({
      query: (notificationData) => ({
        url: `applicantData/updateNotification/${notificationData.userId}`,
        method: 'PATCH',
        body: {
          shortlist: notificationData.shortlist,
          jobsExpire: notificationData.jobsExpire,
          jobAlerts: notificationData.jobAlerts,
          savedProfile: notificationData.savedProfile,
          rejected: notificationData.rejected,
        },
      }),
    }),
    getUserNotification: builder.query<NotificationResponse, string>({
        query: (userId) =>({
            url: `/applicantData/getNotificationData/${userId}`
        })
    }),
    updateJobAlerts: builder.mutation<jobAlertsResponse, jobAlertsRequest>({
    query: (data) =>({
        url: `/applicantData/updateJobAlerts/${data.userId}`,
        method: 'PATCH',
        body: {
        jobRole: data.jobRole,
        location: data.location
        }
      })
    }),
    getJobAlertsData: builder.query<jobAlertsResponse, string>({
        query: (userId) => ({
            url: `/applicantData/getJobAlertsData/${userId}`
        })
    }),
    updateProfilePrivacy: builder.mutation<profilePrivacyResponse,profilePrivacyRequest >({
      query: (privacyData) =>({
        url: `/applicantData/privacyOnOf/${privacyData.userId}`,
        method: 'PATCH',
        body: {
          profilePublic: privacyData.profilePublic,
          resumePublic: privacyData.resumePublic
        }
      })
    }),
    getProfilePrivacyData: builder.query<profilePrivacyResponse, string>({
      query: (userId) =>({
        url: `/applicantData/getProfilePrivacyData/${userId}`
      })
    }),
    updatePassword: builder.mutation<passwordDataResponse, passwordDataRequest>({
      query: (passwordData) =>({
        url: `/applicantData/updatePassword/${passwordData.userId}`,
        method: 'PATCH',
        body: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }
      })
    })
  }),
});

export const { useUpdateUserNotificationMutation, useGetUserNotificationQuery, useUpdateJobAlertsMutation, useGetJobAlertsDataQuery, useUpdateProfilePrivacyMutation, useGetProfilePrivacyDataQuery, useUpdatePasswordMutation } = notificationApi;