import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

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




const axiosBaseQuery = async ({ url, method, body }: { url: string; method: string; body?: any }) => {
  try {
    const response = await axios({
      url: `/api/paypal/${url}`,
      method,
      data: body,
      headers: { 'Content-Type': 'application/json' },
    });
    return { data: response.data };
  } catch (error: any) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || { message: error.message },
      },
    };
  }
};


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: axiosBaseQuery,
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