import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialMediaApiSlice = createApi({
    reducerPath: "socialMediaApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
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