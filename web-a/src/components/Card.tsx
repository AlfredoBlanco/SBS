import { Box, Typography, IconButton } from '@mui/material';
import { red, green, grey } from '@mui/material/colors';
import { sizing } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';


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

    return(
        <Box 
          m={2}
          width={W1000 ? '30%' : '45%'}
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
                    background : 'rgba(66, 66, 66, 0.5)',
                    color : `${grey[100]}`
                }}
            >
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    width='100%'
                >
                    <IconButton >
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
                        borderRadius : '1rem'
                    })}
                >
                    {data.stock ? 'Hay stock' : 'No hay  stock'}
                  </Typography>
            
            </Box>
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