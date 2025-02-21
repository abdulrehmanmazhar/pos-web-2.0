import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState:{
        users: [],
        search: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 9,
    },
    reducers:{
        setUsers: (state, action) => {
            state.users = action.payload;
            state.maxPages = Math.ceil(state.users.length / state.rowsPerPage) || 1;
        },
        setUserSearch: (state, action) => {
            state.search = action.payload;
        },
        setUserRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
            state.maxPages = Math.ceil(state.users.length / state.rowsPerPage) || 1;
            state.pageIndex = Math.min(state.pageIndex, state.maxPages); // Adjust if current page exceeds max
        },
        userNext: (state) => {
            state.pageIndex = Math.min(state.pageIndex + 1, state.maxPages);
        },
        userPrev: (state) => {
            state.pageIndex = Math.max(state.pageIndex - 1, 1);
        },
    }
})

export default userSlice.reducer;
export const {setUsers, setUserRowsPerPage, setUserSearch, userNext, userPrev} = userSlice.actions;

export const selectCurrentUsers = state => state.users.users;
export const selectCurrentUsersRowsPerPage = state => state.users.rowsPerPage;
export const selectCurrentUsersMaxPages = state => state.users.maxPages;
export const selectCurrentUsersPageIndex = state => state.users.pageIndex;
export const selectCurrentUsersSearch = state => state.users.search;
