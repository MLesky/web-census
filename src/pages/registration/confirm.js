import React from "react";
import axios from "axios";
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
import { useEffect } from "react";
import { AutoCompleteInput } from "../../components";
import { useTheme } from "@mui/material/styles";

const ConfirmInfo = ({ user }) => {
  const places = ["", "Nkwen", "Bafut", "Bali", "Babanki", "Kumbo"];
  const theme = useTheme();

  const handleButtonClick = (event) => {
    console.log('sending data');
    event.preventDefault();

    // Prepare data for the API call
    const data = {
      idNo: "NW94389738IUHY389",
      first_name: user.firstName,
      second_name: user.secondName,
      sur_name: user.surname,
      gender: user.gender,
      givenNames: `${user.firstName} ${user.secondName}`,
      date_of_birth: user.dateOfBirth,
      place_of_birth: user.placeOfBirth,
      sub_division: user.subDivision,
      town_village: user.town,
      childrenInfo: `${parseInt(user.malesBelow21) + parseInt(user.femalesBellow21)} below 22 and ${parseInt(user.malesAbove21) + parseInt(user.femalesAbove21)} above 21`,
    };

    axios.post('http://localhost/api/index.php', data).then(function(response){
        console.log(response.data);
        
    });
  };


    
  return (
    <Stack sx={{ maxWidth: "500px", mx: 5 }} spacing={2} alignItems='center'>
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
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Submit
      </Button>
        <Table size='small' sx={{maxWidth: '400px'}}>
          <TableBody>
            <TableRow>
              <TableCell>ID No</TableCell>
              <TableCell>"NW94389738IUHY389",</TableCell>
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
                <TableCell color='secondary' sx={{fontWeight: 'bold', fontStyle: 'italic'}}>Address</TableCell>
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
                {parseInt(user.malesBelow21) + parseInt(user.femalesBellow21)} below 22 and{" "}
                {parseInt(user.malesAbove21) + parseInt(user.femalesAbove21)} above 21{" "}
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
    </Stack>
  );
};


export default ConfirmInfo;