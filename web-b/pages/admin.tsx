import GoToLogIn from "../src/Components/GoToLogIn";
import Header from "../src/Components/Header";
import List from "../src/Components/List";
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin, getAllUsers } from '../redux/slices/userSlice';
import { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { Box, Button, Typography } from "@mui/material";
import AddAdmin from "../src/Components/AddAdmin";

/* Agregar en back que se pueda eliminar admin si sos vos */

export default function Admin() {
    const { loggedAdmin, users } = useSelector(selectAdmin);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (loggedAdmin.loggedIn) {
          dispatch(getAllUsers(loggedAdmin.token))
        };
      }, [dispatch, loggedAdmin])
    return (
        loggedAdmin.loggedIn
        ? (
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
            >
                <Header users={true} />

                <Typography
                    variant='h3'
                >
                    Listado de usuarios
                </Typography>

                <List users={users} />

                <AddAdmin />
                
            </Box>
        )
        : (
            
            <GoToLogIn />
        )
    )
}