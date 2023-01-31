import { createSlice, createAsyncThunk, PayloadAction } from  '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export interface Data{
  _id : string,
  title : string,
  image : string,
  description : string,
  price : number,
  stock : number,
  quantity : number,
}

export interface ProductState{
    data: Data[];
    initialData: Data[]
} 

const initialState: ProductState = {
    data: [],
    initialData: []
};



export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
    return axios(`/products`).then(r => r.data);
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        orderAZ: (state) => {
            state.data.sort((a: Data, b: Data) =>{
                return a.title > b.title
                    ? 1
                    : -1
            })
        },
        orderZA: (state) => {
            state.data.sort((a: Data, b: Data) =>{
                return a.title > b.title
                    ? -1
                    : 1
            })
        },
        orderPMax: (state) => {
            state.data.sort((a: Data, b: Data) =>{
                return a.price - b.price
            })
        },
        orderPMin: (state) => {
            state.data.sort((a: Data, b: Data) =>{
                return b.price - a.price
            })
        },
        filterByName: (state, {payload}: PayloadAction<string>) => {
            state.data = state.initialData.filter((e : Data )=> e.title.toLowerCase().includes(payload.toLowerCase()));
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.initialData = action.payload.data;
        })
    }
})

export const { orderZA, orderAZ, orderPMax, orderPMin, filterByName } = productSlice.actions;
export const selectProducts = (state: RootState) => state.products.data;

export default productSlice.reducer;