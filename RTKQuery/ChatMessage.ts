import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface CustomerProfile {
  success: boolean
  data: Customer[]
}

export interface Customer {
  _id: string
  senderId: string
  email: string
  name: string
  picture: string
}



export interface AdminMessages {
  message: string
  data: Admin[]
}

export interface Admin {
  _id: string
  senderId: string
  receiverId: string
  role: string
  email: string
  name: string
  message: string
  id: string
  isAdmin: boolean
  isRead: boolean
  dateWithTime: string
  createdAt: string
  updatedAt: string
  __v: number
}


export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
    endpoints: (builder) => ({
        getMessages: builder.query<CustomerProfile, string>({
            query: (userid) => ({
                url: `/notification/customerProfile/${userid}`
            }),
        }),
        getAdminMessages: builder.query<AdminMessages, {userid:string, adminId: string}>({
          query: ({ userid, adminId }) => ({
            url: `/notification/adminMessageForCustomer`,
            method: "GET",
            params: { userid, adminId }
          }) 
        }) 
    }),
});

export const { useGetMessagesQuery, useGetAdminMessagesQuery } = chatApi;