import { Box, Checkbox, FormControl, InputLabel, Input, FormHelperText, Button, useMediaQuery, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import NestModal from './NestModal';


interface Data{
    _id : string,
    title : string,
    image : string,
    description : string,
    price : number,
    stock : boolean
}

interface Changes{
    _id ?: string,
    title ?: string,
    image ?: string,
    description ?: string,
    price ?: number,
    stock ?: boolean
}

export default function Form({data, add} : {data ?: Data, add ?: Boolean}){
    const W400 = useMediaQuery('(min-width:400px)');
    const [changes, setChanges] = useState<Changes>(data ? data : {title : '',
        image : '',
        description : '',
        price : 0,
        stock : false});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'stock') {
            setChanges({
                ...changes,
                [e.target.name] : e.target.checked
            })
        } else {

            setChanges({
                ...changes,
                [e.target.name] : e.target.value
            })
        }
    }
    
    
    return(
        <Box 
            display = 'flex'
            flexDirection = 'column'
            alignItems = 'center'
            width = {W400 ? '80%' : '100%'}
            sx={{
                backgroundColor : '#ffffff',
                borderRadius : '1rem'
            }}
            >
            <Typography
                variant='h5'
                align='center'
            >
                Debes llenar todos los campos 
            </Typography>   
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`
                
                }}
            >
              <InputLabel htmlFor="name-input">Nombre</InputLabel>
              <Input id="name-input" name='title' 
                fullWidth={true}
                value={changes.title} 
                onChange={handleChange} />
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`
                }}
            >
              <InputLabel htmlFor="price-input">Precio</InputLabel>
              <Input id="price-input" name='price' type='number' value={changes.price} 
                onChange={handleChange} />
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`
                }}
            >
              <InputLabel htmlFor="description-input">Descripcion</InputLabel>
              <Input id="description-input" name='description' type='text' value={changes.description} 
                onChange={handleChange} />
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`
                }}
            >
              <InputLabel htmlFor="image-input">Imagen</InputLabel>
              <Input id="image-input" name='image' type='url' value={changes.image} 
                onChange={handleChange} 
                aria-describedby="image-helper" />
              <FormHelperText id="image-helper">
                Introduzca la dirección  de una imagen.
              </FormHelperText>
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '50%' : '90%'}`
                }}
            >
              <InputLabel htmlFor="stock-input">Stock</InputLabel>
              <Checkbox id="stock-input" name='stock' 
                onChange={handleChange} defaultChecked={changes?.stock ? true : false} />
            </FormControl>
            <NestModal changes={changes} add={add} />
            
            
            

        </Box>
    )
}