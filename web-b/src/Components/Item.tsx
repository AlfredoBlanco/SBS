import { Box, Grid, Typography, IconButton, useMediaQuery, Modal, Button, ButtonGroup, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Form from './Form';
import axios from 'axios';

interface Data{
    _id : string,
    title : string,
    image : string,
    description : string,
    price : number,
    stock : boolean
}

export default function Item({data} : {data : Data}){
    const W400 = useMediaQuery('(min-width:400px)');
    const [open, setOpen] = useState<boolean>(false);
    const [openSecond, setOpenSecond] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const handleOpenSecond = () =>{
        setOpenSecond(true);
    }
    const handleCloseSecond = () =>{
        setOpenSecond(false);
    }
    const handleSend = async () => {
        setLoading(true);
        const ans = await axios.delete(`${process.env.NEXT_PUBLIC_API_PATH}${data._id}`)
        if (ans) setTimeout(() => {
          setLoading(false);
          window.location.reload()
        }, 2000)
    }

    return(
    <>
    
        <Grid 
          item 
          xs={12} 
          key={data._id}
        >
            <Box
              display='flex'
              width='100%'

            >

          
            <Box
              display='flex'
              flexDirection={W400 ? 'row' : 'column'}
              justifyContent='space-between'
              alignItems='center'
              width={W400 ? '80%' : '60%'}

            >
              <Typography
                variant='overline'
                fontSize={W400 ? 18 : 12}
                align='center'
              >
                {data.title}
              </Typography>
              <Typography
              >
                $ {data.price}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
              width='20%'
            >
              <IconButton
                onClick={handleOpen}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                onClick={handleOpenSecond}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box> 
        </Grid>
        
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display : 'flex',
            flexDirection : `${W400 ? 'row' : 'column'}`,
            justifyContent : 'center',
            alignItems : 'center'
          }}
        >
            <>
                <Form data={data} />
                <Button
                    variant='text'
                    sx={{
                        position : 'absolute',
                        top : `${W400 ? '1rem' : '0.2rem'}`,
                        right : '0.5rem',
                        color : '#fff',
                        border : '1px solid #000',
                       
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon  />
                </Button>
            </>
        </Modal>
        <Modal
          open={openSecond}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display : 'flex',
            flexDirection : `${W400 ? 'row' : 'column'}`,
            justifyContent : 'center',
            alignItems : 'center'
          }}
        >
            <Box 
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-evenly'
              minWidth='50vw'
              minHeight='30vh'
              sx={{
                bgcolor : '#000',
                borderRadius : '0.5rem',
                color : '#fff'
              }}
            >
              <Typography
                variant='h5'
                align='center'
                mx='0.5rem'
              >
                {loading ? 'Eliminando ' : 'Deseas eliminar el '}producto <br /> <strong>{data.title}</strong> {loading ? '' : '?' }
              </Typography>
              <ButtonGroup>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={handleCloseSecond}
                        >
                            VOLVER
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleSend}
                            startIcon={<DeleteIcon />}
                        >
                          {
                            loading ? <CircularProgress color='info' /> :  'ELIMINAR'
                          }  
                        </Button>
                    </ButtonGroup>
            </Box>
        </Modal>
    </>
    )
}