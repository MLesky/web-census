import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: theme.palette.background.default }}>
          {children}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { ToggleColorMode, ColorModeContext };
