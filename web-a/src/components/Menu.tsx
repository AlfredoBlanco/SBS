import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slide, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import TextItem from './TextItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import OrderSelect from "./OrderSelect";
import grey from '@mui/material/colors/grey';


export default function Menu() {
    const [open, setOpen] = useState<boolean>(false);
    const W850 = useMediaQuery('(min-width:750px)');
    const W500 = useMediaQuery('(min-width:500px)');

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
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
                            <Box
                                width='100%'
                                onClick={handleClose}
                            >

                                <TextItem data={'Sobre Nosostros'} />
                            </Box>
                            <Box
                                width='100%'
                                onClick={handleClose}
                            >
                                <TextItem data={'Contacto'} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Slide>
        </>
    )
}