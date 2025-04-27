import { apiSlice } from "../apis/apiSlice";
import { setTargets } from "./targetSlice";
export const targetApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
                getAllTargets: builder.query({
                    query: () =>({
                        url: '/gell-all-targets'
                    }),
                                async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                                    try {
                                        const result = await queryFulfilled;
                                        console.log(result);
                                        dispatch(setTargets(result.data.targets));
                                    } catch (error) {
                                        console.error("Error during user reteival:", error);
                                    }
                                },
                    providesTags: ["Targets"],
                }),
                addTarget: builder.mutation({
                    query: data =>({
                        url: `/create-target/${data.userId}`,
                        method: 'POST',
                        body: {...data}
                    }),
                    invalidatesTags: ["Targets"],
                })
    })
})

export const {useGetAllTargetsQuery, useAddTargetMutation} = targetApiSlice;