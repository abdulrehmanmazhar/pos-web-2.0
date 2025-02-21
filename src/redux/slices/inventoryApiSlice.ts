import { apiSlice } from "../apis/apiSlice";
import { setInventories } from "./inventorySlice";
export const inventoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getAllProducts: builder.query({
            query: () =>({
                url: '/get-products' 
            }),
                        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                            try {
                                const result = await queryFulfilled;
                                console.log(result);
                                dispatch(setInventories(result.data.products));
                            } catch (error) {
                                console.error("Error during inventory reteival:", error);
                            }
                        },
            providesTags: ["Inventories"],
        }),
        addProduct: builder.mutation({
            query: data =>({
                url: '/add-product',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ["Inventories"],
        }),
        deleteProduct: builder.mutation({
            query: id =>({
                url: `/delete-product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Inventories"],
        }),
        editProduct: builder.mutation({
            query: data =>({
                url: `/edit-product/${data.id}`,
                method: 'PUT',
                body:{...data}
            }),
            invalidatesTags: ["Inventories"],
        }),
        restockProduct: builder.mutation({
            query: data =>({
                url: `/restock-product/${data.id}`,
                method: 'PUT',
                body:{...data}
            }),
            invalidatesTags: ["Inventories"],
        }),
    })
})

export const {useGetAllProductsQuery, useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useRestockProductMutation} = inventoryApiSlice;
