import { Box, Button, IconButton, Link, Slide, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { removeItem, selectCart } from "../redux/features/cartSlice";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Data } from "../redux/features/productSlice";




export default function CartItem({ data }: { data: Data }) {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(removeItem(data._id));
    }
    return (
        <Box>
            <Button color="primary" onClick={handleDelete}>Eliminar</Button>
            <Typography
                color='#fff'
            >
                {data.title}
            </Typography>
        </Box>
    )
}