import { createTheme } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: "#2EA6C6",
    },
    secondary: {
      main: "#2F1F3E",
    },

    background: {
        default: '#fff',
    }
  },
});

export default lightTheme;