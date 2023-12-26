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
import { useState, useEffect } from "react";
import { logo, africanCrowd1, logo2 } from "../../assets";
import NumberOfChildren from "./children";
import ConfirmInfo from "./confirm";
import DateOfBirth from "./dob";
import PersonalInfo from "./info";
import ThankUi from "./thankui";

const RegisterPage = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({
    id: "",
    dateOfBirth: "",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
    malesAbove21: 0,
    femalesAbove21: 0,
    malesBelow21: 0,
    femalesBelow21: 0,
  });

  const [errors, setErrors] = useState({
    id: "",
    dateOfBirth: "",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
  });

  const views = [
    <DateOfBirth user={user} errors={errors} setUser={setUser} />,
    <PersonalInfo user={user} errors={errors} setUser={setUser} />,
    <NumberOfChildren user={user} setUser={setUser} />,
    <ConfirmInfo user={user} />,
    <ThankUi />,
  ];

  const validates = [
    () => {
      if(user.id === '' || user.id === null){
        setErrors({...errors, id: 'Please enter ID Card Number'});
      } else {
        setErrors({...errors, id: ""})
      }

      if (user.dateOfBirth === "") {
        setErrors({ ...errors, dateOfBirth: "Please enter date" });
      } else {
        let date = new Date(user.dateOfBirth);
        let d1 = date.getFullYear();
        let d2 = new Date().getFullYear();
        if (d2 - d1 < 22) {
          setErrors({
            ...errors,
            dateOfBirth: "You must be atleast 22 years to continue",
          });
        } else {
          setErrors({ ...errors, dateOfBirth: "" });
        }
      }

      if(errors.id !== '' && errors.dateOfBirth !== ''){
        setIndex(index + 1);
      }
      console.log("user now", index, user);
      console.log("errors now", index, errors);
    },
    () => {
      let tempErrors = errors;

      if (
        user.firstName === "" ||
        user.firstName == null ||
        user.firstName == undefined
      ) {
        tempErrors.firstName = "Please enter your first name";
      } else {
        tempErrors.firstName = "";
      }

      if (
        user.surname === "" ||
        user.surname == null ||
        user.surname == undefined
      ) {
        tempErrors.surname = "Please enter your surname";
      } else {
        tempErrors.surname = "";
      }

      if (
        user.gender === "" ||
        user.gender == null ||
        user.gender == undefined
      ) {
        tempErrors.gender = "Please select your gender";
      } else {
        tempErrors.gender = "";
      }

      if (
        user.placeOfBirth === "" ||
        user.placeOfBirth == null ||
        user.placeOfBirth == undefined
      ) {
        tempErrors.placeOfBirth = "Please select your place of birth";
      } else {
        tempErrors.placeOfBirth = "";
      }

      if (
        user.town === "" ||
        user.subDivision == null ||
        user.subDivision == undefined
      ) {
        tempErrors.town = "please select your town or village";
      } else {
        tempErrors.town = "";
      }

      if (
        user.subDivision === "" ||
        user.subDivision == null ||
        user.subDivision == undefined
      ) {
        tempErrors.subDivision = "Please select your sub division";
      } else {
        tempErrors.subDivision = "";
      }

      setErrors(tempErrors);
      console.log("user now", index, user);
      console.log("errors now", index, errors);

      if (
        errors.firstName === "" &&
        errors.surname === "" &&
        errors.gender === "" &&
        errors.placeOfBirth === "" &&
        errors.subDivision === "" &&
        errors.town === ""
      ) {
        console.log("Ok");
        setIndex(index + 1);
      } else {
        console.log("Not Ok");
      }
    },
    () => {
      console.log("user now", index, user);
      console.log("errors now", index, errors);

      // store data
      setIndex(index + 1);
    },
    () => {
      setIndex(index + 1);
    },
  ];

  const handleButtonClick = (event) => {
    console.log('sending data');
    event.preventDefault();

    // Prepare data for the API call
    const data = {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      surname: user.surname,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      placeOfBirth: user.placeOfBirth,
      subDivision: user.subDivision,
      townVillage: user.town,
      boysBlw_22: 1,
      girlsBlw_22: 0,
      girlsAbv_21: 1,
      boysAbv_21: 2
    };
    
    console.log('data is: ',  data);
    //the api call
    const response = axios.post('http://localhost/web-census/api/index.php', data).then(function(response){
        console.log("res is: ", response.data);
        setIndex(index + 1);
    });

    console.log('Response is: ', response)
  };

  const logoDimensions = {
    xs: "50px",
    md: "150px",
  };

  const spinningLogo = <Box
    sx={{
      height: logoDimensions,
      width: logoDimensions,
    }}
  >
    <img
      src={theme.palette.mode === 'light' ? logo2 : logo}
      className='logo-spin'
      style={{
        height: "100%",
        width: "100%",
        minWidth: "50px",
        minHeight: "50px",
      }} />
  </Box>;
  const welcomeText = <Typography
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
  </Typography>;

  return (
    <Stack
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: 'auto',
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
        <Grid item xs={12} md={4} lg={6} sx={{display: {xs: 'none', md: 'block'}}}>
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
              <Stack direction="row" justifyContent="center" alignItems='center'>
                {[0, 1, 2, 3, 4].map((pos) => (
                  <Box
                    sx={{
                      backgroundColor: pos === index ? (theme.palette.mode === 'light'? '#2F1F3E' : "#2EA6C6") : "#a2a2a2",
                      width: pos === index ? '55px' : "50px",
                      height: pos === index ? '10px' : "7px",
                      margin: "20px 10px",
                      borderRadius: "5px"
                    }}
                  ></Box>
                ))}
              </Stack>
              <Stack direction='row' justifyContent='center' alignItems='center' py={1} sx={{display: {md: 'none'}}}>
                {spinningLogo}
                {welcomeText}
              </Stack>
              {views[index]}
              <Stack
                direction="row"
                justifyContent="space-around"
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                {index > 0 && index < 4 && (
                  <Button
                    variant="contained"
                    color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                    sx={{ marginY: "30px", color: "white" }}
                    onClick={() => setIndex(index - 1)}
                  >
                    Back
                  </Button>
                )}
                {index < 3 && (
                  <Button
                    variant="contained"
                    color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                    sx={{ marginY: "30px", color: "white" }}
                    onClick={() => validates[index]()}
                  >
                    Continue
                  </Button>
                )}
{index === 3 && (
                  <Button
                    onClick={handleButtonClick}
                    variant="contained"
                    color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                    sx={{ marginY: "30px", color: "white" }}
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RegisterPage;

// TODO: Fix validation for personal Info
