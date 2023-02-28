import { Box, Typography, useMediaQuery } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import socket from '../src/socket';
import Footer from '../src/components/Footer';
import Card from '../src/components/Card';
import Menu from '../src/components/Menu';
import Header from '../src/components/Header';
import { Data } from '../src/redux/features/productSlice';
import { getAllProducts, selectProducts } from '../src/redux/features/productSlice';
import { logIn, selectUser } from '../src/redux/features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../src/redux/store';
import type { Notice } from './auth/login';
import Notification from '../src/components/Notification';
import { MongoClient } from 'mongodb';
import { store } from  '../src/redux/store';


interface Props {
  status: string;
  change: boolean;
}

const Home: NextPage<Props> = ({ status, change }) => {
  const data = useSelector(selectProducts);
  const dispatch = useDispatch<AppDispatch>();
  const [notification, setNotification] = useState<Notice>({
    open: false,
    message: '',
    severity: 0,
  });
  const W500 = useMediaQuery('(min-width:500px)');
  useEffect(() => {
    console.log('change');

  }, [change])
  /* try{
    socket.on('change', () => console.log('Cambie'))
  } catch(e) {
    console.log(e)
  } */
  /* try {
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      console.log(err);
    });
    socket.on('server:changes', async () => dispatch(getAllProducts()));

  } catch (e) {
    console.log(e);
  } */

  useEffect(() => {
    dispatch(getAllProducts());
    let loggedUser = window.localStorage.getItem('LoggedUser');
    if (loggedUser) dispatch(logIn(JSON.parse(loggedUser)))
  }, [])

  useEffect(() => {
    if (status) {
      switch(status) {
        case 'approved': 
          setNotification({
            open: true,
            message: 'Felicidades por su compra!',
            severity: 0,
          })
        break;
        case 'in_process': 
          setNotification({
            open: true,
            message: 'Su pago está pendiente',
            severity: 1,
          })
        break;
        default: 
          setNotification({
            open: true,
            message: 'Ocurrió un error',
            severity: 2,
          })
      }
    }
  }, [])

  const handleCloseNotification = () => setNotification({
    open: false,
    message: '',
    severity: 0,
  });

  return (

    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}
    >
      <Menu />
      <button onClick={() => console.log(change)}>Ver Change</button>

      <Header />

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        handleClose={handleCloseNotification}
      />

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
        sx={{ width: '80vw', minHeight: 'max-content' }}
      >

        {
          data?.length
            ? data.map((e: Data) => {

              return <Card key={e._id} data={e} />
            })
            : (
              <Card />
            )
        }

      </Box>



      <Footer />
    </Box>
  )
}

export async function getServerSideProps(context: any) {
  const { query: { status = '' } } = context;
  let change= false;
  
  const mongoClient = new MongoClient(String(process.env.NEXT_PUBLIC_DB_URL));
  const changeStream = mongoClient.db().collection('products').watch();
  changeStream.on('change', () => {
    console.log('entre');
    window.location.reload();
  })

  return {
    props: { status, change },
  }
}


export default Home
