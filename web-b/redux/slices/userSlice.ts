import { createAsyncThunk, createSlice } from  '@reduxjs/toolkit';
import type { PayloadAction } from  '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';

export interface Admin {
  token: string | null;
  name: string | null;
  role: number | null;
  loggedIn: boolean;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: number;
}

export interface UserState {
    loggedAdmin: Admin;
    users: User[];
}

const initialState: UserState = {
    loggedAdmin : {
        token: null,
        name: null,
        role: null,
        loggedIn: false,
    },
    users: [],
    
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', (token : string | null) => {
    return axios(`/users`,{
        headers: { 'Authorization' : `Bearer ${token}`}
    }).then(r => r.data);
})

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        logIn: (state, { payload }: PayloadAction<Admin>) => {
            const { loggedAdmin } = state;
            loggedAdmin.name = payload.name;
            loggedAdmin.token = payload.token;
            loggedAdmin.role = payload.role;
            loggedAdmin.loggedIn = true;
        },
        logOut: (state) => {
            const { loggedAdmin } = state;
            loggedAdmin.name = null;
            loggedAdmin.token = null;
            loggedAdmin.role = null;
            loggedAdmin.loggedIn = false;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.data;
        })
    }
})

export const { logIn, logOut } = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admin;

export default adminSlice.reducer;