import { createSlice } from  '@reduxjs/toolkit';
import type { PayloadAction } from  '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Admin {
  token: string | null;
  name: string | null;
  role: number | null;
  loggedIn: boolean;
}


const initialState: Admin = {
    token: null,
    name: null,
    role: null,
    loggedIn: false,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        logIn: (state, { payload }: PayloadAction<Admin>) => {
            
            state.name = payload.name;
            state.token = payload.token;
            state.role = payload.role;
            state.loggedIn = true;
        },
        logOut: (state) => {
            
            state.name = null;
            state.token = null;
            state.role = null;
            state.loggedIn = false;
        }
    },
})

export const { logIn, logOut } = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admin;

export default adminSlice.reducer;