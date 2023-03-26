import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import TitleBar from "../components/TitleBar";
import DiscoverCard from "../components/DiscoverCard";
import Copyright from "../components/Copyright";
import axios from "axios";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Paper, Typography } from "@mui/material";
import { API_HOST } from "../constants";
import { getStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function Insights() {
  let navigate = useNavigate();

  const userId = getStorage("DD_id");
  const userName = getStorage("DD_username");

  const [idleHrsdata, setIdleHrsdata] = useState([]);
  const [cfValues, setCfValues] = useState([]);
  const [categories, setCategories] = useState([]);

  const getIdleHours = async () => {
    let url = `${API_HOST}/idleTime/${userId}`;
    const result = await axios.get(url);
    const idleHours = result?.data?.idleHours || [];
    setIdleHrsdata(idleHours);
  }

  const getCfData = async () => {
    let url = `${API_HOST}/insights`;
    const result = await axios.get(url);
    const cfData = result?.data?.cfData || [];
    let categories = [], cfValues = [];
    for (const i of cfData) {
      categories.push(i[0]);
      cfValues.push(i[1]);
    }
    const userIndex = categories.indexOf(userName);
    if (userIndex) {
      categories.unshift(categories.splice(userIndex, 1)[0]);
    }
    setCategories(categories);
    setCfValues(cfValues);
  }

  useEffect(() => {
    getIdleHours();
    getCfData();
  }, [])

  useEffect(() => {
    const userIsAdmin = getStorage("DD_isAdmin");
    if (userIsAdmin === 'true') {
      navigate('/admin')
    }
  }, [navigate])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 5,
            pb: 5,
          }}
        >
          <Container maxWidth="lg">


            <Grid container spacing={4} sx={{ my: 2 }}>
              <Grid item xs={12} sm={9} md={9} lg={9}>
                <Typography
                  color="primary"
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                >
                  Impact Insights
                </Typography>
                <Typography
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                >
                  Identifying and quantifying CO2 emissions helps to identify excessive energy usage or other inefficiencies. Lowering emissions typically goes hand in hand with increasing efficiency and cost-effectiveness in a company's processes.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Paper elevation={10}  sx={{padding: 2}}>
                  <Typography
                    color="primary"
                    variant="h8"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'left' } }}
                  >
                    Your Carbon Points: <br></br>1200 {' '}<span>&#9786;</span>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ my: 2 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    title: {
                      text: 'My Devices Usage (Idle Hours)',
                    },
                    subtitle: {
                      text: 'A chart depicting hours wasted by devices in idle state',
                      align: 'center'
                    },
                    xAxis: {
                      type: 'datetime'
                    },
                    yAxis: {
                      title: {
                        text: 'No of Idle Hours'
                      }
                    },
                    // plotOptions: {
                    //   series: {
                    //     label: {
                    //       connectorAllowed: false
                    //     },
                    //     pointStart: 1
                    //   }
                    // },
                    series: [
                      {
                        name: 'Date',
                        data: idleHrsdata
                      },
                    ]
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'column'
                    },
                    title: {
                      text: 'My Carboon footprint impact'
                    },
                    subtitle: {
                      text: 'A chart depicting the amount of carbon foorprint as comparaed to others in the organisation',
                      align: 'center'
                    },
                    xAxis: {
                      categories: categories
                    },
                    yAxis: {
                      title: {
                        text: 'Carbon Footprint Values'
                      }
                    },
                    series: [{
                      name: "User",
                      data: cfValues
                    }]
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
