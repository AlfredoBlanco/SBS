import { useState } from "react";
import { Box, Button, Modal, Typography, ButtonGroup, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../redux/slices/userSlice';

interface Changes {
    _id?: string,
    title?: string,
    image?: string,
    description?: string,
    price?: number,
    stock?: number
}

interface Error {
    title?: boolean,
    image?: boolean,
    description?: boolean,
    price?: boolean,
    stock?: boolean,
}

interface Props {
    changes: Changes;
    add?: boolean;
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NestModal({ changes, add, setShowInfo }: Props) {

    const { loggedAdmin: { token } } = useSelector(selectAdmin);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOpen = () => {
        if (validation()) {

            setOpen(true);
        } else {
            setShowInfo(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleSend = async () => {
        setLoading(true);
        
        const ans = add
            ? await axios.post(`/products`, {
                ...changes
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch((e) => {
                console.log(e.response);
                setLoading(false);
            })
            : await axios.put(`/products/${changes._id}`, {
                ...changes
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch((e) => {
                console.log(e.response);
                setLoading(false);
            });

        if (ans) setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 2000)
    }

    const validation = () => {
        
        let empty: Error = {};
        if (!changes.title || !/^[a-zA-z ]+$/i.test(changes.title) || changes.title.length < 4) empty.title = true;
        if (!changes.description || changes.description.length < 10) empty.description = true;
        if (!changes.image || !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(changes.image)) empty.image = true;
        if (!changes.price || changes.price <= 0) empty.price = true;
        if (Number(changes.stock) < 0) empty.stock = true;

        return Object.keys(empty).length === 0 ? true : false;
    }

    return (
        <>
            <Button
                variant='contained'
                type='submit'
                onClick={handleOpen}
            >
                Revisar
            </Button>
            <Modal
                open={open}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-around'
                    p='1rem'
                    minHeight={'80%'}
                    minWidth={'50%'}
                    sx={{
                        color: '#fff',
                        bgcolor: `${grey[900]}`,

                    }}
                >
                    <Typography
                        variant='h5'
                        my='1rem'
                        align='center'
                    >
                        Confirme para {add ? 'Agregar' : 'Actualizar'}
                    </Typography>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Titulo :
                        </Typography>
                        <Typography
                            variant='body1'
                        >
                            {changes.title}
                        </Typography>
                    </>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Precio :
                        </Typography>
                        <Typography
                            variant='body1'
                        >
                            $ {changes.price}
                        </Typography>
                    </>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Descripción :
                        </Typography>
                        <Typography
                            variant='body1'
                        >
                            {changes.description}
                        </Typography>
                    </>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Imagen :
                        </Typography>
                        <Typography
                            variant='body1'
                        >
                            {changes.image?.slice(0, 20)}...
                        </Typography>
                    </>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Stock :
                        </Typography>
                        <Typography
                            variant='body1'
                        >
                            {Number(changes.stock) === 0 ? 'No hay stock' : 'Hay stock'}
                        </Typography>
                    </>
                    <ButtonGroup>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={handleClose}
                        >
                            VOLVER
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleSend}
                        >
                            {
                                loading ? <CircularProgress color="info" /> : 'ENVIAR'
                            }

                        </Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </>
    )
}