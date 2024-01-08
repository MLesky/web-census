import {
  FemaleOutlined,
  MaleOutlined,
  ChildCare,
  PeopleOutlineSharp,
  Elderly,
  Hail,
} from "@mui/icons-material";
import {
  Grid,
  Paper,
  Skeleton,
  Stack,
  styled,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  TableContainer,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { blue, green, grey, pink, purple, yellow } from "@mui/material/colors";
import { BarChart, LineChart, PieChart, useDrawingArea } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataBaseContext } from "../respository/database_context";
import AlertPopper from "../components/alert_popper";

const MainDashboard = () => {
  const database = useContext(DataBaseContext);
  let isOk = !database.fetching && database.error === null;
  const [showError, setShowError] = useState(true)
  console.log("isOk", isOk, database);

  // Data about people
  const citizens = database.data.users;
  const totalHeadCount = (data) => data.length + underAgedChildrenCount(data);
  const ageGroupGraph = (data) => {
    let listOfVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < data.length; i++) {
      let thisYear = new Date().getFullYear();
      let birthYear = new Date(data[i].date_of_birth).getFullYear();
      let age = thisYear - birthYear;
      if (age <= 22) {
        listOfVals[0]++;
      } else if (age >= 23 && age <= 27) {
        listOfVals[1]++;
      } else if (age >= 28 && age <= 33) {
        listOfVals[2]++;
      } else if (age >= 34 && age <= 39) {
        listOfVals[3]++;
      } else if (age >= 40 && age <= 45) {
        listOfVals[4]++;
      } else if (age >= 46 && age <= 51) {
        listOfVals[5]++;
      } else if (age >= 52 && age <= 57) {
        listOfVals[6]++;
      } else if (age >= 58 && age <= 63) {
        listOfVals[7]++;
      } else if (age >= 64 && age <= 69) {
        listOfVals[8]++;
      } else if (age >= 70 && age <= 75) {
        listOfVals[9]++;
      } else if (age >= 76 && age <= 80) {
        listOfVals[10]++;
      } else {
        listOfVals[11]++;
      }
    }

    listOfVals[0] += underAgedChildrenCount(data);
    return listOfVals;
  };
  const calcAveAge = (data) => {
    let totalAge = 0;
    for (var i = 0; i < data.length; i++) {
      let age =
        new Date().getFullYear() -
        new Date(data[i].date_of_birth).getFullYear();
      totalAge += age;
    }
    return Math.floor(totalAge / data.length);
  };
  const populationWithChildren = (data) => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      let usersKids =
        parseInt(data[i].boys_abv_21) +
        parseInt(data[i].boys_blw_22) +
        parseInt(data[i].girls_blw_22) +
        parseInt(data[i].girls_abv_21);
      if (usersKids > 0) {
        total++;
      }
    }
    return total;
  };
  const totalChildrenCount = (data) =>
    underAgedChildrenCount(data) + adultAgedChildrenCount(data);
  const underAgedChildrenCount = (data) => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += parseInt(data[i].boys_blw_22) + parseInt(data[i].girls_blw_22);
    }
    return total;
  };
  const adultAgedChildrenCount = (data) => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += parseInt(data[i].boys_abv_21) + parseInt(data[i].girls_abv_21);
    }
    return total;
  };
  const maleChildrenCount = (data) => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += parseInt(data[i].boys_blw_22) + parseInt(data[i].boys_abv_21);
    }
    return total;
  };
  const femaleChildrenCount = (data) => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += parseInt(data[i].girls_abv_21) + parseInt(data[i].girls_blw_22);
    }
    return total;
  };
  const elderlyCount = (data) => {
    let elderlies = 0;
    for (var i = 0; i < data.length; i++) {
      let age =
        new Date().getFullYear() -
        new Date(data[i].date_of_birth).getFullYear();
      if(age >= 60){
        elderlies++;
      }
    }
    return elderlies;
  }

  // Data about the regions
  const regions = database.data.regions;
  const noRegions = () => regions.length;
  const regionData = () => {
    let data = [];
    regions.map((region) => {
      data.push({
        region: region.name,
        headCounts: database.filters.getUsersFromRegion(region.id).length,
      });
    });
    return data;
  };
  const tableOfRegions = (data) => {
    let values = [];

    regions.map((region) => {
      values.push({
        region: region.name,
        headCounts: database.filters.getUsersFromRegion(region.id).length,
        males: database.filters.getUsersFromRegion(region.id).filter((value) => value.gender === "Male").length,
        females: database.filters.getUsersFromRegion(region.id).filter((value) => value.gender === "Female").length,
        children: underAgedChildrenCount(database.filters.getUsersFromRegion(region.id)),
        elderly: elderlyCount(database.filters.getUsersFromRegion(region.id)),
        workingClass: database.filters.getUsersFromRegion(region.id).length - elderlyCount(database.filters.getUsersFromRegion(region.id)),
      });
    });
    return values;
  };

  const noDivisions = 58;
  const noSubDivisions = 237;
  const increaseRate = "5.4%";

  const ageBarChartData = {
    xAxis: [{ scaleType: "band", data: regions }],
    series: [
      {
        data: [
          890873, 1290873, 500873, 780873, 1590873, 1190873, 888873, 1189073,
          690873,
        ],
      },
    ],
  };

  const paperStyles = {
    padding: !isOk ? 0 : 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 16,
    fontWeight: "bold",
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }


  return (
    <Stack sx={{ padding: 1 }} gap={1} alignItems="center">
      <AlertPopper showAlert={database.error !== null && showError} handleClose={() => setShowError(false)} alertType='error'><Typography>{database.error !== null ? database.error.message : ''}</Typography></AlertPopper>
      <Paper
        sx={{
          padding: !isOk ? 0 : 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        elevation={!isOk ? 0 : 5}
      >
        {!isOk && <Skeleton variant="rounded" width="100%" height={60} />}
        {isOk && (
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={2}
            sx={{ maxWidth: "900px", width: "100%" }}
          >
            <Stack alignItems="center">
              <Typography>Head Count</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {totalHeadCount(citizens)}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Adults</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {citizens.length}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Regions</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {noRegions()}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Divisions</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {noDivisions}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Sub Divisions</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {noSubDivisions}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Average Age</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {calcAveAge(citizens)}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Increase Rate</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {increaseRate}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Paper>
      <Grid
        container
        direction="row"
        spacing={1}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {!isOk && <Skeleton variant="rounded" width="100%" height="100%" />}
            {isOk && <Typography>Gender Ratio</Typography>}
            {isOk && (
              <PieChart
                title="Gender Ratio"
                series={[
                  {
                    //   arcLabel: (item) => `(${item.value})`,
                    data: [
                      {
                        id: 0,
                        value: citizens.filter(
                          (value) => value.gender == "Female"
                        ).length,
                        label: "Female",
                        color: "purple",
                      },
                      {
                        id: 1,
                        value: citizens.filter(
                          (value) => value.gender == "Male"
                        ).length,
                        label: "Male",
                        color: "blue",
                      },
                      {
                        id: 2,
                        value: citizens.filter(
                          (value) => value.gender == "Other"
                        ).length,
                        label: "Other",
                        color: "green",
                      },
                    ],
                  },
                ]}
                width={300}
                height={200}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={5}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {!isOk && <Skeleton variant="rounded" width="100%" height={300} />}
            {isOk && <Typography>Head Counts by regions</Typography>}
            {isOk && (
              <BarChart
                //   xAxis={regionBarChartData.xAxis}
                //   series={regionBarChartData.series}
                dataset={regionData()}
                yAxis={[{ scaleType: "band", dataKey: "region" }]}
                series={[{ dataKey: "headCounts", label: "Head counts" }]}
                layout="horizontal"
                width={500}
                height={300}
                sx={{ padding: "19px", overflow: "visible" }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {!isOk && <Skeleton variant="rounded" width="100%" height="100%" />}
            {isOk && (
              <TableContainer>
                <Table
                  size="small"
                  padding="none"
                  sx={{ overflow: "auto" }}
                  className="home-table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Region</TableCell>
                      <TableCell>
                        <PeopleOutlineSharp />
                      </TableCell>
                      <TableCell>
                        <MaleOutlined />
                      </TableCell>
                      <TableCell>
                        <FemaleOutlined />
                      </TableCell>
                      <TableCell>
                        <ChildCare />
                      </TableCell>
                      <TableCell>
                        <Hail />
                      </TableCell>
                      <TableCell>
                        <Elderly />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableOfRegions(citizens).map((region) => {
                      console.log('regions =>', tableOfRegions(citizens))
                      return (
                        <TableRow>
                          <TableCell>{region.region}</TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: green[
                                  getDivisionResult(
                                    region.headCounts,
                                    700,
                                    3000
                                  )
                                ],
                            }}
                          >
                            {region.headCounts}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                blue[getDivisionResult(region.males, 300, 1500)],
                            }}
                          >
                            {region.males}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                pink[
                                  getDivisionResult(region.females, 300, 1500)
                                ],
                            }}
                          >
                            {region.females}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                yellow[
                                  getDivisionResult(region.children, 2500, 4000)
                                ],
                            }}
                          >
                            {region.children}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: purple[getDivisionResult(region.adults, 400, 2000)],
                            }}
                          >
                            {region.adults}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor:
                                grey[getDivisionResult(region.elderly, 300, 600)],
                            }}
                          >
                            {region.elderly}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {!isOk && <Skeleton variant="rounded" width="100%" height="100%" />}
            {isOk && <Typography>Yearly Increase</Typography>}
            {isOk && (
              <LineChart
                xAxis={[
                  { data: ["2018", "2019", "2020", "2021", "2022", "2023"] },
                ]}
                series={[
                  {
                    data: [
                      9684903, 9984903, 9784903, 10984903, 10684903, 11084903,
                    ],
                  },
                ]}
                width={400}
                height={200}
                sx={{ padding: "19px", overflow: "visible" }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={4}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {!isOk && <Skeleton variant="rounded" width="100%" height="100%" />}
            {isOk && <Typography>Head Counts by Age Group</Typography>}
            {isOk && (
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    categoryGapRatio: 0.2,
                    data: [
                      "-22",
                      "23-27",
                      "28-33",
                      "34-39",
                      "40-45",
                      "46-51",
                      "52-57",
                      "58-63",
                      "64-69",
                      "70-75",
                      "76-80",
                      "81+",
                    ],
                  },
                ]}
                series={[
                  {
                    data: ageGroupGraph(citizens),
                  },
                ]}
                width={450}
                height={300}
                sx={{ padding: "19px", overflow: "visible" }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5} lg={4} sx={{ maxHeight: "400px" }}>
          <Paper elevation={!isOk ? 0 : 5} sx={paperStyles}>
            {isOk && <Typography>Children</Typography>}
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ overflowY: "auto" }}
            >
              <Grid item xs={12}>
                {!isOk && (
                  <Skeleton variant="rectangular" width="100%" height={200} />
                )}
                {isOk && (
                  <Table size="small">
                    <TableRow>
                      <TableCell>Count</TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {`${totalChildrenCount(citizens)} (${Math.floor(
                            (totalChildrenCount(citizens) /
                              totalHeadCount(citizens)) *
                              100
                          )}%)`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Increase</TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          7.6%
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average</TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {underAgedChildrenCount(citizens) / citizens.length}{" "}
                          per person
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Table>
                )}
              </Grid>
              <Grid item xs={12}>
                {!isOk && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {isOk && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          {
                            id: 1,
                            value:
                              citizens.length -
                              populationWithChildren(citizens),
                            color: "grey",
                          },
                          {
                            id: 0,
                            value: populationWithChildren(citizens),
                            label: "Population with\nchildren",
                            color: "orange",
                          },
                        ],
                        innerRadius: 20,
                      },
                    ]}
                    width={320}
                    height={100}
                  >
                    <PieCenterLabel>
                      {Math.floor(
                        (populationWithChildren(citizens) / citizens.length) *
                          100
                      )}
                      %
                    </PieCenterLabel>
                  </PieChart>
                )}
              </Grid>
              <Grid item xs={12}>
                {!isOk && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {isOk && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          {
                            id: 1,
                            value: adultAgedChildrenCount(citizens),
                            label: "Above 21",
                            color: "orange",
                          },
                          {
                            id: 0,
                            value: underAgedChildrenCount(citizens),
                            label: "Below 22",
                            color: "purple",
                          },
                        ],
                        innerRadius: 20,
                      },
                    ]}
                    width={320}
                    height={100}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {!isOk && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {isOk && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          {
                            id: 1,
                            value: maleChildrenCount(citizens),
                            label: "Males",
                            color: "violet",
                          },
                          {
                            id: 0,
                            value: femaleChildrenCount(citizens),
                            label: "Females",
                            color: "indigo",
                          },
                        ],
                        innerRadius: 20,
                      },
                    ]}
                    width={320}
                    height={100}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MainDashboard;

function getDivisionResult(number, smallest, largest) {
  if (number > largest) return 900;
  if (number <= smallest) return 50;

  let divisionRange = largest - smallest;
  return Math.floor((number - smallest) / (divisionRange / 8) + 1) * 100;
}

//590837
