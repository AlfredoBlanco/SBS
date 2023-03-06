import { Box, Typography, Skeleton } from '@mui/material';
import { red, green, grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import DetailModal from './DetailModal';
import { Data } from '../redux/features/productSlice';


interface Props {
    data?: Data
}

export default function Card({ data }: Props) {
    const W1000 = useMediaQuery('(min-width:1000px)');
    const W750 = useMediaQuery('(min-width:750px)');
    const W500 = useMediaQuery('(min-width:500px)');

    return (
        <Box
            m={2}
            width={W500 ? W750 ? W1000 ? '30%' : '45%' : '70%' : '100%'}
            sx={{
                height: '20rem',
                backgroundImage: `url(${data?.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '1rem',
                overflow: 'hidden'
            }}
            key={data?._id}
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
                    background: 'rgba(66, 66, 66, 0.8)',
                    color: `${grey[100]}`,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'default',
                    '&:hover': {
                        background: 'rgba(66, 66, 66, 0.1)',
                        color: 'transparent'
                    }
                }}
            >
                <DetailModal data={data} />
                <Typography
                    variant='h2'
                    align='center'
                >
                    {
                        data?.title
                            ? `${data.title}`
                            : (<Skeleton variant='text' sx={{ width: '10rem' }} />)
                    }
                </Typography>
                <Typography
                    variant='caption'
                >
                    {
                        data?.price
                            ? `$ ${data.price}`
                            : (<Skeleton variant='text' sx={{ width: '10rem' }} />)
                    }
                </Typography>
                <Typography
                    variant='body1'
                    align='center'
                    mx={2}
                >
                    {
                        data?.description
                            ? `${data.description}`
                            : (<Skeleton variant='text' sx={{ width: '10rem' }} />)
                    }
                </Typography>
                <Typography
                    variant='body2'
                    width='50%'
                    align='center'
                    sx={({
                        position: 'absolute',
                        bottom: '0',
                        backgroundColor: `${data?.stock ? green[600] : red[600]}`,
                        borderRadius: '1rem',
                        color: `${grey[100]}`
                    })}
                >
                    {data?.stock ? 'Hay stock' : 'No hay  stock'}
                </Typography>

            </Box>

            
        </Box>
    )
}
