import { Button, Stack, TextField, Typography } from "@mui/material";
import { AutoCompleteInput } from "../../components";

const NumberOfChildren = ({
  index,
  user,
  errors,
  setIndex,
  setUser,
  setErrors,
}) => {
  return (
    <Stack sx={{ maxWidth: "600px" }} gap={3}>
      <Typography
        sx={{
          width: "100%",
          minWidth: "400px",
          marginTop: "10px",
        }}
      >
        Please fill in the fields.
      </Typography>
      <Stack gap={0.5}>
      <Typography sx={{ fontSize: "0.87em" }}>
        Number of children below 22 years
      </Typography>
        <Stack direction="row" gap={2}>
          <TextField
            label="Males"
            type="number"
            variant="standard"
            value={user.malesBelow21}
            onChange={(e) => setUser({ ...user, malesBelow21: e.target.value })}
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesBelow21}
            onChange={(e) => setUser({ ...user, femalesBelow21: e.target.value })}
          />
        </Stack>
      </Stack>
      <Stack gap={0.5}>
      <Typography sx={{ fontSize: "0.87em" }}>
        Number of children from 22 years and above
      </Typography>
        <Stack direction="row" gap={2}>
          <TextField
            label="Males"
            type="number"
            variant="standard"
            value={user.malesAbove21}
            onChange={(e) => setUser({ ...user, malesAbove21: e.target.value })}
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesAbove21}
            onChange={(e) => setUser({ ...user, femalesAbove21: e.target.value })}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NumberOfChildren;
