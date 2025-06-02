// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface NotificationRequest {
//   message: string;
//   timestamp: string;
//   companyUser: string,
//   applicantId?: string;
//   jobId?: string;
// }

// export interface Notification {
//   id: string | undefined;
//   message: string;
//   timestamp: string;
//   companyUser: string,
//   applicantId?: string;
//   jobId?: string;
// }

// interface NotificationResponse {
//   message: string,
//   data: Notification[]
// }

// export const notificationApiSlice = createApi({
//     reducerPath: 'notificationApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
//     endpoints: (builder) => ({
//         postNotifications: builder.mutation<NotificationResponse, NotificationRequest>({
//             query: (data) => ({
//                 url: '/liveNotification/notification',
//                 method: "POST",
//                 body: data
//             }),
//         }),
       
//     }),
// });

// export const { usePostNotificationsMutation } = notificationApiSlice;