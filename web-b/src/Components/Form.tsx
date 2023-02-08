import { Box, Checkbox, FormControl, IconButton,
    InputLabel, Input,
    useMediaQuery, Typography } from '@mui/material';
import { useState } from 'react';
import NestModal from './NestModal';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type { Data } from '../../redux/slices/productSlice';

interface Changes{
    _id ?: string,
    title ?: string,
    image ?: string,
    description ?: string,
    price ?: number,
    stock ?: number
}


export default function Form({data, add} : {data ?: Data, add ?: boolean}){
    const W400 = useMediaQuery('(min-width:400px)');
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [changes, setChanges] = useState<Changes>(data ? data : {title : '',
        image : '',
        description : '',
        price : 0,
        stock : 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
            setChanges({
                ...changes,
                [e.target.name] : e.target.value
            })
        
    }
    
    return(
        <Box 
            position = 'relative'
            display = 'flex'
            flexDirection = 'column'
            alignItems = 'center'
            width = {W400 ? '80%' : '100%'}
            sx={{
                backgroundColor : '#ffffff',
                borderRadius : '1rem'
            }}
            >
            <IconButton 
                aria-label='info'
                sx={{
                    position : 'absolute',
                    top : '2px',
                    right : '2px',
                }}
                onClick={() => setShowInfo(!showInfo)}
                >
                <QuestionMarkIcon />
            </IconButton>
            <Typography
                variant='h5'
                align='center'
                marginTop = '2px'
            >
                {
                    add
                    ? 'Nuevo producto'
                    : 'Actualizar producto'
                }
                
            </Typography>   
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`,
                    color : 'rgba(0,0,0,0.7)'
                
                }}
            >
              <InputLabel htmlFor="name-input">Nombre</InputLabel>
              <Input id="name-input" name='title' 
                fullWidth={true}
                value={changes.title} 
                onChange={handleChange} />
                <Typography
                    display = {showInfo ? 'block' : 'none'}
                >
                    El nombre debe tener al menos 4 caracteres
                </Typography>
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`,
                    color : 'rgba(0,0,0,0.7)'
                }}
            >
              <InputLabel htmlFor="price-input">Precio</InputLabel>
              <Input id="price-input" name='price' type='number' value={changes.price} 
                onChange={handleChange} />
              <Typography
                  display = {showInfo ? 'block' : 'none'}
                >
                  El precio debe ser mayor a cero
              </Typography>
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`,
                    color : 'rgba(0,0,0,0.7)'
                }}
            >
              <InputLabel htmlFor="description-input">Descripcion</InputLabel>
              <Input id="description-input" name='description' type='text' value={changes.description} 
                onChange={handleChange} />
                <Typography
                    display = {showInfo ? 'block' : 'none'}
                >
                    La descripción debe tener al menos 10 caracteres
                </Typography>
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`,
                    color : 'rgba(0,0,0,0.7)'
                }}
            >
              <InputLabel htmlFor="image-input">Imagen</InputLabel>
              <Input id="image-input" name='image' type='url' value={changes.image} 
                onChange={handleChange} 
                aria-describedby="image-helper" />
              <Typography
                    display = {showInfo ? 'block' : 'none'}
                >
                    La imagen debe ser una dirección url válida
                </Typography>
            </FormControl>
            <FormControl
                sx={{
                    marginY : '1rem',
                    width : `${W400 ? '80%' : '90%'}`,
                    color : 'rgba(0,0,0,0.7)'
                }}
            >
              <InputLabel htmlFor="stock-input">Stock</InputLabel>
              <Input id="stock-input" name='stock' type='number' value={changes.stock} 
                onChange={handleChange} />
                <Typography
                  display = {showInfo ? 'block' : 'none'}
                >
                  El stock debe ser positivo
              </Typography>
              
            </FormControl>
            <NestModal changes={changes} add={add} setShowInfo={setShowInfo} />
            
        </Box>
    )
}