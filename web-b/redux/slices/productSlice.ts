import { createSlice, createAsyncThunk } from  '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface Data{
  _id : string,
  title : string,
  image : string,
  description : string,
  price : number,
  stock : number
}

export interface ProductState{
    data: Data[];
    status: 'ok' | 'idle';
} 

const initialState: ProductState = {
    data: [],
    status: 'idle'
};

export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
    return axios(`/products`).then(r => r.data);
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.status = 'ok';
        })
    }
})

export const selectProducts = (state: RootState) => state.products.data;

export default productSlice.reducer;