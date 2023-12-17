import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { logo } from "../assets";
import { appName, routeNames } from "../constants";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Add, Brightness2, Brightness4 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../theme/toggleTheme";
import { RegisterPage } from "../pages";
import RegisterUserForm from "./registerUserForm";
import { AuthContext } from "../authenticate/context";

const Navbar = () => {
   const theme = useTheme()
   const colorMode = useContext(ColorModeContext)
   const userSession = useContext(AuthContext)
   const navigate = useNavigate()
   console.log('User session', userSession)

   useEffect(
     () => {
       if(userSession.username === ''){
          navigate('/login')
       }
     },
     [userSession]
   )
   const [openRegisterForm, setOpenRegisterForm] = useState(false)

   const handleCloseRegisterForm = () => setOpenRegisterForm(false)
   console.log('onclose: ', handleCloseRegisterForm, typeof(handleCloseRegisterForm))

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
              <IconButton onClick={() => setOpenRegisterForm(true)}>
                <Add sx={{fontSize: 30, color: 'white'}} />
              </IconButton>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'light' ? <Brightness2 sx={{color: 'white'}} /> : <Brightness4 sx={{color: 'white'}} />}
              </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <RegisterUserForm open={openRegisterForm} handleClose={handleCloseRegisterForm} />

      <Outlet />
    </Stack>
  );
};

export default Navbar;
