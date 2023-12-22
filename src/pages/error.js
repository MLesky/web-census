import { Button, Link, Stack, Typography, useTheme } from "@mui/material";
import { routeNames } from '../constants';

const ErrorPage = () => {
  const theme = useTheme().palette;
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ width: "100%", height: "80vh" }}
    >
      <Typography color={theme.mode === 'light' ? 'secondary' : 'primary'} variant="h4">Sorry! Page Doesn't Exist</Typography>
      <a href='\'>
          <Button variant="link">Go Back</Button></a>
    </Stack>
  );
};

export default ErrorPage;
