import {
  Box, Typography, Modal, Button, useMediaQuery} from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Form from '../src/Components/Form';
import Header from '../src/Components/Header';
import GoToLogIn from '../src/Components/GoToLogIn';
import List from '../src/Components/List';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, getAllProducts } from '../redux/slices/productSlice';
import { selectAdmin } from '../redux/slices/userSlice';
import type { AppDispatch } from  '../redux/store';


const Home: NextPage = () => {
  const products = useSelector(selectProducts);
  const { loggedAdmin } = useSelector(selectAdmin);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const W400 = useMediaQuery('(min-width:400px)');

  useEffect(() => {
    if (loggedAdmin.loggedIn) {
      dispatch(getAllProducts())
    };
  }, [dispatch, loggedAdmin])
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    dispatch(getAllProducts())
    setOpen(false)
  }
  return (
    loggedAdmin.loggedIn
      ? (<Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        minHeight='100vh'
        width='100vw'
        bgcolor='rgba(231, 230, 247, 0.5)'

      >
        
        <Header />

        <Typography
          variant='h2'
          align='center'
        >
          Tablero de Control
        </Typography>

        <List products={products} />

        <Button
          variant='outlined'
          color='primary'
          sx={{
            margin: '6px'
          }}
          onClick={handleOpen}
        >
          AGREGAR
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <>
            <Form add={true} />
            <Button
              variant='text'
              sx={{
                position: 'absolute',
                top: `${W400 ? '1rem' : '0.2rem'}`,
                right: '0.5rem',
                color: '#fff',
                border: '1px solid #000',

              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
          </>
        </Modal>
      </Box>)
      : (
        <GoToLogIn />
      )
  )
}


export default Home
