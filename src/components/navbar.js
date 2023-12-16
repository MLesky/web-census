import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { logo } from "../assets";
import { appName, routeNames } from "../constants";
import { NavLink, Outlet } from "react-router-dom";
import { Add, Brightness2, Brightness4 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "../theme/toggleTheme";

const Navbar = () => {
   const theme = useTheme()
   const colorMode = useContext(ColorModeContext)

  return (
    <Stack>
      <Paper sx={{ padding: 2, borderRadius: 0 }} color="primary" elevation={4} className="bg-2">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row">
            <Box sx={{paddingX: 1}}><img src={logo} alt={appName} className="logo" /></Box>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "bold",
                padding: 0,
              }}
            >
              {appName}
            </Typography>
          </Stack>

          <Stack direction="row" spacing="5px" alignItems="center">
            <NavLink to={routeNames.dashboard} className="nav-link">
              All
            </NavLink>
            <NavLink to={routeNames.people} className="nav-link">
              People
            </NavLink>
            <NavLink to={routeNames.region} className="nav-link">
              Regions
            </NavLink>
            <NavLink to={routeNames.divisions} className="nav-link">
              Divisions
            </NavLink>
            <NavLink to={routeNames.subDivisions} className="nav-link">
              Sub Divisions
            </NavLink>
            <NavLink to={routeNames.about} className="nav-link">
              About Us
            </NavLink>
            <NavLink to={routeNames.contact} className="nav-link">
              Contact Us
            </NavLink>
          </Stack>

          <Stack direction="row" spacing={2}>
              <IconButton>
                <Add sx={{fontSize: 30, color: 'white'}} />
              </IconButton>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'light' ? <Brightness2 sx={{color: 'white'}} /> : <Brightness4 sx={{color: 'white'}} />}
              </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <Outlet />
    </Stack>
  );
};

export default Navbar;
