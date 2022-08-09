import { useState } from "react";
import { Box, Button, Modal, Typography, ButtonGroup } from '@mui/material';
import grey from '@mui/material/colors/grey';



interface Changes{
    title ?: string,
    image ?: string,
    description ?: string,
    price ?: number,
    stock ?: boolean
}

export default function NestModal({changes} : {changes : Changes}){
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = ()=> {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return(
        <>
            <Button 
                variant='contained'
                type='submit'
                onClick={handleOpen}
            >
                Submit
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
                        Confirme para enviar
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
                        >
                            ENVIAR
                        </Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </>
    )
}