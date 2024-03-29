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
            state.items = state.items.filter(e => e._id !== payload);
        },
        addItem: (state, {payload} : PayloadAction<Data>) => {
            const found = state.items.find((e: Data) => e._id === payload._id);

            if(!found) state.items = [...state.items, {...payload, quantity: 1}];
        },
        quitQuantity: (state, {payload} : PayloadAction<Data['_id']>) => {
            const index = state.items.findIndex((e: Data) => e._id === payload);

            if(index >= 0 && state.items[index].quantity > 1){
                state.items[index].quantity--;
            }

        },
        addQuantity: (state, {payload} : PayloadAction<Data['_id']>) => {
            const index = state.items.findIndex((e: Data) => e._id === payload);

            if(index >= 0 && state.items[index].quantity < state.items[index].stock){
                state.items[index].quantity++;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const { removeItem, addItem, clearCart, quitQuantity, addQuantity } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
