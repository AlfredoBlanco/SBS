import { Box, Button, IconButton, Link, List, Slide, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { selectCart } from "../redux/features/cartSlice";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CartItem from "./CartItem";
import { grey } from '@mui/material/colors';
import Summary from "./Summary";



export default function Cart() {
    const { items } = useSelector(selectCart);
    const [open, setOpen] = useState<boolean>(false);
    const W650 = useMediaQuery('(min-width:650px)');
    const W500 = useMediaQuery('(min-width:500px)');

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        !items.length ? setOpen(false) : ''
    }, [items])
    

    return (
        <>
            <IconButton
                disabled={items.length ? false : true}
                onClick={handleOpen}
            >
                {items.length} <ShoppingCartCheckoutIcon />
            </IconButton>

            <Slide direction='left' in={open} >

                <Box
                    position='fixed'
                    top='0'
                    left='0'
                    height='100vh'
                    width='100vw'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-between'
                    zIndex='100'
                    sx={{
                        backgroundColor: grey[100],
                        transition: 'all 0.3s ease-in-out',
                    }}
                >

                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        width='100%'
                        color='#000'
                    >

                        <Button
                            onClick={handleClose}
                            variant='outlined'
                            sx={{
                                alignSelf: 'flex-end',
                                margin: '0.5rem',
                                color: '#000',
                                borderColor: '#000'
                            }}
                        >
                            <CloseIcon />
                        </Button>
                        {
                            items.length
                                ? (
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        alignItems={W650 ? '' : 'center'}
                                        flexDirection={W650 ? 'row' : 'column'}
                                        gap={W650 ? 0 : 2}
                                        width='100%'
                                        height='auto'
                                    >
                                        <List
                                            sx={{
                                                width: `${W500 ? W650 ? '60%' : '90%' : '100%'}`,
                                            }}
                                        >
                                            {
                                                items.map(e => (
                                                    <CartItem key={e._id} data={e} />
                                                ))
                                            }
                                        </List>
                                        <Summary />



                                    </Box>
                                ) : ''
                        }


                    </Box>
                </Box>
            </Slide>
        </>
    )
}