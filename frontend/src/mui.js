import { createTheme } from '@mui/material/styles';

// The creation of our MuiTheme
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
      fontSize: '1rem',
      color: 'black',
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
  components: {
    MuiTooltip: {
      defaultProps: {
        enterDelay: 500,
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
