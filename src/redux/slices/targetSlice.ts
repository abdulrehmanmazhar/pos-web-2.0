import { createSlice } from "@reduxjs/toolkit";

const targetSlice = createSlice({
    name: 'targets',
    initialState:{
        search: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 5,
        date: '',
        targets: [] 
    },
    reducers:{
        setTargets:(state, action)=>{
            state.targets = action.payload;
        }
    }
})

export const {setTargets} = targetSlice.actions;
export default targetSlice.reducer;

export const selectCurrentTargets = (state)=>state.targets.targets;