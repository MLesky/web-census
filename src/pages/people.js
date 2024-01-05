import { Container, Stack, Skeleton, Grid, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { DataBaseContext } from "../respository/database_context";

const People = () => {
  const database = useContext(DataBaseContext)
  let isOk = !database.fetching && database.error === null;
  const users = database.data.users;

  const setUsers = () => {

      let tempRows = []

      for (var i = 0; i < users.length; i++) {
        tempRows.push({
          id: i + 1,
          card_no: users[i].id,
          sur_name: users[i].sur_name,
          first_name: users[i].first_name,
          second_name: users[i].second_name,
          gender: users[i].gender,
          date_of_birth: users[i].date_of_birth,
          age:
            new Date().getFullYear() -
            new Date(users[i].date_of_birth).getFullYear(),
          place_of_birth: users[i].place_of_birth,
          sub_division: users[i].sub_division,
          town: users[i].town_village,
          boys_blw_22: parseInt(users[i].boys_blw_22),
          girls_blw_22: parseInt(users[i].girls_blw_22),
          boys_abv_21: parseInt(users[i].boys_abv_21),
          girls_abv_21: parseInt(users[i].girls_abv_21),
          total_children:
            parseInt(users[i].girls_abv_21) +
            parseInt(users[i].boys_abv_21) +
            parseInt(users[i].boys_blw_22) +
            parseInt(users[i].girls_blw_22),
        });
      }

      return tempRows;
  }

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
            {!isOk && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {isOk && (
              <DataGrid
                rows={setUsers()}
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
