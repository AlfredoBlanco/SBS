import {
    Alert, Box, Typography, Button, useMediaQuery,
    FormControl, Input, InputLabel, Snackbar, LinearProgress
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from  'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { logIn } from '../../src/redux/features/userSlice';
import Router from 'next/router';

interface AdminLogin {
    email: string;
    password: string;
}
interface Notice {
    open: boolean;
    message: string;
}

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const W700 = useMediaQuery('(min-width:700px)');
    const [info, setInfo] = useState<AdminLogin>({
        email: '',
        password: '',
    })
    const [notification, setNotification] = useState<Notice>({
        open: false,
        message: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [target.name]: target.value
        })
    }

    const handleClose = () => setNotification({
        open: false,
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const user = await axios.post('/auth/login', { ...info })
            .then(r => r.data.data)
            .catch((e) => {
                setNotification({
                    open: true,
                    message: e.response.data,
                });
            });

        if (user) {
            window.localStorage.setItem(
                'LoggedUser', JSON.stringify(user)
            );
            dispatch(logIn(user))
            Router.push('/')
        }

        setLoading(false)
    }

    return (
        <Box
            position='relative'
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100vw'
            height='100vh'
            sx={{
                backgroundColor: '#edf2fb',
            }}
        >
            <form
                style={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    'justifyContent': 'center',
                    'width': `${W700 ? '40%' : '80%'}`,
                    'height': 'max-content',
                }}
                onSubmit={handleSubmit}

            >
                <Typography
                    variant='h3'
                    align='center'
                    color='#6a21d2'

                >
                    Inicie sesión
                </Typography>
                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%',
                    }}
                >
                    <InputLabel htmlFor="name-input">Email</InputLabel>
                    <Input id="email-input" name='email' value={info.email} fullWidth={true}
                      onChange={handleChange} />
                </FormControl>

                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%'
                    }}
                >
                    <InputLabel htmlFor="password-input">Contraseña</InputLabel>
                    <Input id="image-input" name='password' type='password' value={info.password}
                        onChange={handleChange} />

                </FormControl>
                {
                    loading
                        ? (
                            <LinearProgress
                                color='secondary'
                                sx={{
                                    height: '3px',
                                    width: '90%',
                                }}
                            />
                        )
                        : (
                            <Button
                                type='submit'
                                
                                sx={{ color: '#6a21d2' }}
                            >
                                ENTRAR
                            </Button>
                        )
                }

            </form>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity='error'
                    sx={{
                        bgcolor: '#d64933',
                        color: '#fff'
                    }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}