import { stat } from 'fs';
// RTKQuery/apiSlice.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Company' | 'Applicant' ;
  phoneNumber: number
}
interface getUserByIdRequest {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber?: number;
    createdAt: string;
    updatedAt: string;
  };
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
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: SignInUser;
    accessToken: string;
    refreshToken: string;
  };
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


export interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AllUser[];
}

export interface AllUser {
  _id: string
  name: string
  email: string
  role: string
  packageName?: string
  date: string
  companyName?: string
  status: string
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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
    getUser: builder.query<UserResponse, void>({
      query: () => '/user/users',
      providesTags: ['User'],
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, { token: string; password: any }>({
      query: (body) => ({
        url: '/user/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useGetUserByIdQuery, useSingInMutation, useGetUserQuery, useForgotPasswordMutation, useResetPasswordMutation } = authApiSlice;