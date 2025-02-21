import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        search: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 5,
        date:'',
        routeSearch: '',
        createdBySearch: '',
        deliveryDateSearch: '',
    },
    reducers:{
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setOrdersSearch: (state, action) => {
            state.search = action.payload;
        },
        setOrdersRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
            state.maxPages = Math.ceil(state.orders.length / state.rowsPerPage) || 1;
            state.pageIndex = Math.min(state.pageIndex, state.maxPages); // Adjust if current page exceeds max
        },
        ordersNext: (state) => {
            state.pageIndex = Math.min(state.pageIndex + 1, state.maxPages);
        },
        ordersPrev: (state) => {
            state.pageIndex = Math.max(state.pageIndex - 1, 1);
        },
        setOrdersDate: (state, action) => {
            state.date = action.payload;
        },
        setOrdersMaxPage: (state, action)=>{
            state.maxPages = action.payload
        },
        setOrdersRouteSearch: (state, action) => {
            state.routeSearch = action.payload
        },
        setOrdersCreatedBySearch: (state, action)=>{
            state.createdBySearch = action.payload
        },
        setOrdersDeliveryDateSearch: (state, action) =>{
            state.deliveryDateSearch = action.payload
        }
    }
});

export default orderSlice.reducer;
export const { setOrders, setOrdersSearch, setOrdersRowsPerPage, ordersNext, ordersPrev, setOrdersDate, setOrdersMaxPage, setOrdersRouteSearch, setOrdersDeliveryDateSearch, setOrdersCreatedBySearch } = orderSlice.actions;

export const selectCurrentOrders = (state) => state.orders.orders;
export const selectCurrentOrdersRowsPerPage = (state) => state.orders.rowsPerPage;
export const selectCurrentOrdersMaxPages = (state) => state.orders.maxPages;
export const selectCurrentOrdersPageIndex = (state) => state.orders.pageIndex;
export const selectCurrentOrdersSearch = (state) => state.orders.search;
export const selectCurrentOrdersDate = (state) => state.orders.date;
export const selectCurrentOrdersRouteSearch = (state) => state.orders.routeSearch;
export const selectCurrentOrdersCreatedBySearch = (state) => state.orders.createdBySearch;
export const selectCurrentOrdersDeliveryDateSearch = (state) => state.orders.deliveryDateSearch;


