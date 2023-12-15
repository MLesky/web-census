import {
  Stack,
  Typography,
  Divider,
  Grid,
  Paper,
  styled,
  Table,
  TableCell,
  TableRow,
  Slider,
} from "@mui/material";
import {
  BarChart,
  LineChart,
  PieArcLabel,
  PieChart,
  useDrawingArea,
} from "@mui/x-charts";
import { useEffect, useState } from "react";

const MainDashboard = () => {
  const headCount = "20,399,493";
  const noRegions = 10;
  const noDivisions = 58;
  const noSubDivisions = 237;
  const avgAge = 29;
  const increaseRate = "5.4%";
  const genderPieChartData = [
    { id: 0, value: 10456980, label: "Female", color: "purple" },
    { id: 1, value: 9007729, label: "Male", color: "blue" },
    { id: 2, value: 512980, label: "Other", color: "green" },
  ];
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
    "East",
  ];

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
    padding: 1,
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
    <Stack sx={{ padding: 1 }} gap={2} alignItems="center">
      <Paper
        sx={{
          padding: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        elevation={5}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={2}
          sx={{ maxWidth: "900px", width: "100%" }}
        >
          <Stack alignItems="center">
            <Typography>Head Count</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {headCount}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Regions</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {noRegions}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Head Count</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {noDivisions}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Sub Divisions</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {noSubDivisions}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Average Age</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {avgAge}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography>Increase Rate</Typography>
            <Typography color="primary" variant="h6" sx={{ fontWeight: "700" }}>
              {increaseRate}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={5} sx={paperStyles}>
            <Typography>Gender Ratio</Typography>
            <PieChart
              series={[
                {
                  //   arcLabel: (item) => `(${item.value})`,
                  data: genderPieChartData,
                },
              ]}
              width={300}
              height={200}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={5}>
          <Paper elevation={5} sx={paperStyles}>
            <Typography>Head Counts by regions</Typography>
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
          </Paper>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Paper elevation={5} sx={paperStyles}>
            <Typography>Yearly Increase</Typography>
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
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={5}>
          <Paper elevation={5} sx={paperStyles}>
            <Typography>Head Counts by Age Group</Typography>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "-22",
                    "22-27",
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
                  data: [
                    1493, 1095, 1940, 930, 2093, 2990, 948, 1223, 674, 899,
                    1000, 647,
                  ],
                },
              ]}
              width={500}
              height={300}
              sx={{ padding: "19px", overflow: "visible" }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={7}>
          <Paper elevation={5} sx={paperStyles}>
            <Typography>Children</Typography>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item xs={12} md={6}>
                <Table>
                  <TableRow>
                    <TableCell>Count</TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        5,236,278 (32%)
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
                        2.3 per person
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item xs={12} md={6}>
                <PieChart
                  series={[
                    {
                      //   arcLabel: (item) => `(${item.value})`,
                      data: [
                        { id: 1, value: 12007729, color: "grey" },
                        {
                          id: 0,
                          value: 8456980,
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
                  <PieCenterLabel>42%</PieCenterLabel>
                </PieChart>
              </Grid>
              <Grid item xs={12} md={6}>
                <PieChart
                  series={[
                    {
                      //   arcLabel: (item) => `(${item.value})`,
                      data: [
                        {
                          id: 1,
                          value: 5007729,
                          label: "Above 21",
                          color: "orange",
                        },
                        {
                          id: 0,
                          value: 7007729,
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
              </Grid>
              <Grid item xs={12} md={6}>
                <PieChart
                  series={[
                    {
                      //   arcLabel: (item) => `(${item.value})`,
                      data: [
                        {
                          id: 1,
                          value: 6007729,
                          label: "Males",
                          color: "violet",
                        },
                        {
                          id: 0,
                          value: 6456980,
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MainDashboard;
