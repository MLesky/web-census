import { useTheme } from "@mui/material/styles";
import { Button, Stack, TextField, Typography } from "@mui/material";

const DateOfBirth = ({
  user,
  errors,
  setUser,
  showText = true,
}) => {
  const theme = useTheme()
  return (
    <Stack sx={{ maxWidth: "600px", mx: 5}}>
      {showText && (
        <Typography
          variant="h6"
          align="center"
          color='primary'
          sx={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          Welcome to CHIELE CENSUS
        </Typography>
      )}
      {showText && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            maxWidth: "400px",
            fontWeight: "bold",
            color: theme.palette.text.primary
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
            fontWeight: 'bold',
            color: theme.palette.text.primary
          }}
        >
          You must be alteast 22 years old to proceed.
        </Typography>
      )}
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
    </Stack>
  );
};

export default DateOfBirth;
