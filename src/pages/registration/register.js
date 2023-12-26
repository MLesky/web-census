import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../user/user_context";
import { useState, useEffect, useContext } from "react";
import { logo, africanCrowd1, logo2 } from "../../assets";
import NumberOfChildren from "./children";
import ConfirmInfo from "./confirm";
import DateOfBirth from "./dob";
import PersonalInfo from "./info";
import ThankUi from "./thankui";

const RegisterPage = () => {
  const theme = useTheme();
 // console.log("User Context =>", useContext(UserContext));
  const index = useContext(UserContext).index;

  const views = [
    <DateOfBirth />,
    <PersonalInfo />,
    <NumberOfChildren />,
    <ConfirmInfo />,
    <ThankUi />,
  ];

  const logoDimensions = {
    xs: "50px",
    md: "150px",
  };

  const spinningLogo = (
    <Box
      sx={{
        height: logoDimensions,
        width: logoDimensions,
      }}
    >
      <img
        src={theme.palette.mode === "light" ? logo2 : logo}
        className="logo-spin"
        style={{
          height: "100%",
          width: "100%",
          minWidth: "50px",
          minHeight: "50px",
        }}
      />
    </Box>
  );

  const welcomeText = (
    <Typography
      variant="h5"
      align="center"
      color={theme.palette.mode === "light" ? "secondary" : "primary"}
      sx={{
        fontSize: {
          xs: "1.0em",
          sm: "1.2em",
          md: "1.5em",
          lg: "1.8em",
        },
        padding: 1,
        fontWeight: "bold",
      }}
    >
      Welcome to CHIELE CENSUS
    </Typography>
  );

  return (
    <Stack
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        backgroundColor:
          theme.palette.mode == "light"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.7)",
        backgroundImage: `url('${africanCrowd1}')`,
        backgroundSize: "cover",
        backgroundBlendMode:
          theme.palette.mode === "light" ? "lighten" : "multiply",
      }}
    >
      <Grid container direction="row" spacing={1} sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={4}
          lg={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Stack
            direction={{ xs: "row", md: "column" }}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", width: "100%" }}
          >
            {spinningLogo}
            {welcomeText}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Box
              sx={{
                width: "fit-content",
                backgroundColor:
                  theme.palette.mode == "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.5)",
                borderRadius: 5,
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {[0, 1, 2, 3, 4].map((pos) => (
                  <Box
                    sx={{
                      backgroundColor:
                        pos === index
                          ? theme.palette.mode === "light"
                            ? "#2F1F3E"
                            : "#2EA6C6"
                          : "#a2a2a2",
                      width: pos === index ? "55px" : "50px",
                      height: pos === index ? "10px" : "7px",
                      margin: "20px 10px",
                      borderRadius: "5px",
                    }}
                  ></Box>
                ))}
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                py={1}
                sx={{ display: { md: "none" } }}
              >
                {spinningLogo}
                {welcomeText}
              </Stack>
              {views[index]}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RegisterPage;