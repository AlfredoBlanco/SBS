import { Box, Button, Typography, useMediaQuery, Collapse, Skeleton, Slide } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../src/socket';
import Footer from '../src/components/Footer';
import Card from '../src/components/Card';
import Menu from  '../src/components/Menu';


interface Data {
  _id: string,
  title: string,
  image: string,
  description: string,
  price: number,
  stock: boolean
}

const Home: NextPage = () => {
  const [data, setData] = useState<Data[]>([]);
  const W500 = useMediaQuery('(min-width:500px)');

  try {
    socket.on('server:changes', async () => setData(await axios.get(`/products`).then(r => r.data.data)));

  } catch (e) {
    console.log(e);
  }

  useEffect(() => {

    const fetchData = async () => {
      setData(await axios.get(`/products`).then(r => r.data.data));

    }
    fetchData();

  }, [])

  return (

    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}
    >
      <Menu />

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
          ? data?.map((e: Data) => {

            return <Card key={e._id} data={e} />
          })
          : (
            <Card data={{ _id: 'string' }} />
          )
        }

      </Box>



      <Footer />
    </Box>
  )
}



export default Home
