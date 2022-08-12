import { Box, Typography, useMediaQuery } from '@mui/material';
import { blueGrey } from '@mui/material/colors';


export default function Footer() {
    const W650 = useMediaQuery('(min-width:650px)')
    const W450 = useMediaQuery('(min-width:450px)')
    return(
        <Box
            display='flex'
            flexDirection={W650 ? 'row' : 'column'}
            justifyContent='space-evenly'
            alignItems='center'
            minHeight='40vh'
            width='100%'
            sx={{
                background : `${blueGrey[900]}`
            }}
        >
            <Typography 
                variant={W450 ? 'caption' : 'subtitle1'}
                color='primary'
                align='center'
            >
                Developer : <strong>Alfredo Blanco</strong>
            </Typography>
            <Typography 
                variant='body1'
                color='primary'
                align='center'
            >
                Fecha de Deploy : <strong>12/08/22</strong>
            </Typography>

        </Box>
    )
}