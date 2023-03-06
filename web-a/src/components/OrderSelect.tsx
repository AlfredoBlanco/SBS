import { FormControl, MenuItem, Select, SelectChangeEvent, Typography, Grid, Input } from "@mui/material";
import { orderZA, orderAZ, getAllProducts, orderPMax, orderPMin, filterByName } from "../redux/features/productSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../redux/store";
import React, { useState } from "react";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomEvent {
    target: { value : string} 
}

export default function OrderSelect({ setOpen }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [order, setOrder] = useState<string>('None');
    const [filter, setFilter] = useState<string>('');

    const handleChange = ({ target: { value } }: SelectChangeEvent | CustomEvent) => {
        setOrder(value);
        switch (value) {
            case 'AZ':
                dispatch(orderAZ())
                break;
            case 'ZA':
                dispatch(orderZA())
                break;
            case 'pMax':
                dispatch(orderPMin())
                break;
            case 'pMin':
                dispatch(orderPMax())
                break;
            default: dispatch(getAllProducts())
        }
        setOpen(false);
    };

    const handleSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(filterByName(filter));
        setOrder('None');
        setFilter('');
        setOpen(false);
    }

    return (
        <Grid
            container
            rowGap={2}
        >
            <Grid item xs={6}>

                <Typography
                    variant="h6"
                    color='#fff'
                    align='center'
                >
                    Ordernar
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl
                    variant='standard'
                    sx={{
                        width: { xs: '100%', sm: '60%' }
                    }}
                >

                    <Select
                        value={order}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                            color: '#fff',
                            textAlign: 'center'
                        }}

                    >
                        <MenuItem value="None">Sin orden</MenuItem>
                        <Typography pl='3px'>Alfabético</Typography>
                        <MenuItem value='AZ'>A-Z</MenuItem>
                        <MenuItem value='ZA'>Z-A</MenuItem>
                        <Typography pl='3px'>Precio</Typography>
                        <MenuItem value='pMax'>Mayor a menor</MenuItem>
                        <MenuItem value='pMin'>Menor a mayor</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    variant="h6"
                    color='#fff'
                    align='center'
                >
                    Filtrar
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <form
                    onSubmit={handleSubmit}
                >

                    <Input
                        sx={{ borderBottom: '1px solid #fff', color: '#fff', textAlign: 'center' }}
                        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setFilter(value)}
                        value={filter}
                    />
                </form>
            </Grid>
        </Grid>

    )
}
