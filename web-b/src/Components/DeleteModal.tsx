import { Box, Button, ButtonGroup, CircularProgress, IconButton, Modal, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { getAllProducts } from "../../redux/slices/productSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, selectAdmin } from '../../redux/slices/userSlice';
import type { AppDispatch } from  '../../redux/store';
import type { User } from "../../redux/slices/userSlice";



interface Data {
  _id: string,
  title: string,
  image: string,
  description: string,
  price: number,
  stock: boolean
}

interface Props{
    data?: Data;
    user?: User
}

export default function DeleteModal({ data, user }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { loggedAdmin: { token }} = useSelector(selectAdmin);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const W400 = useMediaQuery('(min-width:400px)');

    const handleOpen = () => {
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }
    const handleSend = async () => {
      setLoading(true);
      const ans = user 
        ? await axios.delete(`/users/${user._id}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        : await axios.delete(`/products/${data?._id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
      if (ans) setTimeout(() => {
        user 
        ? dispatch(getAllUsers(token))
        : dispatch(getAllProducts());
        setLoading(false);
      }, 2000)
    }

    return (
        <>
            <IconButton
              disabled={user?.role === 1 ? true : false}
              onClick={handleOpen}
            >
              <DeleteIcon />
            </IconButton>
        
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    flexDirection: `${W400 ? 'row' : 'column'}`,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-evenly'
                    minWidth='50vw'
                    minHeight='30vh'
                    sx={{
                        bgcolor: '#000',
                        borderRadius: '0.5rem',
                        color: '#fff'
                    }}
                >
                    <Typography
                        variant='h5'
                        align='center'
                        mx='0.5rem'
                    >
                        {loading ? 'Eliminando ' : `Deseas eliminar el ${user? 'usuario' : 'producto'}`} <br />
                        <strong>{user? user.name : data?.title }</strong> {loading ? '' : '?'}
                    </Typography>
                    <ButtonGroup>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={handleClose}
                        >
                            VOLVER
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleSend}
                            startIcon={<DeleteIcon />}
                        >
                            {
                                loading ? <CircularProgress color='info' /> : 'ELIMINAR'
                            }
                        </Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </>
    )
}