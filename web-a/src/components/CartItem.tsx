import { Box, Button, Divider, Grid, IconButton, Input, Link, ListItem, Slide, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { removeItem, selectCart, quitQuantity, addQuantity } from "../redux/features/cartSlice";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Data } from "../redux/features/productSlice";
import Image from "next/image";




export default function CartItem({ data }: { data: Data }) {
    const dispatch = useDispatch<AppDispatch>();
    const W400 = useMediaQuery('(min-width:400px)');

    const handleDelete = () => {
        dispatch(removeItem(data._id))
    }

    const handleQuit = () => {
        dispatch(quitQuantity(data._id));
    }
    const handleAdd = () => {
        dispatch(addQuantity(data._id));
    }
    return (
        <>
            <ListItem

                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    color: '#000'
                }}
            >
                {
                    W400
                        ? (
                            <Box
                                padding='2px'
                                border='1px solid black'
                                height={54}
                            >

                                <img src={data.image} width={50} height={50} />
                            </Box>
                        ) : ''
                }

                <Typography
                    width='20%'
                    align='center'
                >
                    {data.title}
                </Typography>
                {
                    W400
                        ? (
                            <Typography
                                width='20%'
                                align='center'
                            >
                                ${data.price}

                            </Typography>
                        ): ''
                }

                <Box
                    display='flex'
                >
                    <IconButton onClick={handleQuit}>-</IconButton>
                    <Input type="text" value={data.quantity} sx={{width: '1.5rem'}} />
                    <IconButton onClick={handleAdd}>+</IconButton>
                </Box>
                

                <IconButton onClick={handleDelete}
                >
                    <RemoveShoppingCartIcon />
                </IconButton>


            </ListItem>
            <Divider variant="middle" />
        </>
    )
}