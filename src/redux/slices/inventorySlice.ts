import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
    name: 'inventories',
    initialState: {
        inventories: [],
        search: '',
        order: -1,
        pageIndex: 1,
        maxPages: 1,
        rowsPerPage: 9,
        date: '',
    },
    reducers:{
        setInventories: (state, action) =>{
            state.inventories = action.payload;
        },
        setInventoriesSearch: (state, action) => {
            state.search = action.payload;
        },
        setInventoriesRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
            state.maxPages = Math.ceil(state.inventories.length / state.rowsPerPage) || 1;
            state.pageIndex = Math.min(state.pageIndex, state.maxPages); // Adjust if current page exceeds max
        },
        inventoriesNext: (state) => {
            state.pageIndex = Math.min(state.pageIndex + 1, state.maxPages);
        },
        inventoriesPrev: (state) => {
            state.pageIndex = Math.max(state.pageIndex - 1, 1);
        },
        setInventoriesDate: (state, action)=>{
            state.date = action.payload;
        }
    }
});

export default inventorySlice.reducer;
export const {setInventories, setInventoriesSearch, setInventoriesRowsPerPage, inventoriesNext, inventoriesPrev, setInventoriesDate} = inventorySlice.actions;

export const selectCurrentInventories = (state) => state.inventories.inventories;
export const selectCurrentInventoriesRowsPerPage = state => state.inventories.rowsPerPage;
export const selectCurrentInventoriesMaxPages = state => state.inventories.maxPages;
export const selectCurrentInventoriesPageIndex = state => state.inventories.pageIndex;
export const selectCurrentInventoriesSearch = state => state.inventories.search;
export const selectCurrentInventoriesDate = state => state.inventories.date;
