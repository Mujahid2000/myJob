import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

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
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, string>({
      query: (userId) => ({
        url: `/notification/notificationData/${userId}`,
      }),
    }),

  }),
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } = notificationApiSlice;
