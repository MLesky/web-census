import { Button, Stack, TextField, Typography } from "@mui/material";
import { thankuiImage } from "../../assets";
import { AutoCompleteInput } from "../../components";
import { useTheme } from "@mui/material/styles";

const ThankUi = ({}) => {
  const theme = useTheme()
  return (
    <Stack sx={{ maxWidth: "600px" }} gap={5} alignItems='center'>
      <Typography
        variant="h5"
        color={theme.palette.mode === 'dark' ? 'primary' : "secondary"}
        sx={{
          width: "100%",
          minWidth: "400px",
          marginTop: "10px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Thank You For Your Time!
      </Typography>
      <img src={thankuiImage} alt="thank you" style={{width: '250px'}}/>
    </Stack>
  );
};

export default ThankUi;
