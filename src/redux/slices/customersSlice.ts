// import { createSlice } from "@reduxjs/toolkit";
// import { paginator } from "../../utils/paginator";

// function Next(current, highest) {
//     return current < highest ? current + 1 : current; // Ensure it does not exceed highest
// }

// function Prev(current, lowest) {
//     return current > lowest ? current - 1 : current; // Ensure it does not go below lowest
// }

// const customersSlice = createSlice({
//     name: "customers",
//     initialState: {
//         customers: [],
//         search: '',
//         route: '',
//         rowNumbers: 9,
//         order: -1,
//         pageIndex: 1,
//         maxPages: 1,
//         rowsPerPage : 9,
//     },
//     reducers: {
//         setCustomers: (state, action) => {
//             state.customers = action.payload; 
//             state.maxPages = paginator(state.customers, state.rowsPerPage).length
//         },
//         setSearch: (state, action) => {
//             state.search = action.payload;
//         },
//         setRoute: (state, action) => {
//             state.route = action.payload;
//         },
//         setRowNumbers: (state, action) => {
//             state.rowNumbers = action.payload;
//             state.maxPages = paginator(state.customers, action.payload).length
//         },
//         setOrder: (state, action) => {
//             state.order = action.payload;
//         },
//         next: (state) => {
//             state.pageIndex = Next(state.pageIndex, state.maxPages);
//         },
//         prev: (state) => {
//             state.pageIndex = Prev(state.pageIndex, 1);
//         },
//         setRowsPerPage: (state, action) => {
//             state.rowsPerPage = action.payload;
//         },
//     }
// });

// export default customersSlice.reducer;
// export const { setCustomers, setSearch, setRoute, setRowNumbers, setOrder, next, prev, setRowsPerPage } = customersSlice.actions;

// export const selectCurrentCustomers = (state) => state.customers.customers;
// export const selectCurrentCustomerSearch = (state) => state.customers.search;
// export const selectCurrentCustomerPageIndex = (state) => state.customers.pageIndex;
// export const selectCurrentCustomerMaxPages = (state) => state.customers.maxPages;
// export const selectCurrentCustomerRowsPerPage = (state) => state.customers.rowsPerPage;

import { createSlice } from "@reduxjs/toolkit";
import { paginator } from "../../utils/paginator";

const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        search: '',
        route: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 9,
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload;
            state.maxPages = Math.ceil(state.customers.length / state.rowsPerPage) || 1;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setRoute: (state, action) => {
            state.route = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
            state.maxPages = Math.ceil(state.customers.length / state.rowsPerPage) || 1;
            state.pageIndex = Math.min(state.pageIndex, state.maxPages); // Adjust if current page exceeds max
        },
        next: (state) => {
            state.pageIndex = Math.min(state.pageIndex + 1, state.maxPages);
        },
        prev: (state) => {
            state.pageIndex = Math.max(state.pageIndex - 1, 1);
        },
    }
});

export default customersSlice.reducer;
export const { setCustomers, setSearch, setRoute, setOrder, setRowsPerPage, next, prev } = customersSlice.actions;

// Selectors
export const selectCustomersState = (state) => state.customers;
export const selectCurrentCustomers = (state) => state.customers.customers;
export const selectCurrentCustomerSearch = (state) => state.customers.search;
export const selectCurrentCustomerRoute = (state) => state.customers.route;
export const selectCurrentCustomerPageIndex = (state) => state.customers.pageIndex;
export const selectCurrentCustomerMaxPages = (state) => state.customers.maxPages;
export const selectCurrentCustomerRowsPerPage = (state) => state.customers.rowsPerPage;
