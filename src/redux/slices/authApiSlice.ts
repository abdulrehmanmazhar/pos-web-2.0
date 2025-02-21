import { apiSlice } from "../apis/apiSlice";
import { logout, setCredentials } from "./authSlice";
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credential =>({
                url: '/login',
                method: 'POST',
                body: {...credential}
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        setCredentials({
                            accessToken: result.data?.accessToken,
                            user: result.data?.user
                        })
                    );
                } catch (error) {
                    console.error("Error during registration:", error);
                }
            },
        }),
        logout: builder.mutation({
            query: ()=>({
                url:'/logout',
                method:'POST',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            },
        }),
    })
})

export const {useLoginMutation, useLogoutMutation} = authApiSlice;