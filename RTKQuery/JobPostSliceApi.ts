import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PostJobRequest {
    userId: string;
    companyId: string;
    jobTitle: string;
    tags?: string[]; // Optional array of strings
    jobRole: string;
    salaryType: string;
    minSalary: number;
    maxSalary: number;
    education: string;
    experience: string;
    jobType: string;
    expireDate: string; // ISO string or date format compatible with Date
    vacancy: string;
    jobLevel: string;
    description: string;
    responsibilities: string;
    location: string;
    status?: string; // Optional, defaults to 'open' in schema
}

export interface PostJobResponse {
    success: boolean;
    message: string;
    data: {
        userId: string;
        companyId: string;
        jobTitle: string;
        tags: string[];
        jobRole: string;
        salaryType: string;
        minSalary: number;
        maxSalary: number;
        education: string;
        experience: string;
        jobType: string;
        expireDate: Date;
        vacancy: string;
        jobLevel: string;
        description: string;
        responsibilities: string;
        location: string;
        postedDate: Date;
        status: string;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    };
}




interface PromotedJobsResponse {
    userId: string,
    jobId: string,
    companyId: string,
    promotedSystem: string
}


interface PromotedJobsRequest {
    success: boolean;
    message: string;
    data: {
    userId: string,
    jobId: string,
    companyId: string,
    promotedSystem: string,
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    }
}

// Define types for the GET method
export interface GetCompanyDataResponse {
    _id: string;
    name: string;
    industry: string;
    mapLocation: string;
}

export const JobPostApi = createApi({
    reducerPath: 'jobpostapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['jobPost'],
    endpoints: (builder) => ({
        getCompanyData: builder.query<GetCompanyDataResponse, string>({
            query: (id) => `/getCompanyData/companyDataById/${id}`
        }),
        postAJob: builder.mutation<PostJobResponse, PostJobRequest>({
            query: (formData) => ({
                url: '/jobs/jobPost',
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: { data: PostJobResponse }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg,
              ) => response.status,
            invalidatesTags: ['jobPost'],
        }),
        jobPostPromoted: builder.mutation<PromotedJobsResponse,PromotedJobsRequest >({
            query: (data) =>({
                url: '/jobs/PromotedJObs',
                method: 'POST',
                body: data
            })
        }),
        getPostJob: builder.query<PostJobResponse, string>({
            query: () =>'/jobs/getAllPostedData'
        })
    })
});

export const { usePostAJobMutation, useGetCompanyDataQuery, useJobPostPromotedMutation, useGetPostJobQuery } = JobPostApi;