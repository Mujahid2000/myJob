import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

interface PostJobApiResponse {
    title: string;
    tags: string;
    jobRole: string;
    minSalary: string;
    maxSalary: string;
    salaryType: string;
    education: string;
    experience: string;
    jobType: string;
    jobLevel: string;
    vacancies: string;
    expiryDate: string;
    applyMethod: string;
    description: string;
    responsibilities: string;
    biography: string;
}

interface PostJobRequest {
    title: string;
    tags: string;
    jobRole: string;
    minSalary: string;
    maxSalary: string;
    salaryType: string;
    education: string;
    experience: string;
    jobType: string;
    jobLevel: string;
    vacancies: string;
    expiryDate: string;
    applyMethod: string;
    description: string;
    responsibilities: string;
    biography: string;
}

export const postJobApi = createApi({
    reducerPath: "postJob",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        postJob: builder.mutation<PostJobApiResponse, PostJobRequest>({
            query: (jobData) => ({
                url: "/jobs/jobPost",
                method: "POST",
                body: jobData,
            }),
        }),
    }),
});

export const { usePostJobMutation } = postJobApi;
