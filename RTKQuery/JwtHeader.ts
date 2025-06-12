// baseQuery.ts
import { RootState } from '@/Store/Store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const secureUrl = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).jwtSet.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
