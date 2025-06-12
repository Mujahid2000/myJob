// baseQuery.ts
import { RootState } from '@/Store/Store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const secureUrl = fetchBaseQuery({
  baseUrl: 'https://job-server-1.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).jwtSet.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
