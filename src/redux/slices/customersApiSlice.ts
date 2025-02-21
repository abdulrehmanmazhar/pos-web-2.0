import { apiSlice } from "../apis/apiSlice";
import { setCustomers } from "./customersSlice";
export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getAllCustomers: builder.query({
            query: () =>({
                url: '/get-customers'
            }),
                        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                            try {
                                const result = await queryFulfilled;
                                // console.log(result);
                                dispatch(setCustomers(result.data.customers));
                            } catch (error) {
                                console.error("Error during customer reteival:", error);
                            }
                        },
            providesTags: ["Customers"],
        }),
        addCustomer: builder.mutation({
            query: data =>({
                url: '/add-customer',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ["Customers"],
        }),
        deleteCustomer: builder.mutation({
            query: id =>({
                url: `/delete-customer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Customers"],
        }),
        editCustomer: builder.mutation({
            query: data =>({
                url: `/edit-customer/${data.id}`,
                method: 'PUT',
                body:{...data}
            }),
            invalidatesTags: ["Customers"],
        }),
    })
})

export const {useAddCustomerMutation, useGetAllCustomersQuery, useDeleteCustomerMutation, useEditCustomerMutation} = customerApiSlice;