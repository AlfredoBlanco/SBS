import { Box, Button, IconButton, Link, Modal, Typography, useMediaQuery } from "@mui/material";
import { Data } from '../redux/features/productSlice';
import { grey, red } from '@mui/material/colors';
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { useEffect, useState } from "react";

interface Props {
    url: string;
    open: boolean;
    setOpen: any;
    total: number;
}
/* Ver como hacer para que las compras se guarden el la BBDD y hacer aprtado de mis compras */
export default function DetailModal({ url, open, setOpen, total }: Props) {
    const dispatch = useDispatch();
    const [thanks, setThanks] = useState<boolean>(false);
    
    const handleClose = () => {
        setOpen(false);
        setThanks(false)
    }
    
    const handleCloseAll = () => {
        dispatch(clearCart());

    }
    const handleConfirm = () => {
        setThanks(true)
    }


    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                padding='1rem'
                border='2px solid black'
                borderRadius='1rem'
                gap={3}
                bgcolor={`${grey[100]}`}
            >
                {
                    thanks
                        ? (
                            <>
                            <Typography
                                variant="h5"
                                align='center'
                            >
                                Muchas gracias por su compra
                            </Typography>
                            <Button
                                color='error'
                                sx={{
                                    padding: '0.5rem',
                                    border: `1px solid ${red.A400}`,
                                    borderRadius: '0.5rem',
                                    transition: 'all',
                                    transitionDuration: '300ms',
                                    '&:hover': {
                                        color: '#fff',
                                        background: `${red.A400}`
                                    }

                                }}
                                onClick={handleCloseAll}
                            >
                                Seguir explorando
                            </Button>
                            </>
                        )
                        : (
                            <>
                                <Typography
                                    variant="h5"
                                >
                                    El valor de su compra es de ${total}
                                </Typography>
                                <Link href={url} target='_blank' rel="noopener"
                                    underline="none"
                                    color='error'
                                    sx={{
                                        padding: '0.5rem',
                                        border: `1px solid ${red.A400}`,
                                        borderRadius: '0.5rem',
                                        transition: 'all',
                                        transitionDuration: '300ms',
                                        '&:hover': {
                                            color: '#fff',
                                            background: `${red.A400}`
                                        }

                                    }}
                                    onClick={handleConfirm}
                                >
                                    PAGAR
                                </Link>
                            </>
                        )
                }



            </Box>
        </Modal>
    )
}