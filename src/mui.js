import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // fontSize: `1rem`,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'capitalize',
    },
  },
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#186ed1',
    },
    secondary: {
      main: '#186ed1',
      contrastText: '#fff',
    },
    // contrast: {
    //   main: '#ffffff',
    // },
  },
});

export default theme;
