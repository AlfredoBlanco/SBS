import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Data } from './productSlice';

export interface CartState {
    items: Data[];
}


const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeItem: (state, { payload }: PayloadAction<Data['_id']>) => {
            
        },
        addItem: (state, {payload} : PayloadAction<Data>) => {
            
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const { removeItem, addItem, clearCart } = cartSlice.actions;

export const selectUser = (state: RootState) => state.cart;

export default cartSlice.reducer;
