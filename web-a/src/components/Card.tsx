import { Box, Typography, IconButton, Modal } from '@mui/material';
import { red, green, grey } from '@mui/material/colors';
import Image from 'next/image';
import { sizing } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useState } from 'react';


interface Data{
    _id : string,
    title : string,
    image : string,
    description : string,
    price : number,
    stock : boolean
}

export default function Card({data} : {data : Data}) {
    const W1000 = useMediaQuery('(min-width:1000px)');
    const W750 = useMediaQuery('(min-width:750px)');
    const W500 = useMediaQuery('(min-width:500px)');

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return(
        <Box 
          m={2}
          width={W500 ? W750 ? W1000 ? '30%' : '45%' : '70%' : '100%'}
          sx={{height : '20rem', 
            backgroundImage : `url(${data.image})`,
            backgroundPosition : 'center',
            backgroundSize : 'cover',
            borderRadius : '1rem',
            overflow : 'hidden'
        }}
          key={data._id}
        >
            <Box
                display='flex'
                position='relative'
                flexDirection='column'
                alignItems='center'
                p={0}
                height={'100%'}
                width={'100%'}
                sx={{
                    background : 'rgba(66, 66, 66, 0.8)',
                    color : `${grey[100]}`,
                    transition : 'all 0.3s ease-in-out',
                    cursor : 'default',
                    '&:hover': {
                        background : 'rgba(66, 66, 66, 0.1)',
                        color : 'transparent'
                    }
                }}
            >
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    width='100%'
                >
                    <IconButton onClick={handleOpen} >
                        <ZoomOutMapIcon color="info" />
                    </IconButton>
                </Box>
                <Typography 
                    variant='h2'
                    align='center'
                >
                    {data.title}
                </Typography>
                <Typography
            variant='caption'>
            ${data.price}
                </Typography>
                <Typography
                variant='body1'
                align='center'
                mx={2}
                >
                 {data.description}
                 </Typography>
                 <Typography
                    variant='body2'
                    width='50%'
                    align='center'
                    sx={({
                        position : 'absolute',
                        bottom : '0',
                        backgroundColor : `${data.stock ? green[600] : red[600]}`,
                        borderRadius : '1rem',
                        color : `${grey[100]}`
                    })}
                >
                    {data.stock ? 'Hay stock' : 'No hay  stock'}
                  </Typography>
            
            </Box>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box 
                    position='relative'
                    top='10%'
                    left={W500 ? '20%' : '10%'}
                    display='flex'
                    flexDirection={W1000? 'row' : 'column'}
                    justifyContent='space-evenly'
                    alignItems='center'
                    width={W500 ? '60%' : '80%'}
                    sx={{
                        background : `${grey[100]}`,
                        borderRadius : '0.5rem',
                        overflow : 'hidden'
                    }}
                >
                    <IconButton 
                        onClick={handleClose} 
                        sx={{
                            position : 'absolute',
                            top : '3px',
                            right : '3px'
                        }}
                    >
                        <CloseFullscreenIcon color="info" />
                    </IconButton>
                    <img src={data.image} alt='Not found' width={'300'} />
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                        height='100%'
                    >
                        <Typography
                            variant='h3'
                            align='center'
                            mt='1rem'
                        >
                            {data.title}
                        </Typography>
                        <Typography
                            variant='caption'
                        >
                            ${data.price}
                        </Typography>
                        <Typography
                            variant='body2'
                            mb='1rem'
                            align='center'
                        >
                            {data.description}
                        </Typography>

                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
/* 
"
    "_id": "62ec20df0cf1363fc68e84e4",
        "title": "Remera adidas",
    "_id": "62ec213c0cf1363fc68e85bd",
        "title": "Gorro de lana",
    "_id": "62ec21790cf1363fc68e86fb",
        "title": "Anteojos Ripcurl",

*/