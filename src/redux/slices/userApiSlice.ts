import { apiSlice } from "../apis/apiSlice";
import { setUsers } from "./userSlice";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getAllUsers: builder.query({
            query: () =>({
                url: '/get-all-users-admin'
            }),
                        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                            try {
                                const result = await queryFulfilled;
                                // console.log(result);
                                dispatch(setUsers(result.data.users));
                            } catch (error) {
                                console.error("Error during user reteival:", error);
                            }
                        },
            providesTags: ["User"],
        }),
        addUser: builder.mutation({
            query: data =>({
                url: '/add-user-admin',
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: id =>({
                url: `/delete-user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["User"],
        }),
        updateUserRole: builder.mutation({
            query: data =>({
                url: `/update-user-role`,
                method: 'PUT',
                body: { ...data}
            }),
            invalidatesTags: ["User"],
        }),
        verifyUser: builder.mutation({
            query: id =>({
                url: `/verify-user/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["User"],
        }),
        assignRoute: builder.mutation({
            query: data =>({
                url: `/assign-route/${data.id}`,
                method: 'PUT',
                body: { ...data}
            }),
            invalidatesTags: ["User"],
        }),
        deleteAssignedRoute: builder.mutation({
            query: data =>({
                url: `/delete-assigned-route/${data.id}/${data.index}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["User"],
        }),
    })
})

export const {useGetAllUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserRoleMutation, useVerifyUserMutation, useAssignRouteMutation, useDeleteAssignedRouteMutation} = userApiSlice;
