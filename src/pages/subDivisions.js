import { Container, Stack, Grid, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const SubDivisions = () => {
  const regions = [
    "Adamawa",
    "Centre",
    "East",
    "Far North",
    "Littoral",
    "North",
    "North West",
    "South",
    "South West",
    "West",
  ];

  let rows = [];
  for (var i = 1; i <= regions.length; i++) {
    rows.push({
      id: i,
      region: regions[i - 1],
      division: randomInt(3, 8),
      subDivision: randomInt(10, 40),
      headCount: randomInt(600000, 1600000),
      incRate: randomFloat(-4, 7),
      aveAge: randomInt(31, 45),
      males: randomInt(300000, 900000),
      females: randomInt(300000, 900000),
      children: randomInt(200000, 800000),
      working: randomInt(400000, 1000000),
      elderly: randomInt(50000, 400000),
      oldest: randomInt(87, 106),
    });
  }

  let columns = [
    { field: "region", headerName: "Region" },
    { field: "division", headerName: "Divisions" },
    { field: "subDivision", headerName: "Sub Divisions" },
    { field: "headCount", headerName: "Population" },
    { field: "incRate", headerName: "Increase Rate" },
    { field: "aveAge", headerName: "AverageAge" },
    { field: "males", headerName: "Males" },
    { field: "females", headerName: "Females" },
    { field: "children", headerName: "Children" },
    { field: "working", headerName: "Working Class" },
    { field: "elderly", headerName: "Elderly" },
    { field: "oldest", headerName: "oldest" },
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
          <Grid item sm={12} lg={10}>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SubDivisions;

function randomInt(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

function randomFloat(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}
