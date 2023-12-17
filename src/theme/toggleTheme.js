import { Box, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode({ children }) {
  const storedMode = localStorage.getItem('mode');
  // console.log('Stored mode:', storedMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // console.log('Prefers', prefersDarkMode)
  const [mode, setMode] = useState((storedMode == null || storedMode === '') ? prefersDarkMode ? "dark" : "light" : storedMode);
  // console.log('Mode', mode)
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark')
        // console.log('stores mode', mode === 'dark' ? 'light' : 'dark')
      },
    }),
    []
  );

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode, prefersDarkMode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: theme.palette.background.default, width: '100vw', minHeight: '100vh' }}>
          {children}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { ToggleColorMode, ColorModeContext };
