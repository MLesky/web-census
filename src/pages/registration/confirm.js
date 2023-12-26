import React, { useContext } from "react";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../user/user_context";
import axios from "axios";

const ConfirmInfo = () => {
  const places = ["", "Nkwen", "Bafut", "Bali", "Babanki", "Kumbo"];
  const theme = useTheme();
  const index = useContext(UserContext).index;
  const user = useContext(UserContext).user;
  const setUser = useContext(UserContext).updateUser;
  const setErrors = useContext(UserContext).updateErrors;
  const errors = useContext(UserContext).errors;
  const setIndex = useContext(UserContext).setIndex;

  const handleSubmission = () => {
    // Prepare data for the API call
    const data = {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      surname: user.surname,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      placeOfBirth: user.placeOfBirth,
      subDivision: user.subDivision,
      townVillage: user.town,
      boysBlw_22: user.malesBelow21,
      girlsBlw_22: user.femalesBelow21,
      girlsAbv_21: user.femalesAbove21,
      boysAbv_21: user.malesAbove21,
    };

    console.log("data is: ", data);
    //the api call
    const response = axios
      .post("http://localhost/web-census/api/index.php", data)
      .then(function (response) {
        console.log("res is: ", response.data);
        setIndex(index + 1);
      });

    console.log("Response is: ", response);
  };

  return (
    <Stack sx={{ maxWidth: "500px", mx: 5 }} spacing={2} alignItems="center">
      <Typography
        sx={{
          width: "100%",
          minWidth: {
            xs: "250px",
            sm: "400px",
          },
          marginTop: "10px",
          color: theme.palette.text.primary,
        }}
      >
        Please make sure the information you entered in correct before
        proceeding
      </Typography>
      <Table size="small" sx={{ maxWidth: "400px" }}>
        <TableBody>
          <TableRow>
            <TableCell>ID No</TableCell>
            <TableCell>{user.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Surname</TableCell>
            <TableCell>{user.surname}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Given Names</TableCell>
            <TableCell>
              {user.firstName} {user.secondName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell>{user.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date of birth</TableCell>
            <TableCell>{user.dateOfBirth}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Place of birth</TableCell>
            <TableCell>{user.placeOfBirth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              color="secondary"
              sx={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              Address
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sub Division</TableCell>
            <TableCell>{user.subDivision}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Town/Village</TableCell>
            <TableCell>{user.town}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Children</TableCell>
            <TableCell>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Males</TableCell>
                    <TableCell>Females</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Below 22</TableCell>
                    <TableCell>{user.malesBelow21}</TableCell>
                    <TableCell>{user.femalesBelow21}</TableCell>
                    <TableCell>{parseInt(user.malesBelow21) + parseInt(user.femalesBelow21)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Above 21</TableCell>
                    <TableCell>{user.malesAbove21}</TableCell>
                    <TableCell>{user.femalesAbove21}</TableCell>
                    <TableCell>{parseInt(user.malesAbove21) + parseInt(user.femalesAbove21)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{parseInt(user.malesAbove21)  + parseInt(user.malesBelow21)}</TableCell>
                    <TableCell>{parseInt(user.femalesBelow21) + parseInt(user.femalesAbove21)}</TableCell>
                    <TableCell>{parseInt(user.malesBelow21) + parseInt(user.malesAbove21) + parseInt(user.femalesBelow21) + parseInt(user.femalesAbove21)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
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
          onClick={handleSubmission}
          variant="contained"
          color={theme.palette.mode === "light" ? "secondary" : "primary"}
          sx={{ marginY: "30px", color: "white" }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmInfo;
