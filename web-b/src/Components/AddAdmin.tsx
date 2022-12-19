import {
    Box, FormControl, IconButton,
    InputLabel, Input, useMediaQuery,
    Typography, Button, Modal
} from '@mui/material';
import { useState } from 'react';
import ConfirmAdmin from './ConfirmAdmin';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { getAllUsers, selectAdmin } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';


interface Data {
    _id: string,
    title: string,
    image: string,
    description: string,
    price: number,
    stock: boolean
}

interface Changes {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    role: number
}


export default function AddAdmin({ data, add }: { data?: Data, add?: boolean }) {
    const { loggedAdmin: {token} } = useSelector(selectAdmin);
    const dispatch = useDispatch<AppDispatch>();
    const W400 = useMediaQuery('(min-width:400px)');
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [changes, setChanges] = useState<Changes>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setChanges({
            ...changes,
            [e.target.name]: e.target.value
        })
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        dispatch(getAllUsers(token))
        setOpen(false)
        setChanges({
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            role: 1
        })
    }

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    position='relative'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    width={W400 ? '80%' : '100%'}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '1rem'
                    }}
                >
                    <IconButton
                        aria-label='info'
                        sx={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                        }}
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        <QuestionMarkIcon />
                    </IconButton>
                    <Typography
                        variant='h5'
                        align='center'
                        marginTop='2px'
                    >
                        Nuevo administrador
                    </Typography>
                    <FormControl
                        sx={{
                            marginY: '1rem',
                            width: `${W400 ? '80%' : '90%'}`,
                            color: 'rgba(0,0,0,0.7)'

                        }}
                    >
                        <InputLabel htmlFor="name-input">Nombre</InputLabel>
                        <Input id="name-input" name='name'
                            fullWidth={true}
                            value={changes.name}
                            onChange={handleChange} />
                        <Typography
                            display={showInfo ? 'block' : 'none'}
                        >
                            El nombre debe tener al menos 4 caracteres
                        </Typography>
                    </FormControl>
                    <FormControl
                        sx={{
                            marginY: '1rem',
                            width: `${W400 ? '80%' : '90%'}`,
                            color: 'rgba(0,0,0,0.7)'
                        }}
                    >
                        <InputLabel htmlFor="email-input">email</InputLabel>
                        <Input id="email-input" name='email' type='email' value={changes.email}
                            onChange={handleChange} />
                        <Typography
                            display={showInfo ? 'block' : 'none'}
                        >
                            El email debe ser una dirección de correo válida
                        </Typography>
                    </FormControl>
                    <FormControl
                        sx={{
                            marginY: '1rem',
                            width: `${W400 ? '80%' : '90%'}`,
                            color: 'rgba(0,0,0,0.7)'
                        }}
                    >
                        <InputLabel htmlFor="password-input">Contraseña</InputLabel>
                        <Input id="password-input" name='password' type='password' value={changes.password}
                            onChange={handleChange} />
                        <Typography
                            display={showInfo ? 'block' : 'none'}
                        >
                            La contraseña es requerida
                        </Typography>
                    </FormControl>
                    <FormControl
                        sx={{
                            marginY: '1rem',
                            width: `${W400 ? '80%' : '90%'}`,
                            color: 'rgba(0,0,0,0.7)'
                        }}
                    >
                        <InputLabel htmlFor="password-input">Confirmar contraseña</InputLabel>
                        <Input id="password-input" name='passwordConfirm' type='password' value={changes.passwordConfirm}
                            onChange={handleChange} />
                        <Typography
                            display={showInfo ? 'block' : 'none'}
                        >
                            La contraseña debe concidir
                        </Typography>
                    </FormControl>
                    <ConfirmAdmin changes={changes} add={add} setShowInfo={setShowInfo} />

                </Box>
            </Modal>
            <Button
                variant='outlined'
                color='primary'
                sx={{
                    margin: '6px'
                }}
                onClick={handleOpen}
            >
                AGREGAR ADMIN
            </Button>


        </>
    )
}