import { Button, Stack, TextField, Typography } from "@mui/material";
import { AutoCompleteInput } from "../../components";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { UserContext } from "../../user/user_context";

const NumberOfChildren = ({showText = true,}) => {
  const theme = useTheme()
  const index = useContext(UserContext).index;
  const user = useContext(UserContext).user;
  const setUser = useContext(UserContext).updateUser;
  const setErrors = useContext(UserContext).updateErrors;
  const errors = useContext(UserContext).errors;
  const setIndex = useContext(UserContext).setIndex;

  return (
    <Stack sx={{ maxWidth: "600px", mx: 5 }} gap={3}>
      {showText && (
        <Typography
          sx={{
            width: "100%",
            marginTop: "10px",
            color: theme.palette.text.primary
          }}
        >
          Please fill in the fields.
        </Typography>
      )}
      <Stack gap={0.5}>
        <Typography sx={{ fontSize: "0.87em", color: theme.palette.text.primary }}>
          Number of children below 22 years
        </Typography>
        <Stack direction={{ xs: 'column', sm: "row" }} gap={2}>
          <TextField
            label="Males"
            type="number"
            variant="standard"
            value={user.malesBelow21}
            onChange={(e) => setUser({ ...user, malesBelow21: e.target.value })}
            min='0'
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesBelow21}
            onChange={(e) =>
              setUser({ ...user, femalesBelow21: e.target.value })
            }
            min='0'
          />
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        <Typography sx={{ fontSize: "0.87em", color: theme.palette.text.primary }}>
          Number of children from 22 years and above
        </Typography>
        <Stack direction={{ xs: 'column', sm: "row" }} gap={2}>
          <TextField
            label="Males"
            type="number"
            variant="standard"
            value={user.malesAbove21}
            min='0'
            onChange={(e) => setUser({ ...user, malesAbove21: e.target.value })}
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesAbove21}
            min='0'
            onChange={(e) =>
              setUser({ ...user, femalesAbove21: e.target.value })
            }
          />
        </Stack>
      </Stack>
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
          onClick={() => setIndex(index + 1)}
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

export default NumberOfChildren;
