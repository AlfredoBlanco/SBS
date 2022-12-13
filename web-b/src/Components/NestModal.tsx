import { useState } from "react";
import { Box, Button, Modal, Typography, ButtonGroup, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../redux/slices/adminSlice';

interface Changes{
    _id ?: string,
    title ?: string,
    image ?: string,
    description ?: string,
    price ?: number,
    stock ?: boolean
}

interface Error{
    title ?: boolean,
    image ?: boolean,
    description ?: boolean,
    price ?: boolean
}

interface Props{
    changes : Changes;
    add ?: boolean;
    setShowInfo : React.Dispatch<React.SetStateAction<boolean>>;
}
interface Admin {
  token: string | null;
  name: string | null;
  role: number | null;
  loggedIn: boolean;
}

export default function NestModal({changes, add, setShowInfo} : Props){

    const { token }: Admin = useSelector(selectAdmin);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOpen = ()=> {
        if(validation()){

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
        const ans =  add 
            ? await axios.post(`/products`,{
                ...changes
            },{
                headers: { 'Authorization' : `Bearer ${token}`}
            }).catch((e) => {
                console.log(e.response);
                setLoading(false);
            })
            : await axios.put(`/products/${changes._id}`,{
            ...changes
            },{
                headers: { 'Authorization' : `Bearer ${token}`}
            }).catch((e) => {
                console.log(e.response);
                setLoading(false);
            });

        if(ans) setTimeout(() => {
            setLoading(false);
            /* dispatch(getAllProducts()) */
            window.location.reload();
            console.log(ans)
        }, 2000)
    }

    const validation = () => {
        let empty : Error = {};
        if (!changes.title || !/^[a-zA-z ]+$/i.test(changes.title) || changes.title.length < 4) empty.title = true;
        if (!changes.description || changes.description.length < 10) empty.description = true;
        if (!changes.image) empty.image = true;
        if (!changes.price || changes.price <= 0) empty.price = true;

        return Object.keys(empty).length === 0 ? true : false;
    }

    return(
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