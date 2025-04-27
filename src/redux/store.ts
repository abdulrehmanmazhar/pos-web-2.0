import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './apis/apiSlice';
import customerReducer from "./slices/customersSlice";
import inventoryReducer from './slices/inventorySlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import targetReducer from './slices/targetSlice';

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        customers: customerReducer,
        inventories: inventoryReducer,
        orders : orderReducer,
        users: userReducer,
        payments: paymentReducer,
        targets: targetReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;