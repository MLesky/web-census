import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import NumberOfChildren from "./children";
import DateOfBirth from "./dob";
import PersonalInfo from "./info";
import ThankUi from "./thankui";

const RegisterPage = () => {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({
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
    <DateOfBirth
      user={user}
      errors={errors}
      setUser={setUser}
    />,
    <PersonalInfo
      user={user}
      errors={errors}
      setUser={setUser}
    />,
    <NumberOfChildren
      user={user}
      setUser={setUser}
    />,
    <ThankUi />
  ];

  const validates = [
    () => {
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
          setIndex(index + 1);
        }
      }
      console.log("user now", index, user)
      console.log("errors now", index, errors)
    },
    () => {
      let tempErrors = errors;

      if(user.firstName === "" || user.firstName == null || user.firstName == undefined){
        tempErrors.firstName = "Please enter your first name";
      } else {
        tempErrors.firstName = "";
      }

      if(user.surname === '' || user.surname == null || user.surname == undefined){
        tempErrors.surname = "Please enter your surname"
      } else {
        tempErrors.surname = ""
      }

      if(user.gender === '' || user.gender == null || user.gender == undefined){
        tempErrors.gender = "Please select your gender"
      } else {
        tempErrors.gender = ''
      }

      if(user.placeOfBirth === '' || user.placeOfBirth == null || user.placeOfBirth == undefined){
        tempErrors.placeOfBirth = "Please select your place of birth"
      } else {
        tempErrors.placeOfBirth = ''
      }

      if(user.town === '' || user.subDivision == null || user.subDivision == undefined){
        tempErrors.town = "please select your town or village"
      } else {
        tempErrors.town = ""
      }

      if(user.subDivision === '' || user.subDivision == null || user.subDivision == undefined){
        tempErrors.subDivision = "Please select your sub division"
      } else {
        tempErrors.subDivision = ''
      }

      setErrors(tempErrors)
      console.log("user now", index, user)
      console.log("errors now", index, errors)

      if(errors.firstName === "" && errors.surname === "" && errors.gender === "" && errors.placeOfBirth === "" && errors.subDivision === "" && errors.town === ""){
        console.log('Ok')
        setIndex(index+1)
      } else {
        console.log('Not Ok')
      }
    },
    () => {
      console.log("user now", index, user);
      console.log("errors now", index, errors);

      // store data

      setIndex(index+1)
    }
  ];

  return (
    <Stack alignItems="center">
      <Stack direction="row" justifyContent="center">
        {[0, 1, 2, 3].map((pos) => (
          <Box
            sx={{
              backgroundColor: pos === index ? "#2EA6C6" : "#d2d2d2",
              width: "50px",
              height: "7px",
              margin: "20px 10px",
              borderRadius: "5px",
            }}
          ></Box>
        ))}
      </Stack>
      {views[index]}
      <Stack direction="row" justifyContent="space-around" sx={{
        width: '100%',
        maxWidth: '400px',
      }}>
        {index > 0 && index < 3 && (
          <Button
            variant="contained"
            sx={{ marginY: "30px", color: "white" }}
            onClick={() => setIndex(index - 1)}
          >
            Back
          </Button>
        )}
        {index < 3 && (<Button
          variant="contained"
          sx={{ marginY: "30px", color: "white" }}
          onClick={() => validates[index]()}
        >
          Continue
        </Button>)}
      </Stack>
    </Stack>
  );
};

export default RegisterPage;


// TODO: Fix validation for personal Info
// TODO: Dark theme for registration page