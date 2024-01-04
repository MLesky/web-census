import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToggleColorMode } from "./theme/toggleTheme";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { UserSession } from "./authenticate/context";
import { UserContextProvider } from "./user/user_context";
import { DataBaseTables } from "./respository/database_context";

function App() {
  const theme = useTheme();
  console.log("theme:", theme);

  return (
    <Box className="App">
      <ToggleColorMode>
        <DataBaseTables>
        <UserSession>
          <UserContextProvider>
            <RouterProvider router={routes} />
          </UserContextProvider>
        </UserSession>
        </DataBaseTables>
      </ToggleColorMode>
    </Box>
  );
}

export default App;
