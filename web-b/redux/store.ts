import { configureStore } from '@reduxjs/toolkit';
import productReducer from  './slices/productSlice';
import adminReducer from  './slices/adminSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
