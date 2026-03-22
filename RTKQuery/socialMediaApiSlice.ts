import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from './baseQuery';

export const socialMediaApiSlice = createApi({
    reducerPath: "socialMediaApi",
    baseQuery: baseQueryWithReauth,
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