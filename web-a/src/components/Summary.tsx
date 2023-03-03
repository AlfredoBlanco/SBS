import { Box, Button, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/features/cartSlice";
import { grey } from '@mui/material/colors';
import { useEffect, useState } from "react";
import axios from "axios";
import type { Notice } from "../../pages/auth/login";
import Notification from "./Notification";
import ConfirmBuy from "./ConfirmBuy";

export default function Summary() {
    const { items } = useSelector(selectCart);
    const [total, setTotal] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const [notification, setNotification] = useState<Notice>({
        open: false,
        message: '',
        severity: 0,
    });
    const W650 = useMediaQuery('(min-width:650px)');
    const W500 = useMediaQuery('(min-width:500px)');

    useEffect(() => {
        const totalPrice = items.reduce((prev, current) => {
            const value = current.price * current.quantity;
            return prev + value;
        }, 0)

        setTotal(totalPrice);
    }, [items]);

    const handleBuy = async () => {
        setFetching(true);
        const body = items.map(e => {
            const { title, description, quantity } = e;
            return {
                title,
                description,
                picture_url: e.image,
                quantity,
                unit_price: e.price,
            }
        })

        const response = await axios.post('/payment', {
            items: body,
        })
            .then(r => r.data.data)
            .catch((e) => {
                setNotification({
                    open: true,
                    message: e.response.data,
                    severity: 2,
                });
            });
        if (response) {
            setOpen(true);
        }
        setFetching(false)

    }

    const handleClose = () => setNotification({
        open: false,
        message: '',
        severity: 0,
    })

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width={W500 ? W650 ? '40%' : '90%' : '100%'}
            marginX='2px'

        >
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='100%'
                border={`4px solid ${grey[600]}`}
                borderBottom={`2px dotted ${grey[600]}`}
            >
                <Typography
                    variant="h4"
                >
                    Resumen
                </Typography>
                {
                    items.map((e, i) => (
                        <Box
                            key={i}
                            display='flex'
                            justifyContent='space-between'
                            width='70%'
                            paddingY='0.5rem'
                            borderBottom={i === items.length - 1 ? '' : `1px solid ${grey[300]}`}
                        >
                            <Typography align="center">{e.title}</Typography>
                            <Typography>${e.quantity * e.price}</Typography>
                        </Box>
                    ))
                }
            </Box>
            <Box
                display='flex'
                justifyContent='center'
                width='100%'
                border={`4px solid ${grey[600]}`}
                borderTop={'0px'}
            >
                <Box
                    display='flex'
                    justifyContent='space-between'
                    width='70%'
                    marginY='1rem'
                >
                    <Typography>Total:</Typography>
                    <Typography
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        ${total}
                    </Typography>
                </Box>

            </Box>
            <Button
                variant='contained'
                color='error'
                sx={{
                    alignSelf: 'flex-end',
                    marginRight: '1px',
                    marginTop: '2px',
                }}
                onClick={handleBuy}
            >
                {
                    fetching
                        ? <CircularProgress size={20} />
                        : 'Comprar'
                }
            </Button>
            <ConfirmBuy total={total} open={open} setOpen={setOpen} />
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                handleClose={handleClose}
            />

        </Box>
    )
}