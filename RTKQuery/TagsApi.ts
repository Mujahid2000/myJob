import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TagsApiResponse {
    _id: string;
    name: string;
}



export const TagsApi = createApi({
    reducerPath: 'tagsName',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
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