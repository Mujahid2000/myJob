import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://serverjob.vercel.app/api/paypal'
    }),
    endpoints: (builder) =>({
        createOrder: builder.mutation<orderApiResponse ,orderData >({
            query: ({price, userId, packageName, duration}) =>({
                url: '/create-order',
                method: 'POST',
                body: {price, userId, packageName, duration}
            }),
        }),
        captureOrder: builder.mutation<orderApiResponse,captureOrderData>({
            query: ({orderID, userId, packageName, duration, price}) =>({
                url:'/capture-order',
                method: 'POST',
                body: {orderID, userId, packageName, duration, price}

            })
        }) 
    })
})


export const {useCaptureOrderMutation, useCreateOrderMutation} = paymentApi;