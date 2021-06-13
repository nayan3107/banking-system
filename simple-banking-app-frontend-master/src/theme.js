import { createMuiTheme } from '@material-ui/core/styles';

export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
