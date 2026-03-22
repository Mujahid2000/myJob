// RTKQuery/JWT.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery';

export interface UserAuth {
  email: string,
  password: string
}

export interface TokenResponse {
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

export const JwtAuth = createApi({
  reducerPath: 'jwtApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postUserToken: builder.mutation<TokenResponse, UserAuth>({
      query: (userData) => ({
        url: "/jwt/token",
        method: "POST",
        body: userData
      }),
    }),
    refreshToken: builder.mutation<TokenResponse, string>({
      query: (refreshToken) => ({
        url: "/jwt/refresh",
        method: "POST",
        body: { refreshToken }
      }),
    }),
  }),
})

export const { usePostUserTokenMutation, useRefreshTokenMutation } = JwtAuth