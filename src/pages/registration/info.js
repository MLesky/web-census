import { Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AutoCompleteInput } from "../../components";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../user/user_context";

const PersonalInfo = ({ showText = true }) => {
  const places = ["", "Nkwen", "Bafut", "Bali", "Babanki", "Kumbo"];
  const theme = useTheme();
  console.log("User Context =>", useContext(UserContext));
  const index = useContext(UserContext).index;
  const user = useContext(UserContext).user;
  const setUser = useContext(UserContext).updateUser;
  const setErrors = useContext(UserContext).updateErrors;
  const errors = useContext(UserContext).errors;
  const setIndex = useContext(UserContext).setIndex;

  const handleValidation = () => {
    let isOk = true;
    if (
      user.firstName === "" ||
      user.firstName == null ||
      user.firstName == undefined
    ) {
      setErrors({ firstName: "Please enter your first name" });
      isOk = false;
    } else {
      setErrors({ firstName: "" });
    }

    if (
      user.surname === "" ||
      user.surname == null ||
      user.surname == undefined
    ) {
      setErrors({ surname: "Please enter your surname" });
      isOk = false;
    } else {
      setErrors({ surname: "" });
    }

    if (user.gender === "" || user.gender == null || user.gender == undefined) {
      setErrors({ gender: "Please select your gender" });
      isOk = false;
    } else {
      setErrors({ gender: "" });
    }

    if (
      user.placeOfBirth === "" ||
      user.placeOfBirth == null ||
      user.placeOfBirth == undefined
    ) {
      setErrors({ placeOfBirth: "Please select your place of birth" });
      isOk = false;
    } else {
      setErrors({ placeOfBirth: "" });
    }

    if (
      user.town === "" ||
      user.town == null ||
      user.town == undefined
    ) {
      setErrors({ town: "please select your town or village" });
      isOk = false;
    } else {
      setErrors({ town: "" });
    }

    if (
      user.subDivision === "" ||
      user.subDivision == null ||
      user.subDivision == undefined
    ) {
      setErrors({ subDivision: "Please select your sub division" });
      isOk = false;
    } else {
      setErrors({ subDivision: "" });
    }

    console.log("user now", index, user);
    console.log("errors now", index, errors);

    if (isOk) {
      console.log("Ok");
      setIndex(index + 1);
    } else {
      console.log("Not Ok");
    }
  };

  return (
    <Stack sx={{ maxWidth: "600px", mx: 5 }} gap={2}>
      {showText && (
        <Typography
          sx={{
            width: "100%",
            minWidth: {
              xs: "250px",
              sm: "400px",
            },
            marginTop: "10px",
            color: theme.palette.text.primary,
          }}
        >
          Please fill in the fields.
        </Typography>
      )}
      <TextField
        label="First name"
        type="text"
        variant="standard"
        placeholder="Enter first name"
        value={user.firstName}
        helperText={errors.firstName}
        error={errors.firstName !== ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <TextField
        label="Second name (Optional)"
        type="text"
        variant="standard"
        placeholder="Enter second name"
        value={user.secondName}
        // helperText={errors.secondName}
        // error={errors.secondName !== ""}
        onChange={(e) => setUser({ ...user, secondName: e.target.value })}
      />
      <TextField
        label="Surname"
        type="text"
        variant="standard"
        placeholder="Enter surname"
        value={user.surname}
        helperText={errors.surname}
        error={errors.surname !== ""}
        onChange={(e) => setUser({ ...user, surname: e.target.value })}
      />
      <AutoCompleteInput
        label="Gender"
        type="text"
        placeholder="Select Gender"
        options={["Male", "Female", "Other", ""]}
        value={user.gender}
        onChange={(e, value) => setUser({ ...user, gender: value })}
        freeSolo={false}
        variant="standard"
        error={errors.gender !== ""}
        helperText={errors.gender}
      />

      <AutoCompleteInput
        label="Place of birth"
        type="text"
        placeholder="Enter Place of birth"
        options={places}
        value={user.placeOfBirth}
        onChange={(e, value) => setUser({ ...user, placeOfBirth: value })}
        freeSolo={true}
        variant="standard"
        error={errors.placeOfBirth !== ""}
        helperText={errors.placeOfBirth}
      />

      <AutoCompleteInput
        label="Sub division"
        type="text"
        placeholder="Enter Subdivision"
        options={places}
        value={user.subDivision}
        onChange={(e, value) => setUser({ ...user, subDivision: value })}
        freeSolo={true}
        variant="standard"
        error={errors.subDivision !== ""}
        helperText={errors.subDivision}
      />

      <AutoCompleteInput
        label="Town/Village"
        type="text"
        placeholder="Enter town or village"
        options={places}
        value={user.town}
        onChange={(e, value) => setUser({ ...user, town: value })}
        freeSolo={true}
        variant="standard"
        error={errors.town !== ""}
        helperText={errors.town}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Button
          variant="contained"
          color={theme.palette.mode === "light" ? "secondary" : "primary"}
          sx={{ marginY: "30px", color: "white" }}
          onClick={() => setIndex(index - 1)}
        >
          Back
        </Button>
        <Button
          onClick={handleValidation}
          variant="contained"
          color={theme.palette.mode === "light" ? "secondary" : "primary"}
          sx={{ marginY: "30px", color: "white" }}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalInfo;
