import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../slices/authSlice";

export const baseUrl = 'https://pos-server-2-0.onrender.com/api/v1'
const baseQuery = fetchBaseQuery({
    baseUrl,
    // : 'https://pos-server-2-0.onrender.com/api/v1',
    credentials: 'include',
    prepareHeaders:(headers, {getState})=>{
        const token = getState().auth.token
        if(token){
            headers.set("Authorization", `Bearer${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions );

    if(result?.error?.status === 401){
        console.log('sending refresh token');

        // send refresh request

        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log("refreshed");
        if(refreshResult?.data){
            const user = api.getState().auth.user

            api.dispatch(setCredentials({...refreshResult.data ,user}));
            // retry original query 
            result = await baseQuery(args, api, extraOptions);

        }else{
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
