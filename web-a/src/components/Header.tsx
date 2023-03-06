import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';
import { selectCart } from '../redux/features/cartSlice';
import Cart from './Cart';


export default function Header() {
    const { loggedUser } = useSelector(selectUser);

    return (
        <Box
            position='absolute'
            top= '1rem'
            right= '1rem'
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='2rem'
            maxWidth='70%'
            zIndex='90'
        >
            {
                loggedUser.loggedIn
                    ? (
                        <Cart />
                    ) : ''
            }

            <AccountCircleRoundedIcon fontSize='large' />

            <Typography
                variant='inherit'
                align='center'
            >
                {loggedUser.loggedIn ? `Bienvenido, ${loggedUser.name}` : ''}

            </Typography>

        </Box>
    )
} 