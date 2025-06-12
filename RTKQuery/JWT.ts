// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface UserAuth{
    email: string,
    password: string
}

export interface Token {
  token: string
}


// Define a service using a base URL and expected endpoints
export const JwtAuth = createApi({
  reducerPath: 'jwtApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  endpoints: (builder) => ({
    postUserToken: builder.mutation<Token, UserAuth>({
      query: (userData) => ({
        url: "/jwt/token",
        method: "POST",
        body: userData
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostUserTokenMutation } = JwtAuth