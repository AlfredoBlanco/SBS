import {
    Alert, Box, Typography, Button, useMediaQuery,
    FormControl, Input, InputLabel, Link, LinearProgress
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';
import Notification from '../../src/components/Notification';

interface NewUser {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
}

export interface Notice {
    open: boolean;
    message: string;
    severity: number;
}

export default function Login() {
    const W700 = useMediaQuery('(min-width:700px)');
    const [info, setInfo] = useState<NewUser>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [error, setError] = useState<boolean>(false);

    const [notification, setNotification] = useState<Notice>({
        open: false,
        message: '',
        severity: 0,
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
        severity: 0,
    });

    const validate = () => {
        let err: any = {};

        if (!info.name || !/^[a-zA-z ]+$/i.test(info.name) || info.name.length < 4) err.name = true;
        if (!info.email || !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(info.email)) err.email = true;
        if (!info.password || info.password !== info.passwordConfirm) err.password = true;

        return Object.keys(err).length === 0 ? true : false;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (validate()) {
            setError(false);
            await axios.post('/auth/register', { ...info })
                .then(({ data }) => {
                    setNotification({
                        open: true,
                        message: data.data,
                        severity: 0,
                    });

                    Router.push('/auth/login/?success=true');
                })
                .catch((e) => {
                    for(let i in e.response.data) {
                        setNotification({
                        open: true,
                        message: e.response.data[i],
                        severity: 2,
                    });
                    }
                })

        } else {
            setError(true);
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
                    Registrate
                </Typography>
                {/* Name */}
                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%',
                    }}
                >
                    <InputLabel htmlFor="name-input">Nombre</InputLabel>
                    <Input id="name-input" name='name' value={info.name} fullWidth={true}
                        onChange={handleChange} />
                    <Typography fontSize='0.8rem'>
                        {
                            error ? 'El nombre solo debe tener letras, al menos 4' : ''
                        }
                    </Typography>
                </FormControl>

                {/* Email */}
                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%',
                    }}
                >
                    <InputLabel htmlFor="email-input">Email</InputLabel>
                    <Input id="email-input" name='email' value={info.email} fullWidth={true}
                        onChange={handleChange} />
                    <Typography fontSize='0.8rem'>
                        {
                            error ? 'El email debe ser una dirección de correo válida' : ''
                        }
                    </Typography>
                </FormControl>

                {/* Password */}
                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%'
                    }}
                >
                    <InputLabel htmlFor="password-input">Contraseña</InputLabel>
                    <Input id="password-input" name='password' type='password' value={info.password}
                        onChange={handleChange} />
                    <Typography fontSize='0.8rem'>
                        {
                            error ? 'La contraseña es requerida' : ''
                        }
                    </Typography>
                </FormControl>

                {/* Password-Confirm */}
                <FormControl
                    sx={{
                        marginY: '1rem',
                        width: '90%'
                    }}
                >
                    <InputLabel htmlFor="confirm-input">Confirmar contraseña</InputLabel>
                    <Input id="confirm-input" name='passwordConfirm' type='password' value={info.passwordConfirm}
                        onChange={handleChange} />
                    <Typography fontSize='0.8rem'>
                        {
                            error ? 'Las contraseñas deben coincidir' : ''
                        }
                    </Typography>
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
                                    ENVIAR
                                </Button>
                                <Link href={'/auth/register'}
                                    color='#6a21d2'
                                >
                                    <Typography
                                        fontSize='0.8rem'
                                    >
                                        Ya tienes cuenta? Inicia sesión
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