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

const theme = createTheme();
export default function Insights() {

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [holidays, setHolidays] = useState([]);

  const [options, setOptions] = useState([]);

  const [data, setData] = useState([
    [1678895946000, 10],
    [1679498354000, 29.9],
    [1679584754000, 71.5],
    [1679671154000, 106.4]
  ])

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const getHolidays = async () => {
    let url = 'https://date.nager.at/api/v2/publicholidays/2020/US';
    const result = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHolidays(result.data);
  };
  useEffect(() => {
    getHolidays();
  }, [])

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
                        data: data
                      },
                      // {
                      //   name: 'Idle Hours',
                      //   data: [
                      //     [1679498354000, 29.9],
                      //     [1679584754000, 71.5],
                      //     [1679671154000, 106.4]
                      //   ]
                      // }
                    ]
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    title: {
                      text: 'My chart'
                    },
                    series: [{
                      data: [1, 2, 3]
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
