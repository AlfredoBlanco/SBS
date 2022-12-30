import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Collapse, Divider, List, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';



export default function Header() {
    const {loggedUser} = useSelector(selectUser);

    return (
        <Box
            position='relative'
            mt='0.5rem'
            mx='0.5rem'
            alignSelf='flex-end'
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='2rem'
            zIndex='90'
        >
            <AccountCircleRoundedIcon fontSize='large' />
            
            <Typography
                variant='inherit'
            >
                {loggedUser.loggedIn ? `Bienvenido, ${loggedUser.name}` : ''}
                
            </Typography>

        </Box>
    )
} 