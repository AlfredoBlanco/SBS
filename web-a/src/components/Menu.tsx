import { Box, Button, Link, Slide, useMediaQuery } from "@mui/material";
import { useState } from "react";
import TextItem from './TextItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import OrderSelect from "./OrderSelect";
import { grey } from '@mui/material/colors';
import { logOut, selectUser } from '../../src/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';


export default function Menu() {
    const { loggedUser } = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState<boolean>(false);
    const W850 = useMediaQuery('(min-width:750px)');
    const W500 = useMediaQuery('(min-width:500px)');

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleLogOut = () => {
        window.localStorage.removeItem('LoggedUser')
        dispatch(logOut());
    }
    return (
        <>
            <Button
                onClick={handleOpen}
                variant='outlined'
                color='info'
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    bgcolor: grey[100],
                    zIndex: '90',
                }}

            >
                <MenuIcon />
            </Button>
            <Slide direction='right' in={open} >
                <Box
                    position='fixed'
                    top='0'
                    left='0'
                    height='100vh'
                    width='100vw'
                    zIndex='100'
                >
                    <Box
                        position='fixed'
                        top='0'
                        left='0'
                        height='100vh'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-between'
                        width={W500 ? W850 ? '40%' : '50%' : '100%'}
                        sx={{
                            background: 'rgba(0, 0, 0, 0.9)',
                            borderTopRightRadius: '1rem',
                            borderBottomRightRadius: '1rem',
                            boxShadow: '2px 0 2px 1px rgba(0, 0, 0, 0.4)',
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
                            <OrderSelect setOpen={setOpen} />
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            width='100%'
                        >
                            <TextItem data={'Sobre Nosostros'} handleClose={handleClose} />
                            <TextItem data={'Contacto'} handleClose={handleClose} />
                            {
                                loggedUser.loggedIn
                                    ? (
                                        <Box width='100%' onClick={handleLogOut}>

                                            <TextItem data={'Cierre sesión'} handleClose={handleClose} />
                                        </Box>
                                    )
                                    : (
                                        <Link href={'/auth/login'} underline='none' width='100%'>

                                            <TextItem data={'Inicie sesión'} handleClose={handleClose} />
                                        </Link>
                                    )
                            }



                        </Box>
                    </Box>
                </Box>
            </Slide>
        </>
    )
}