import { Box, Typography, Button, Link } from '@mui/material';

export default function GoToLogIn(){
    return (
        <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        sx={{
          backgroundImage : 'radial-gradient( #dee2e6, #e7e6f7)',
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          gap='2rem'
          border='2px solid black'
          p='2rem'
          borderRadius='2rem'
          sx={{
            bgcolor : 'rgba(237, 237, 233, 0.5)'
          }}
        >
          <Typography
          variant='h3'
          align='center'
        >
          Panel de control
          </Typography>
          <Typography
          variant='body1'
          align='center'
        >
          Recuerda que debes ser administrador para poder acceder
          </Typography>
          <Link
            href='/auth/login'
            underline='none'
          >
            <Button
              variant='outlined'
              color='success'
              sx={{
                borderTopLeftRadius : '1rem',
                borderBottomRightRadius : '1rem',
              }}
            >
              LOGIN
            </Button>
          </Link>
          </Box>
      </Box>
    )
}