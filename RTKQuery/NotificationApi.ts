import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { secureUrl } from './JwtHeader';

export interface NotificationResponse {
  message: string
  data: Notification[]
}

export interface Notification {
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
    baseQuery: secureUrl,
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationResponse, string>({
            query: (userId) => ({
                url: `/notification/notificationData/${userId}`,
            }),
        }),
       
    }),
});

export const { useGetNotificationsQuery } = notificationApiSlice;