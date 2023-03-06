import { Box, IconButton, Modal, Typography, useMediaQuery } from "@mui/material";
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useState } from "react";
import { addItem } from "../redux/features/cartSlice";
import { grey } from '@mui/material/colors';
import { Data } from '../redux/features/productSlice';
import { selectUser } from "../redux/features/userSlice";


export default function DetailModal({ data }: { data?: Data }) {
    const W1000 = useMediaQuery('(min-width:1000px)');
    const W600 = useMediaQuery('(min-width:600px)');
    const W500 = useMediaQuery('(min-width:500px)');
    const { loggedUser: { loggedIn } } = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleAdd = () => {
        setDone(true);
        if (data) dispatch(addItem(data));
        setTimeout(() => {
            setDone(false)
        }, 3000);
    }
    return (
        <>
            <Box
                display='flex'
                justifyContent='flex-end'
                width='100%'
            >
                <IconButton onClick={handleOpen} >
                    <ZoomOutMapIcon color="info" />
                </IconButton>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    position='relative'

                    display='flex'
                    flexDirection={W1000 ? 'row' : 'column'}
                    justifyContent='space-evenly'
                    alignItems='center'
                    width={W500 ? '60%' : '80%'}
                    sx={{
                        background: `${grey[100]}`,
                        borderRadius: '0.5rem',
                        overflowX: 'hidden',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: '3px',
                            right: '3px'
                        }}
                    >
                        <CloseFullscreenIcon color="info" />
                    </IconButton>

                    <img src={data?.image} alt='Not found' width={'300'} />
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                        height='100%'
                        gap={W500? '' : '0'}
                    >
                        <Typography
                            variant={W600? 'h3' : 'h4'}
                            align='center'
                        >
                            {data?.title}
                        </Typography>
                        <Typography
                            variant='caption'
                        >
                            ${data?.price}
                        </Typography>
                        <Typography
                            variant='body2'
                            align='center'
                        >
                            {data?.description}
                        </Typography>
                        {
                            loggedIn
                                ?
                                data?.stock
                                    ? (
                                        <IconButton
                                            onClick={handleAdd}
                                            sx={{
                                                alignSelf: 'flex-end'
                                            }}
                                        >
                                            {
                                                done
                                                    ? <DoneIcon />
                                                    : <AddShoppingCartIcon />
                                            }

                                        </IconButton>
                                    )
                                    : ''
                                : ''
                        }


                    </Box>
                </Box>
            </Modal>
        </>
    )
}