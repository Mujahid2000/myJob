import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

interface paymentsDataByUserIdResponse {
    data : paymentsDataByUserId[];
    message : string;
    status : number;
}

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
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SubscriptionDataByUserId'],
    endpoints: builder =>({
        getSubscriptionDataByUserId: builder.query<paymentsDataByUserIdResponse, string>({
            query: userId => `/data/payments/subscription/${userId}`
          }),
    })
})

export const {
    useGetSubscriptionDataByUserIdQuery
  } = SubscriptionDataByUserId