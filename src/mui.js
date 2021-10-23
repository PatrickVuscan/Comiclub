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
      fontSize: 20,
      color: 'black !important',
      textTransform: 'capitalize',
    },
  },
  palette: {
    primary: {
      main: '#186ed1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#186ed1',
    },
  },
  // overrides: {
  //   MuiButton: {
  //     textSizeLarge: {
  //       fontSize: '100px',
  //     },
  //   },
  // },
});

export default theme;
