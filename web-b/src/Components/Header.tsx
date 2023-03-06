import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Collapse, Divider, List, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import Router from 'next/router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, selectAdmin, getAllUsers } from '../../redux/slices/userSlice';
import { getAllProducts } from '../../redux/slices/productSlice';
import { AppDispatch } from "../../redux/store";

interface Props {
  users?: boolean
}

export default function Header({ users }: Props) {
  const { loggedAdmin } = useSelector(selectAdmin);
  const dispatch = useDispatch<AppDispatch>();
  const [openList, setOpenList] = useState<boolean>(false);
  const W400 = useMediaQuery('(min-width:400px)');
  const W700 = useMediaQuery('(min-width:700px)');

  const handleList = () => {
    setOpenList(!openList)
  }
  const handleLogOut = () => {
    dispatch(logOut());

  }
  const handleRefresh = () => {
    if (users) {

      dispatch(getAllUsers(loggedAdmin.token));
    } else {

      dispatch(getAllProducts());
    }

  }

  return (
    <Box
      position='relative'
      mt='0.5rem'
      alignSelf='flex-end'
      display='flex'
      flexDirection='column'
      zIndex='100'
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='2rem'
      >
        <AccountCircleRoundedIcon fontSize='large' />

        <Typography
          variant='inherit'
        >
          Bienvenido, {loggedAdmin.name}
        </Typography>
        <Button
          variant='text'
          color='inherit'
          sx={{
            padding: '0px',
            margin: '0px'
          }}
          onClick={handleList}
        >
          {openList ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </Box>
      <Collapse
        in={openList}
        timeout='auto'
        unmountOnExit
        sx={{
          position: 'absolute',
          top: '2rem',
          right: '2px',
          display: 'flex',
          width: 'max-content',
          minWidth: W400 ? 'auto' : '60vw',
          marginTop: '2px',
          bgcolor: W700 ? 'rgba(0, 0, 0, 0.3)' : '#fff',
          borderRadius: '1rem',
          overflow: 'hidden'
        }}
      >
        <List component="nav" disablePadding>
          <ListItemText
            primary="Administrar"
            sx={{
              paddingLeft: '2px'
            }}
          />
          <ListItemButton
            onClick={() => {
              if (users) {
                Router.push('/');

              } else {
                Router.push('/admin')
              }
            }}
          >
            <ListItemText
              primary={users ? 'Productos' : 'Usuarios'}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={handleRefresh}
            sx={{
              padding: '0px 1rem',
            }}
          >
            <ListItemText
              primary="Refrescar"
            />
          </ListItemButton>
          <ListItemButton
            onClick={handleLogOut}
            sx={{
              padding: '0px 1rem',
            }}
          >
            <ListItemText
              primary="Cerrar sesión"
            />
          </ListItemButton>
        </List>

      </Collapse>

    </Box>
  )
} 