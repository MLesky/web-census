import { Button, Stack, TextField, Typography } from "@mui/material";
import { AutoCompleteInput } from "../../components";
import { useTheme } from "@mui/material/styles";

const NumberOfChildren = ({
  user,
  setUser,
  showText = true,
}) => {
  const theme = useTheme()
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
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesBelow21}
            onChange={(e) =>
              setUser({ ...user, femalesBelow21: e.target.value })
            }
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
            onChange={(e) => setUser({ ...user, malesAbove21: e.target.value })}
          />
          <TextField
            label="Females"
            type="number"
            variant="standard"
            value={user.femalesAbove21}
            onChange={(e) =>
              setUser({ ...user, femalesAbove21: e.target.value })
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NumberOfChildren;
