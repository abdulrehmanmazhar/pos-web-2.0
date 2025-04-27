import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        search: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 5,
        date: '',
        payments: []  // Changed from `orders` to `payments`
    },
    reducers: {
        setPaymentsSearch: (state, action) => {
            state.search = action.payload;
        },
        setPaymentsRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
            state.maxPages = Math.ceil(state.payments.length / state.rowsPerPage) || 1;
            state.pageIndex = Math.min(state.pageIndex, state.maxPages); // Adjust if current page exceeds max
        },
        paymentsNext: (state) => {
            state.pageIndex = Math.min(state.pageIndex + 1, state.maxPages);
        },
        paymentsPrev: (state) => {
            state.pageIndex = Math.max(state.pageIndex - 1, 1);
        },
        setPaymentsDate: (state, action) => {
            state.date = action.payload;
        }
    }
});

export default paymentSlice.reducer;
export const { setPaymentsSearch, setPaymentsRowsPerPage, paymentsNext, paymentsPrev, setPaymentsDate } = paymentSlice.actions;

// Selectors (Updated to use `payments` instead of `orders`)
export const selectCurrentPayments = (state) => state.payments.payments;
export const selectCurrentPaymentsRowsPerPage = (state) => state.payments.rowsPerPage;
export const selectCurrentPaymentsMaxPages = (state) => state.payments.maxPages;
export const selectCurrentPaymentsPageIndex = (state) => state.payments.pageIndex;
export const selectCurrentPaymentsSearch = (state) => state.payments.search;
export const selectCurrentPaymentsDate = (state) => state.payments.date;
