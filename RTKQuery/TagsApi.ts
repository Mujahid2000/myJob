import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

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
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Tags'],
    endpoints:(builder)=>({
        getAllTags:builder.query<TagsApiResponse, void>({
            query:()=>('/tags/tagsName'),
            providesTags:['Tags']
        })
    })
})

export const { useGetAllTagsQuery } = TagsApi;