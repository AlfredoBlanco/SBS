import {
    Alert, Box, Typography, Button, useMediaQuery,
    FormControl, Input, InputLabel, Link, LinearProgress
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { logIn } from '../../src/redux/features/userSlice';
import Router from 'next/router';
import Notification from '../../src/components/Notification';
import { GetServerSideProps } from 'next'

interface UserLogin {
    email: string;
    password: string;
}
export interface Notice {
    open: boolean;
    message: string;
    severity: number;
}

export default function Login({ success }: { success : boolean}) {
    const dispatch = useDispatch<AppDispatch>();
    const W700 = useMediaQuery('(min-width:700px)');
    const [info, setInfo] = useState<UserLogin>({
        email: '',
        password: '',
    })
    const [notification, setNotification] = useState<Notice>({
        open: false,
        message: '',
        severity: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(success) {
            setNotification({
                open: true,
                message: 'User created successfully',
                severity: 0,
            })
        }
    }, [])

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [target.name]: target.value
        })
    }

    const handleClose = () => setNotification({
        open: false,
        message: '',
        severity: 0,
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
                    severity: 2,
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
                    <InputLabel htmlFor="email-input">Email</InputLabel>
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
                    <Input id="password-input" name='password' type='password' value={info.password}
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
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='end'
                                width='90%'
                                gap={2}
                            >
                                <Button
                                    type='submit'

                                    sx={{ color: '#6a21d2' }}
                                >
                                    ENTRAR
                                </Button>
                                <Link href={'/auth/register'}
                                    color='#6a21d2'
                                >
                                    <Typography
                                        fontSize='0.8rem'
                                    >
                                        No tienes cuenta? Registrate
                                    </Typography>
                                </Link>
                            </Box>
                        )
                }

            </form>
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                handleClose={handleClose}
            />

        </Box>
    )
}

export const getServerSideProps: GetServerSideProps =  async(context) => {
    const { query: { success = false } } = context;
    return {
      props: {
        success,
      },
    }
  }