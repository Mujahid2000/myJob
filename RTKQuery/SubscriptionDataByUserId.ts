import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface paymentsDataByUserId {
    id : string;
    userId : string;
    orderID : string;
    packageName : string;
    duration : string;
    price : string;
    status : string;
    createdAt : string;
    updatedAt : string;
    __v : number;
  }


export const SubscriptionDataByUserId = createApi({
    reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ['SubscriptionDataByUserId'],
    endpoints: builder =>({
        getSubscriptionDataByUserId: builder.query<paymentsDataByUserId[], string>({
            query: userId => `/data/payments/subscription/${userId}`
          }),
    })
})

export const {
    useGetSubscriptionDataByUserIdQuery
  } = SubscriptionDataByUserId