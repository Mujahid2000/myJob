import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialMediaApiSlice = createApi({
    reducerPath: "socialMediaApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://serverjob.vercel.app" }),
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