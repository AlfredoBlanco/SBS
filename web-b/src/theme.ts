import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background : {
      default : grey[100]
    }
  },
});

export default theme;