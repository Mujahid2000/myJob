import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';


interface orderApiResponse {
    success: boolean;
    orderID: string
}

interface orderData {
    price: string; 
    userId: string;
    packageName: string;
    duration: string;
}

interface captureOrderData {
    orderID: string;
    userId: string;
    packageName: string;
    duration: string;
    price: string;
}




export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) =>({
        createOrder: builder.mutation<orderApiResponse ,orderData >({
            query: ({price, userId, packageName, duration}) =>({
                url: '/api/paypal/create-order',
                method: 'POST',
                body: {price: Number(price), userId, packageName, duration}
            }),
            transformResponse: (response: { data: orderApiResponse }) => response.data,
        }),
        captureOrder: builder.mutation<any, captureOrderData>({
            query: ({orderID, userId, packageName, duration, price}) =>({
                url:'/api/paypal/capture-order',
                method: 'POST',
                body: {orderID, userId, packageName, duration, price: Number(price)}
            }),
            transformResponse: (response: { data: any }) => response.data,
        }) 
    })
})


export const {useCaptureOrderMutation, useCreateOrderMutation} = paymentApi;