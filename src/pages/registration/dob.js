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
    <Stack sx={{ maxWidth: "600px", mx: 5}} spacing={3}>
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
        label="ID Card number"
        type="text"
        variant="standard"
        placeholder="Enter ID Card number"
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
    </Stack>
  );
};

export default DateOfBirth;
