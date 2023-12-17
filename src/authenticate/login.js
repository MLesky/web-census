import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../constants";
import { AuthContext } from "./context";

const Login = ({}) => {
  const navigate = useNavigate();
  const userSession = useContext(AuthContext)

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
          userSession.createNewSession(username, password)
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
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        paddingTop: 5,
      }}
    >
      <Stack sx={{ maxWidth: "600px" }} gap={2}>
        <Typography
          variant="h4"
          color="primary"
          sx={{
            width: "100%",
            minWidth: "400px",
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
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
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
    </Box>
  );
};

export default Login;
