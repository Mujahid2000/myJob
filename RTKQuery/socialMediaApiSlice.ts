import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialMediaApiSlice = createApi({
    reducerPath: "socialMediaApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
    tagTypes: ["SocialMedia"],
    endpoints: (builder) =>({
        postSocialMediaInfo: builder.mutation({
            query: (formData) =>({
                url: "/companyData/socialMediaInfo",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["SocialMedia"],
            })}
        )
    })


    export const {usePostSocialMediaInfoMutation} = socialMediaApiSlice;