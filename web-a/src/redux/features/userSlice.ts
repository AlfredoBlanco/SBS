import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface User {
    token: string | null;
    name: string | null;
    role: number | null;
    loggedIn: boolean;
}

export interface UserState {
    loggedUser: User;
}

/* const checkIfLogged = (): User => {
    let loggedUser = window?.localStorage.getItem('LoggedUser');
    let parsedUser: User = {token: null,
        name: null,
        role: null,
        loggedIn: false,};
    if (loggedUser) {
        parsedUser ={ 
            ...JSON.parse(loggedUser),
            loggedIn: true
        };
    }
    return parsedUser
} */

const initialState: UserState = {
    loggedUser: {token: null,
        name: null,
        role: null,
        loggedIn: false,}

};

export const adminSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, { payload }: PayloadAction<User>) => {
            const { loggedUser } = state;
            loggedUser.name = payload.name;
            loggedUser.token = payload.token;
            loggedUser.role = payload.role;
            loggedUser.loggedIn = true;
        },
        logOut: (state) => {
            const { loggedUser } = state;
            loggedUser.name = null;
            loggedUser.token = null;
            loggedUser.role = null;
            loggedUser.loggedIn = false;
        },
    },
})

export const { logIn, logOut } = adminSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default adminSlice.reducer;