import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        loggedIn: false,
        user:'',
        token:'',
    },
    reducers:{
        logout: (state)=>{
            state.loggedIn = false;
            state.token = "";
            state.user = "";
        },
        setCredentials: (state, action)=>{
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.loggedIn = true;
        }
    }
})

export default authSlice.reducer;
export const {logout, setCredentials} = authSlice.actions

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentloggedIn = (state: any) => state.auth.loggedIn;
