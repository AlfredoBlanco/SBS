import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    info : {
      main : grey[900]
    },
    error: {
      main: red.A400,
    },
    background : {
      default : grey[100]
    },
  },
  typography : {
    h2: {
      fontSize : '2.5rem'
    },
    caption : {
      fontSize : '2rem',
      fontWeight : 'bold'
    }
  },
});

export default theme;