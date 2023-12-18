import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { logo } from "../assets";
import { appName, routeNames } from "../constants";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Add, ArrowBack, Brightness2, Brightness4, MenuOpen, MenuOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../theme/toggleTheme";
import { RegisterPage } from "../pages";
import RegisterUserForm from "./registerUserForm";
import { AuthContext } from "../authenticate/context";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const userSession = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("User session", userSession);

  const [openAboutMenu, setOpenAboutMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    if (userSession.username === "") {
      navigate("/login");
    }
  }, [userSession]);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  const handleCloseRegisterForm = () => setOpenRegisterForm(false);
  console.log(
    "onclose: ",
    handleCloseRegisterForm,
    typeof handleCloseRegisterForm
  );

  const handleAboutMenuClose = () => {
    setOpenAboutMenu(false);
  };

  const handleAboutMenuOpen = (e) => {
    setMenuAnchor(e.currentTarget);
    setOpenAboutMenu(true);
  };
  return (
    <Stack>
      <Paper
        sx={{ py: 1, paddingLeft: 0, paddingRight: 2, borderRadius: 0 }}
        color="primary"
        elevation={4}
        className="bg-2"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems='center'>
            <Box sx={{paddingX: 1}}><img src={logo} alt={appName} height='30px' width='30px'/></Box>
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

          <Box sx={{display: {xs: 'none', md: 'inherit'}}}>
          {buildNavLinks('row')}
          </Box>

            <SwipeableDrawer
              anchor='right'
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              onOpen={() => setOpenDrawer(true)}
            >
              <Stack padding={3}>
                <Stack direction='row' justifyContent='start'>
                  <IconButton onClick={() => setOpenDrawer(false)}><ArrowBack /></IconButton>
                </Stack>
              {buildNavLinks('column')}
              </Stack>
            </SwipeableDrawer>

          <Stack direction="row" spacing={2} marginRight={1}>
            <IconButton onClick={() => setOpenRegisterForm(true)}>
              <Add sx={{ color: "white" }} />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "light" ? (
                <Brightness2 sx={{ color: "white" }} />
              ) : (
                <Brightness4 sx={{ color: "white" }} />
              )}
            </IconButton>
            <IconButton onClick={() => setOpenDrawer(true)} sx={{display: {xs: 'inherit', md: 'none'}}}><MenuOutlined /></IconButton>
          </Stack>
        </Stack>
      </Paper>

      <RegisterUserForm
        open={openRegisterForm}
        handleClose={handleCloseRegisterForm}
      />

      <Outlet />
    </Stack>
  );

  function buildNavLinks(direction) {
    return <Stack
      direction={direction}
      spacing={{ xs: '5px', md: "1px", lg: "3px", xl: 1 }}
      alignItems="center"
    >
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
      <Stack
      direction={direction}
        sx={{
          display: {
            xs: "block",
            md: "none",
            lg: "block",
          },
        }}
      >
        <NavLink to={routeNames.about} className="nav-link">
          About Us
        </NavLink>
        <NavLink to={routeNames.contact} className="nav-link">
          Contact Us
        </NavLink>
      </Stack>
      <IconButton
        onClick={handleAboutMenuOpen}
        sx={{
          display: {
            xs: "none",
            md: "inherit",
            lg: "none",
          },
        }}
      >
        <MenuOpen />
      </IconButton>
      <Menu
        open={openAboutMenu}
        onClose={handleAboutMenuClose}
        anchorEl={menuAnchor}
      >
        <MenuItem>
          <NavLink to={routeNames.about} className="nav-link">
            About Us
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={routeNames.contact} className="nav-link">
            Contact Us
          </NavLink>
        </MenuItem>
      </Menu>
    </Stack>;
  }
};

export default Navbar;
