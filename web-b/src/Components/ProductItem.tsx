import { Box, Grid, Typography, IconButton, useMediaQuery, Modal, Button, ButtonGroup, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Form from './Form';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin } from '../../redux/slices/userSlice';
import type { AppDispatch } from  '../../redux/store';
import { getAllProducts } from '../../redux/slices/productSlice';
import DeleteModal from './DeleteModal';


interface Data {
  _id: string,
  title: string,
  image: string,
  description: string,
  price: number,
  stock: boolean
}

export default function Item({ data }: { data: Data }) {
  const dispatch = useDispatch<AppDispatch>();
  const W400 = useMediaQuery('(min-width:400px)');
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    dispatch(getAllProducts())
    setOpen(false);
  }

  return (
    <>

      <Grid
        item
        xs={12}
        key={data._id}
      >
        <Box
          display='flex'
          width='100%'

        >


          <Box
            display='flex'
            flexDirection={W400 ? 'row' : 'column'}
            justifyContent='space-between'
            alignItems='center'
            width={W400 ? '80%' : '60%'}

          >
            <Typography
              variant='overline'
              fontSize={W400 ? 18 : 12}
              align='center'
            >
              {data.title}
            </Typography>
            <Typography
            >
              $ {data.price}
            </Typography>
          </Box>
          <Box
            display='flex'
            justifyContent='space-evenly'
            alignItems='center'
            width='20%'
          >
            <IconButton
              onClick={handleOpen}
            >
              <SettingsIcon />
            </IconButton>
            <DeleteModal data={data} />
          </Box>
        </Box>
      </Grid>

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
        <>
          <Form data={data} />
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
    </>
  )
}