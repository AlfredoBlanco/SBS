import { useState } from "react";
import { Box, Button, Modal, Typography, ButtonGroup, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';



interface Changes{
    _id ?: string,
    title ?: string,
    image ?: string,
    description ?: string,
    price ?: number,
    stock ?: boolean
}


export default function NestModal({changes, add, validate} : {changes : Changes, add ?: boolean, validate : boolean }){
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOpen = ()=> {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSend = async () => {
        setLoading(true);
        const ans =  add 
            ? await axios.post(`/add`,{
                ...changes
            })
            : await axios.put(`/${changes._id}`,{
            ...changes
            });

        if(ans) setTimeout(() => {
            setLoading(false);
            window.location.reload();
        }, 2000)
    }
    return(
        <>
            <Button 
                variant='contained'
                type='submit'
                onClick={handleOpen}
                disabled={validate}
            >
                Revisar
            </Button>
            <Modal 
                open={open}
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center'
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
                        color : '#fff',
                        bgcolor : `${grey[900]}`,
                        
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
                        Title : 
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
                        Price : 
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
                            Description : 
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
                            Image : 
                        </Typography>
                        <Typography
                        variant='body1'
                    >
                        {changes.image?.slice(0,20)}...
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
                        {changes.stock ? 'Hay stock' : 'No hay stock'}
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