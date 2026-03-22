import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from './baseQuery';

interface ContactData {
    _id: string;
    userId: string;
    mapLocation: string;
    phoneNumber: number | undefined,
    email: string;
    __v: string;
}

interface ContactResponse {
    message: string;
    data: ContactData;
}

interface ContactFormData {
    userId: string;
    mapLocation: string;
    email: string;
}

export const contact = createApi({
    reducerPath: "contactApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["contact"],
    endpoints: (builder) => ({
        postContactInfo: builder.mutation<ContactResponse, ContactFormData>({
            query: (formData) => ({
                url: "/companyData/contactInfo",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["contact"],
        }),
        getUserContactData: builder.query<ContactResponse, string>({
            query: (email) => ({
                url: `/companyData/getContactData/${email}`,
            }),
        }),
    }),
});

export const { usePostContactInfoMutation, useGetUserContactDataQuery } = contact;