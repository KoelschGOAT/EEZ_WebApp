import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#4c9078',
    },
    buttonRed: {
      main: '#E60146',
      hover: { backgroundColor: '#FF3B6B' },
    },

    secondary: {
      main: '#669995',
    },

    neutral: {
      main: '#669995',
      contrastText: '#fff',
    },
  },
});
export default theme;
