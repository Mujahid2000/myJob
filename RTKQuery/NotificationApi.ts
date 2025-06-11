import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NotificationResponse {
  message: string
  data: Daum[]
}

export interface Daum {
  _id: string
  id: string
  companyUser: string
  applicantId: string
  jobId: string
  message: string
  Name: string
  time: string
  companyName: string
}


//notification data get
export const notificationApiSlice = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationResponse, string>({
            query: (userId) => ({
                url: `/notification/notificationData/${userId}`,
            }),
        }),
       
    }),
});

export const { useGetNotificationsQuery } = notificationApiSlice;