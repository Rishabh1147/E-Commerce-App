import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/apiTypes";


export const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/order/`}),
    tagTypes:["orders"],
    endpoints:(builder) => ({

        newOrder: builder.mutation<MessageResponse,NewOrderRequest>({
            query: (order) => ({
                url:"new", 
                method:"POST",
                body:order
            }),
            invalidatesTags: ["orders"],
        }),

        updateOrder: builder.mutation<MessageResponse,UpdateOrderRequest>({
            query: ({userID,orderID}) => ({
                url:`${orderID}?id=${userID}`, 
                method:"PUT",
            }),
            invalidatesTags: ["orders"],
        }),

        deleteOrder: builder.mutation<MessageResponse,UpdateOrderRequest>({
            query: ({userID,orderID}) => ({
                url:`${orderID}?id=${userID}`, 
                method:"DELETE",
            }),
            invalidatesTags: ["orders"],
        }),

        myOrders: builder.query<AllOrdersResponse,string>({
            query: (id) => (`my?id=${id}`),
            providesTags: ["orders"],
        }),

        allOrders: builder.query<AllOrdersResponse,string>({
            query: (id) => (`all?id=${id}`),
            providesTags: ["orders"],
        }),
        OrderDetails: builder.query<OrderDetailsResponse,string>({
            query: (id) => id,
            providesTags: ["orders"],
        }),
    }),

});

export const {
    useNewOrderMutation,
    useDeleteOrderMutation,
    useUpdateOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useOrderDetailsQuery,
} = orderAPI;