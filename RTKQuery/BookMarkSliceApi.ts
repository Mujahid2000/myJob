import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface bookmarkTypesRequest {
    userId: string,
    companyId: string,
    jobId: string,
    email: string
    
}
interface bookmarkTypesResponse {
    success: boolean;
    message: string;
    data: {
    userId: string,
    companyId: string,
    jobId: string,
    email: string
  }
}

interface Bookmark {
  userId: string;
  companyId: string;
  jobId: string;
  email: string;
}

interface BookmarkResponse {
  success: boolean;
  message: string;
  data?: Bookmark;
}
export const bookMarkApiSlice = createApi({
  reducerPath: 'bookmark',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://job-server-497l.vercel.app' }),
  tagTypes: ['bookMarkApi'],
  endpoints: builder => ({
    bookMarkDataPost: builder.mutation<bookmarkTypesResponse, bookmarkTypesRequest>({
      query: data => ({
        url: '/jobs/bookMarkPost',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['bookMarkApi'],
    }),
    getBookMarkData: builder.query<BookmarkResponse, string>({
      query: (email) => `/jobs/getBookMarkData/${email}`,
      providesTags: (result, error, email) => [{ type: 'bookMarkApi', id: email }],
    })
  })
})


export const { useBookMarkDataPostMutation, useGetBookMarkDataQuery } = bookMarkApiSlice