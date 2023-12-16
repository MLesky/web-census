import { createTheme } from "@mui/material/styles";

let darkTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: "#2EA6C6",
    },
    secondary: {
      main: "#2F1F3E",
    },

    background: {
        default: '#121212',
    }
  },
});

export default darkTheme;