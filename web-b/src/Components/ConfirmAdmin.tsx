import { useState } from "react";
import { Box, Button, Modal, Typography, ButtonGroup, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';

interface Changes {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
}

interface Error{
    name ?: boolean,
    email ?: boolean,
    password ?: boolean,
}

interface Props{
    changes : Changes;
    add ?: boolean;
    setShowInfo : React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmAdmin({changes, setShowInfo} : Props){

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
        const ans = await axios.post(`/auth/register`,{
                ...changes
            }).catch((e) => {
                console.log(e.response);
                setLoading(false);
            })

        if(ans) setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 2000)
    }

    const validation = () => {
        let error : Error = {};
        if(!changes.name || !/^[a-zA-z ]+$/i.test(changes.name) || changes.name.length < 4) error.name = true;
        if(!changes.email || !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(changes.email)) error.email = true;
        if(!changes.password || changes.password !== changes.passwordConfirm) error.password = true;

        return Object.keys(error).length === 0 ? true : false;
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
                        Confirme para Agregar
                    </Typography>
                    <>
                        <Typography
                        variant="body2"
                        alignSelf='flex-start'
                        mt='0.5rem'
                    >
                        Nombre : 
                        </Typography>
                        <Typography
                        variant='body1'
                    >
                        {changes.name}
                        </Typography>
                    </>
                    <>
                        <Typography
                        variant="body2"
                        alignSelf='flex-start'
                        mt='0.5rem'
                    >
                        Email : 
                        </Typography>
                        <Typography
                        variant='body1'
                    >
                       {changes.email}
                        </Typography>
                    </>
                    <>
                        <Typography
                            variant="body2"
                            alignSelf='flex-start'
                            mt='0.5rem'
                        >
                            Rol : 
                        </Typography>
                        <Typography
                        variant='body1'
                    >
                            Administrador
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