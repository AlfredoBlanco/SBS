import { Box, Grid, Typography, IconButton, Button, useMediaQuery } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Item from '../src/Components/Item';


interface Data{
  _id : string,
  title : string,
  image : string,
  description : string,
  price : number,
  stock : boolean
}

const Home: NextPage = () => {
  const [data, setData] = useState<Data[]>([]);
  const W400 = useMediaQuery('(min-width:400px)');

  useEffect(() => {
    const fetchData = async() => {
      
      setData(await fetch('http://localhost:3001/').then(r => r.json()));
    }
    fetchData();

  }, [])

  return (
    <Box 
      display='flex'
      flexDirection='column'
      alignItems='center'
      minHeight='100vh'
      width='100vw'
      
    >
      <Head>
        <title>Web-B</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography
        variant='h2'
        align='center'
      >
        Tablero de Control
      </Typography>
      
      <Grid
        container
        width={W400 ? '80vw' : '100vw'}
        border={2}
      >
        {
          data.map((e : Data) => {
            return(
              <Item data={e} key={e._id} />
            )
          })
        }
        
      </Grid>
      <Button 
        variant='outlined'
        color='primary'
        sx={{
          margin : '6px'
        }}
      >
        AGREGAR
      </Button>
    </Box>
  )
}

export default Home
