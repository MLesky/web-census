import { Container, Stack, Skeleton, Grid, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

const People = () => {
  const [citizens, setCitizens] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/web-census/api/index.php").then((response) => {
      setCitizens(response);
      console.log('user', response)
      let data = response.data;

      let tempRows = []

      for (var i = 0; i < data.length; i++) {
        tempRows.push({
          id: i + 1,
          card_no: data[i].id,
          sur_name: data[i].sur_name,
          first_name: data[i].first_name,
          second_name: data[i].second_name,
          gender: data[i].gender,
          date_of_birth: data[i].date_of_birth,
          age:
            new Date().getFullYear() -
            new Date(data[i].date_of_birth).getFullYear(),
          place_of_birth: data[i].place_of_birth,
          sub_division: data[i].sub_division,
          town: data[i].town_village,
          boys_blw_22: parseInt(data[i].boys_blw_22),
          girls_blw_22: parseInt(data[i].girls_blw_22),
          boys_abv_21: parseInt(data[i].boys_abv_21),
          girls_abv_21: parseInt(data[i].girls_abv_21),
          total_children:
            parseInt(data[i].girls_abv_21) +
            parseInt(data[i].boys_abv_21) +
            parseInt(data[i].boys_blw_22) +
            parseInt(data[i].girls_blw_22),
        });
      }

      setRows(tempRows);
    });
  }, []);

  let columns = [
    { field: "card_no", headerName: "Card No" },
    { field: "sur_name", headerName: "Surname" },
    { field: "first_name", headerName: "First Name" },
    { field: "second_name", headerName: "Second Name" },
    { field: "gender", headerName: "Gender" },
    { field: "date_of_birth", headerName: "Date of Birth" },
    { field: "age", headerName: "Age" },
    { field: "place_of_birth", headerName: "Place of Birth" },
    { field: "sub_division", headerName: "Sub Division" },
    { field: "town", headerName: "Town or Village" },
    { field: "boys_blw_22", headerName: "Male kids below 22" },
    { field: "girls_blw_22", headerName: "Female Kids below 22" },
    { field: "boys_abv_21", headerName: "Male kids above 21" },
    { field: "girls_abv_21", headerName: "Female Kids above 21" },
    { field: "total_children", headerName: "Total children" },
  ];
  return (
    <Container sx={{ padding: 1 }}>
      <Paper elevation={10} sx={{ padding: 1, overflow: "auto" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={12} lg={10} sx={{minHeight: '80vh'}}>
            {(citizens === null || rows.length <= 0) && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {citizens !== null && (
              <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                sx={{width: '100%'}}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default People;

function randomInt(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

function randomFloat(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}
