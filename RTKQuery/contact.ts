import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
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