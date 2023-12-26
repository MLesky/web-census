import { useTheme } from "@mui/material/styles";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../user/user_context";

const DateOfBirth = ({showText = true }) => {
  const theme = useTheme();
//  console.log("User Context =>", useContext(UserContext));
  const index = useContext(UserContext).index;
  const user = useContext(UserContext).user;
  const setUser = useContext(UserContext).updateUser;
  const setErrors = useContext(UserContext).updateErrors;
  const errors = useContext(UserContext).errors;
  const setIndex = useContext(UserContext).setIndex;

  const handleValidation = () => {
    let ok = true;
    let pattern = /^(NW|SW|CN|LT|WT|NT|FN|AD|ES|ST)\d{10}$/i;
    if (user.id === "" || user.id === null) {
      setErrors({id: "Please enter ID Card Number" });
      ok = false;
    } else if(!pattern.test(user.id)) {
      setErrors({id: "Invalid ID"});
      ok = false;
    } else {
      setErrors({id: "" });
    }

    if (user.dateOfBirth === "") {
      setErrors({dateOfBirth: "Please enter date" });
      ok = false;
    } else {
      let date = new Date(user.dateOfBirth);
      let d1 = date.getFullYear();
      let d2 = new Date().getFullYear();
      if (d2 - d1 < 22) {
        setErrors({
          dateOfBirth: "You must be atleast 22 years to continue",
        });
        ok = false;
      } else {
        setErrors({dateOfBirth: "" });
      }
    }

    if (ok) {
      setIndex(index + 1);
      console.log("user now", index, user);
    console.log("errors now", index, errors);
    }

  }

  return (
    <Stack sx={{ maxWidth: "600px", mx: 5 }} spacing={3}>
      {showText && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            maxWidth: "400px",
            fontWeight: "bold",
            color: theme.palette.text.primary,
          }}
        >
          Please take a moment to provide us with your valuable information
        </Typography>
      )}
      {showText && (
        <Typography
          sx={{
            width: "100%",
            maxWidth: "400px",
            marginY: "20px",
            fontWeight: "bold",
            color: theme.palette.text.primary,
          }}
        >
          You must be alteast 22 years old to proceed.
        </Typography>
      )}
      <TextField
        label="ID Card number"
        type="text"
        variant="standard"
        placeholder="AA00-0000-0000"
        value={user.id}
        helperText={errors.id}
        error={errors.id !== ""}
        onChange={(e) => setUser({ ...user, id: e.target.value })}
      />
      <TextField
        label="Date of birth"
        type="date"
        variant="standard"
        placeholder="Enter date of birth"
        value={user.dateOfBirth}
        helperText={errors.dateOfBirth}
        error={errors.dateOfBirth !== ""}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
      />
      <Button
        variant="contained"
        color={theme.palette.mode === "light" ? "secondary" : "primary"}
        sx={{ marginY: "30px", color: "white" }}
        onClick={handleValidation}
      >
        Continue
      </Button>
    </Stack>
  );
};

export default DateOfBirth;
