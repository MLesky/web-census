import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../constants";
import { AuthContext } from "./context";
import { logo, logo2, africanCrowd1, africanCrowd2 } from "../assets";

const Login = ({}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const userSession = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminUsername = "cengroup7";
  const adminPassword = "1234567";

  const handleValidate = () => {
    if (username === "" || username === undefined || username === null) {
      setUsernameError("username is required");
    } else {
      setUsernameError("");
    }

    if (password === "" || password === undefined || password === null) {
      setPasswordError("password is required");
    } else {
      setPasswordError("");
    }

    if (usernameError === "" && passwordError === "") {
      // fetch users
      if (username === adminUsername) {
        setUsernameError("");
        if (password === adminPassword) {
          setPasswordError("");
          userSession.createNewSession(username, password);
          navigate(routeNames.dashboard);
        } else {
          setPasswordError("Wrong Password");
        }
      } else {
        setUsernameError("Admin not found");
      }
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: "100vw",
        paddingTop: 5,
        overflow: "auto",
        backgroundColor:
          theme.palette.mode == "light"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.7)",
        backgroundImage: `url('${africanCrowd2}')`,
        backgroundSize: "cover",
        backgroundBlendMode:
          theme.palette.mode === "light" ? "lighten" : "multiply",
      }}
    >
      <Stack
        sx={{
          width: { xs: "100%", sm: "400px", md: "600px" },
          backgroundColor:
            theme.palette.mode == "light"
              ? "rgba(255, 255, 255, 0.6)"
              : "rgba(0, 0, 0, 0.5)",
          mx: 5,
          padding: 5,
          borderRadius: 5,
          height: 'fit-content'
        }}
        gap={2}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          Login
        </Typography>
        <TextField
          label="Username"
          type="text"
          variant="standard"
          placeholder="Enter username"
          value={username}
          helperText={usernameError}
          error={usernameError !== ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          placeholder="Enter password"
          value={password}
          helperText={passwordError}
          error={passwordError !== ""}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleValidate}
          sx={{ color: "white" }}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
