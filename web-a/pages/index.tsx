import { Box, Typography, useMediaQuery } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import socket from '../src/socket';
import Footer from '../src/components/Footer';
import Card from '../src/components/Card';
import Menu from  '../src/components/Menu';
import Header from  '../src/components/Header';
import { Data } from  '../src/redux/features/productSlice';
import { getAllProducts, selectProducts } from '../src/redux/features/productSlice';
import { logIn, selectUser } from '../src/redux/features/userSlice';
import { useSelector, useDispatch } from  'react-redux';
import { AppDispatch } from '../src/redux/store';



const Home: NextPage = () => {
  const data = useSelector(selectProducts);
  const dispatch = useDispatch<AppDispatch>();
  const W500 = useMediaQuery('(min-width:500px)');

  try {
    socket.on('server:changes', async () => dispatch(getAllProducts()));

  } catch (e) {
    console.log(e);
  }

  useEffect(() => {

    dispatch(getAllProducts());
    let loggedUser = window.localStorage.getItem('LoggedUser');
    if(loggedUser) dispatch(logIn(JSON.parse(loggedUser)))
  }, [])

  return (

    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}
    >
      <Menu />

      <Header />

      <Typography
        variant='h2'
        my='2rem'
        mt={W500 ? '' : '4rem'}
        align='center'

      >
        Lista de precios
      </Typography>

      <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        flexWrap='wrap'
        mb='3rem'
        sx={{ width: '80vw',  minHeight: 'max-content' }}
      >
        
        {
          data?.length
          ? data.map((e: Data) => {

            return <Card key={e._id} data={e} />
          })
          : (
            <Card  />
          )
        }

      </Box>



      <Footer />
    </Box>
  )
}



export default Home
