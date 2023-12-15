import { createTheme } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    primary: {
      main: "#2EA6C6",
    // dark:
    },
    secondary: {
      main: "#2F1F3E",
    },

    custom: {
        light: '#f5efff',
        dark: '#252525'
    }
  },
});

export default lightTheme;