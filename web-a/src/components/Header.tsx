import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Button, Collapse, Divider, IconButton, List, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';
import { selectCart } from '../redux/features/cartSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Cart from './Cart';
export default function Header() {
    const { loggedUser } = useSelector(selectUser);
    const { items } = useSelector(selectCart);

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