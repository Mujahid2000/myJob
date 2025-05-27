// RTKQuery/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Company' | 'Applicant' ;
  phoneNumber: number
}
interface getUserByIdRequest {
  message: string,
  user: {
    _id: string;
  name: string;
  email: string;
  password: string;
  number: Number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  }
  
}
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'Company' | 'Applicant';
  phoneNumber: number
}

interface SinginRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string
  user: SignInUser
}

export interface SignInUser {
  _id: string
  name: string
  email: string
  password: string
  role: string
  phoneNumber: number
  createdAt: string
  updatedAt: string
  __v: number
}


interface SignupResponse {
  user: User;
  token: string;
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/user/userReg',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    singIn: builder.mutation<SignInResponse, SinginRequest>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getUserById: builder.query<getUserByIdRequest, string>({
      query: (email) => `/user/users/${email}`,
      providesTags: (result, error, email) => [{ type: 'User', email }],
    }),
  }),
});

export const { useSignupMutation, useGetUserByIdQuery,useSingInMutation } = authApiSlice;