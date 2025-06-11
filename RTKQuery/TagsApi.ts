import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TagsApiResponse {
  success: boolean
  message: string
  data: Daum[]
}

export interface Daum {
  _id: string
  name: string
}




export const TagsApi = createApi({
    reducerPath: 'tagsName',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    tagTypes: ['Tags'],
    endpoints:(builder)=>({
        getAllTags:builder.query<TagsApiResponse, void>({
            query:()=>('/tags/tagsName'),
            providesTags:['Tags']
        })
    })
})

export const { useGetAllTagsQuery } = TagsApi;