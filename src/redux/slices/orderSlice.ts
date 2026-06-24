import { createSlice } from "@reduxjs/toolkit";
import {
    getInvoiceGeneratedOrderIds,
    getRouteCardGeneratedOrderIds,
    addInvoiceGeneratedOrderIds,
    addRouteCardGeneratedOrderIds,
    clearInvoiceGeneratedOrderIds,
    clearRouteCardGeneratedOrderIds,
} from "../../utils/orderGenerationStorage";

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
        excludeInvoiceGenerated: false,
        excludeRouteCardGenerated: false,
        invoiceGeneratedOrderIds: getInvoiceGeneratedOrderIds(),
        routeCardGeneratedOrderIds: getRouteCardGeneratedOrderIds(),
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
        },
        setExcludeInvoiceGenerated: (state, action) => {
            state.excludeInvoiceGenerated = action.payload;
        },
        setExcludeRouteCardGenerated: (state, action) => {
            state.excludeRouteCardGenerated = action.payload;
        },
        loadGeneratedOrderIdsFromSession: (state) => {
            state.invoiceGeneratedOrderIds = getInvoiceGeneratedOrderIds();
            state.routeCardGeneratedOrderIds = getRouteCardGeneratedOrderIds();
        },
        markOrdersAsInvoiceGenerated: (state, action) => {
            const newIds = action.payload as string[];
            addInvoiceGeneratedOrderIds(newIds);
            state.invoiceGeneratedOrderIds = getInvoiceGeneratedOrderIds();
        },
        markOrdersAsRouteCardGenerated: (state, action) => {
            const newIds = action.payload as string[];
            addRouteCardGeneratedOrderIds(newIds);
            state.routeCardGeneratedOrderIds = getRouteCardGeneratedOrderIds();
        },
        clearGeneratedOrderIdFilters: (state) => {
            clearInvoiceGeneratedOrderIds();
            clearRouteCardGeneratedOrderIds();
            state.invoiceGeneratedOrderIds = [];
            state.routeCardGeneratedOrderIds = [];
            state.excludeInvoiceGenerated = false;
            state.excludeRouteCardGenerated = false;
        },
    }
});

export default orderSlice.reducer;
export const { setOrders, setOrdersSearch, setOrdersRowsPerPage, ordersNext, ordersPrev, setOrdersDate, setOrdersMaxPage, setOrdersRouteSearch, setOrdersDeliveryDateSearch, setOrdersCreatedBySearch, setExcludeInvoiceGenerated, setExcludeRouteCardGenerated, loadGeneratedOrderIdsFromSession, markOrdersAsInvoiceGenerated, markOrdersAsRouteCardGenerated, clearGeneratedOrderIdFilters } = orderSlice.actions;

export const selectCurrentOrders = (state) => state.orders.orders;
export const selectCurrentOrdersRowsPerPage = (state) => state.orders.rowsPerPage;
export const selectCurrentOrdersMaxPages = (state) => state.orders.maxPages;
export const selectCurrentOrdersPageIndex = (state) => state.orders.pageIndex;
export const selectCurrentOrdersSearch = (state) => state.orders.search;
export const selectCurrentOrdersDate = (state) => state.orders.date;
export const selectCurrentOrdersRouteSearch = (state) => state.orders.routeSearch;
export const selectCurrentOrdersCreatedBySearch = (state) => state.orders.createdBySearch;
export const selectCurrentOrdersDeliveryDateSearch = (state) => state.orders.deliveryDateSearch;
export const selectExcludeInvoiceGenerated = (state) => state.orders.excludeInvoiceGenerated;
export const selectExcludeRouteCardGenerated = (state) => state.orders.excludeRouteCardGenerated;
export const selectInvoiceGeneratedOrderIds = (state) => state.orders.invoiceGeneratedOrderIds;
export const selectRouteCardGeneratedOrderIds = (state) => state.orders.routeCardGeneratedOrderIds;
