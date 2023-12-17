import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToggleColorMode } from "./theme/toggleTheme";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { UserSession } from "./authenticate/context";

function App() {
  const theme = useTheme();
  console.log("theme:", theme);

  return (
    <Box className="App">
      <ToggleColorMode>
        <UserSession>
          <RouterProvider router={routes} />
        </UserSession>
      </ToggleColorMode>
    </Box>
  );
}

export default App;
