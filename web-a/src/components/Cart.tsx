import { Box, Button, IconButton, Link, Slide, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { selectCart } from "../redux/features/cartSlice";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CartItem from "./CartItem";



export default function Cart() {
    const { items } = useSelector(selectCart);
    const [open, setOpen] = useState<boolean>(false);
    const W850 = useMediaQuery('(min-width:850px)');
    const W500 = useMediaQuery('(min-width:500px)');

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                {items.length} <ShoppingCartCheckoutIcon />
            </IconButton>
            <Slide direction='left' in={open} >
                <Box
                    position='fixed'
                    top='0'
                    right='0'
                    height='100vh'
                    width='100vw'
                    zIndex='100'
                    
                >
                    <Box
                        position='fixed'
                        top='0'
                        right='0'
                        height='100vh'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                        width={W500 ? W850 ? '50%' : '70%' : '100%'}
                        sx={{
                            background: 'rgba(0, 0, 0, 1)',
                            transition: 'all 0.3s ease-in-out',
                        }}
                    >
                        <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            width='100%'
                        >

                            <Button
                                onClick={handleClose}
                                variant='outlined'
                                color='primary'
                                sx={{
                                    alignSelf: 'flex-end',
                                    margin: '0.5rem'
                                }}
                            >
                                <CloseIcon />
                            </Button>
                            <ul>
                                {
                                    items.map(e => (
                                        <CartItem data={e} />
                                    ))
                                }
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </>
    )
}