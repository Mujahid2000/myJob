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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://job-server-1.onrender.com' }),
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