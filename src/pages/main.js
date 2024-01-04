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

const MainDashboard = () => {
  const data = useContext(DataBaseContext)
  console.log('data aih', data)
  const citizens = data.data.users;
  const regions = data.data.regions;

  // Data about people
  const adultHeadCount = () => citizens.length;
  const totalHeadCount = () => adultHeadCount() + totalChildrenCount();
  const ageGroupGraph = () => {
    let listOfVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < adultHeadCount(); i++) {
      let thisYear = new Date().getFullYear();
      let birthYear = new Date(citizens[i].date_of_birth).getFullYear();
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

    listOfVals[0] += underAgedChildrenCount();
    return listOfVals;
  };
  const populationWithChildren = () => {
    let total = 0;
    for (var i = 0; i < adultHeadCount(); i++){
      let usersKids = parseInt(citizens[i].boys_abv_21) + parseInt(citizens[i].boys_blw_22) + parseInt(citizens[i].girls_blw_22) + parseInt(citizens[i].girls_abv_21);
      if(usersKids > 0){
        total++;
      }
    }
    return total;
  }
  const totalChildrenCount = () => underAgedChildrenCount() + adultAgedChildrenCount()
  const underAgedChildrenCount = () => {
    let total = 0;
    for(var i = 0; i < adultHeadCount(); i++){
      total += parseInt(citizens[i].boys_blw_22) + parseInt(citizens[i].girls_blw_22);
    }
    return total;
  }
  const adultAgedChildrenCount = () => {
    let total = 0;
    for(var i = 0; i < adultHeadCount(); i++){
      total += parseInt(citizens[i].boys_abv_21) + parseInt(citizens[i].girls_abv_21);
    }
    return total;
  }
  const maleChildrenCount = () => {
    let total = 0;
    for(var i = 0; i < adultHeadCount(); i++){
      total += parseInt(citizens[i].boys_blw_22) + parseInt(citizens[i].boys_abv_21);
    }
    return total;
  }
  const femaleChildrenCount = () => {
    let total = 0;
    for(var i = 0; i < adultHeadCount(); i++){
      total += parseInt(citizens[i].girls_abv_21) + parseInt(citizens[i].girls_blw_22);
    }
    return total;
  }


  const noRegions = 10;
  const noDivisions = 58;
  const noSubDivisions = 237;
  const increaseRate = "5.4%";

  const regionData = [
    { region: "Adamawa", headCounts: 990837 },
    { region: "Centre", headCounts: 1390837 },
    { region: "East", headCounts: 670837 },
    { region: "Far North", headCounts: 790837 },
    { region: "Littoral", headCounts: 1590837 },
    { region: "North", headCounts: 700837 },
    { region: "North West", headCounts: 1190837 },
    { region: "South", headCounts: 800837 },
    { region: "South West", headCounts: 1090837 },
    { region: "East", headCounts: 590837 },
  ];
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
    padding: citizens === null ? 0 : 1,
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

  const calcAveAge = () => {
    let totalAge = 0;
    for (var i = 0; i < adultHeadCount(); i++) {
      let age =
        new Date().getFullYear() - new Date(citizens[i].date_of_birth).getFullYear();
      totalAge += age;
    }
    return Math.floor(totalAge / adultHeadCount());
  };

  const tableOfRegions = [
    {
      region: "Adamawa",
      headCounts: 990837,
      abbr: "AD",
      males: 408089,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "Centre",
      headCounts: 1390837,
      abbr: "CN",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "East",
      headCounts: 670837,
      abbr: "ES",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "Far North",
      headCounts: 790837,
      abbr: "FN",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "Littoral",
      headCounts: 1590837,
      abbr: "LT",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "North",
      headCounts: 700837,
      abbr: "NT",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "North West",
      headCounts: 1190837,
      abbr: "NW",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "South",
      headCounts: 800837,
      abbr: "ST",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "South West",
      headCounts: 1090837,
      abbr: "SW",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
    {
      region: "West",
      headCounts: 590837,
      abbr: "WT",
      males: 400000,
      children: 384834,
      elderly: 10920,
      workingClass: 129938,
    },
  ];

  return (
    <Stack sx={{ padding: 1 }} gap={1} alignItems="center">
      <Paper
        sx={{
          padding: citizens === null ? 0 : 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        elevation={citizens === null ? 0 : 5}
      >
        {citizens === null && <Skeleton variant="rounded" width="100%" height={60} />}
        {citizens !== null && (
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
                {totalHeadCount()}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography>Regions</Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{ fontWeight: "700" }}
              >
                {noRegions}
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
                {calcAveAge()}
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
          <Paper elevation={citizens === null ? 0 : 5} sx={paperStyles}>
            {citizens === null && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {citizens !== null && <Typography>Gender Ratio</Typography>}
            {citizens !== null && (
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
          <Paper elevation={citizens === null ? 0 : 5} sx={paperStyles}>
            {citizens === null && (
              <Skeleton variant="rounded" width="100%" height={300} />
            )}
            {citizens !== null && <Typography>Head Counts by regions</Typography>}
            {citizens !== null && (
              <BarChart
                //   xAxis={regionBarChartData.xAxis}
                //   series={regionBarChartData.series}
                dataset={regionData}
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
          <Paper elevation={citizens === null ? 0 : 5} sx={paperStyles}>
            {citizens === null && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {citizens !== null && (
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
                    {tableOfRegions.map((region) => {
                      let males = Math.floor(
                        (Math.random() * 0.7 + 0.2) * region.headCounts
                      );
                      let females = region.headCounts - males;
                      let children = Math.floor(
                        (Math.random() * 0.4 + 0.15) * region.headCounts
                      );
                      let adults = Math.floor(
                        (Math.random() * 0.6 + 0.25) * region.headCounts
                      );
                      let elderly = Math.floor(Math.random() * 100000 + 2000);
                        getDivisionResult(region.headCounts, 700000, 1500000)

                      return (
                        <TableRow>
                          <TableCell>{region.region}</TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                green[
                                  getDivisionResult(
                                    region.headCounts,
                                    700000,
                                    1500000
                                  )
                                ],
                                0.5
                              ),
                            }}
                          >
                            {region.headCounts}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                blue[getDivisionResult(males, 300000, 750000)],
                                0.5
                              ),
                            }}
                          >
                            {males}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                pink[
                                  getDivisionResult(females, 300000, 750000)
                                ],
                                0.5
                              ),
                            }}
                          >
                            {females}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                yellow[
                                  getDivisionResult(children, 250000, 400000)
                                ],
                                0.5
                              ),
                            }}
                          >
                            {children}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                purple[
                                  getDivisionResult(adults, 400000, 700000)
                                ],
                                0.5
                              ),
                            }}
                          >
                            {adults}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: alpha(
                                grey[getDivisionResult(elderly, 30000, 60000)],
                                0.5
                              ),
                            }}
                          >
                            {elderly}
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
          <Paper elevation={citizens !== null ? 0 : 5} sx={paperStyles}>
            {citizens === null && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {citizens !== null && <Typography>Yearly Increase</Typography>}
            {citizens !== null && (
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
          <Paper elevation={citizens === null ? 0 : 5} sx={paperStyles}>
            {citizens === null && (
              <Skeleton variant="rounded" width="100%" height="100%" />
            )}
            {citizens !== null && <Typography>Head Counts by Age Group</Typography>}
            {citizens !== null && (
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
                    data: ageGroupGraph(),
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
          <Paper elevation={citizens === null ? 0 : 5} sx={paperStyles}>
            {citizens !== null && <Typography>Children</Typography>}
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ overflowY: "auto" }}
            >
              <Grid item xs={12}>
                {citizens === null && (
                  <Skeleton variant="rectangular" width="100%" height={200} />
                )}
                {citizens !== null && (
                  <Table size="small">
                    <TableRow>
                      <TableCell>Count</TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {`${totalChildrenCount()} (${Math.floor((totalChildrenCount()/totalHeadCount()) * 100)}%)`}
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
                          {underAgedChildrenCount()/adultHeadCount()} per person
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Table>
                )}
              </Grid>
              <Grid item xs={12}>
                {citizens === null && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {citizens !== null && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          { id: 1, value: adultHeadCount() - populationWithChildren(), color: "grey" },
                          {
                            id: 0,
                            value: populationWithChildren(),
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
                    <PieCenterLabel>{Math.floor((populationWithChildren()/adultHeadCount()) * 100)}%</PieCenterLabel>
                  </PieChart>
                )}
              </Grid>
              <Grid item xs={12}>
                {citizens === null && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {citizens !== null && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          {
                            id: 1,
                            value: adultAgedChildrenCount(),
                            label: "Above 21",
                            color: "orange",
                          },
                          {
                            id: 0,
                            value: underAgedChildrenCount(),
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
                {citizens === null && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {citizens !== null && (
                  <PieChart
                    series={[
                      {
                        //   arcLabel: (item) => `(${item.value})`,
                        data: [
                          {
                            id: 1,
                            value: maleChildrenCount(),
                            label: "Males",
                            color: "violet",
                          },
                          {
                            id: 0,
                            value: femaleChildrenCount(),
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
}


export default MainDashboard;

function getDivisionResult(number, smallest, largest) {
  if (number > largest) return 900;
  if (number <= smallest) return 50;

  let divisionRange = largest - smallest;
  return Math.floor((number - smallest) / (divisionRange / 8) + 1) * 100;
}

//590837
