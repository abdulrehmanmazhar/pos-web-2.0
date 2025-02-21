import { apiSlice } from "../apis/apiSlice";
import { setOrders } from "./orderSlice";
// import { setCustomers } from "./customersSlice";
export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getAllOrders: builder.query({
            query: () =>({
                url: '/get-orders'
            }),
                        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                            try {
                                const result = await queryFulfilled;
                                console.log(result);
                                dispatch(setOrders(result.data.orders));
                            } catch (error) {
                                console.error("Error during customer reteival:", error);
                            }
                        },
            providesTags: ["Orders"],
        }),
        addCart: builder.mutation({
            query: data =>({
                url: `/fill-cart/${data.id}`,
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ["Orders"],
        }),
        deleteCart: builder.mutation({
            query: data =>({
                url: `/delete-cart/${data.id}/${data.index}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Orders"],
        }),
        addOrder: builder.mutation({
            query: data =>({
                url: `/add-order/${data.id}`,
                method: 'POST',
                body:{...data}
            }),
            invalidatesTags: ["Orders"],
        }),
        deleteOrder: builder.mutation({
            query: id =>({
                url: `/delete-order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Orders"],
        }),
        addOrderPayment: builder.mutation({
            query: data =>({
                url: `/add-order-payment/${data.id}`,
                method: 'POST',
                body:{...data}
            }),
            invalidatesTags: ["Orders"],
        }),
        returnOrderUdhar: builder.mutation({
            query: data =>({
                url: `/return-order-udhar/${data.id}`,
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ["Orders"],
        }),
    })
})

export const {useGetAllOrdersQuery, useAddCartMutation, useDeleteCartMutation, useAddOrderMutation, useDeleteOrderMutation, useAddOrderPaymentMutation, useReturnOrderUdharMutation} = orderApiSlice;