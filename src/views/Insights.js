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
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Snackbar, Alert, Paper } from "@mui/material";
import { API_HOST } from "../constants";
import { getStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function Insights() {
  let navigate = useNavigate();

  const userId = getStorage("DD_id");
  const userName = getStorage("DD_username");

  const [loading, setLoading] = useState(false);
  const [idleHrsdata, setIdleHrsdata] = useState([]);
  const [cfValues, setCfValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setOption] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [toastSeverity, setToastSeverity] = useState();
  const [quizData, setQuizData] = useState({});

  const updateToast = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log({ quizData })
    let url = `${API_HOST}/verifyAnswer`;
    const result = await axios.post(url, {
      quesId: quizData.quesId,
      answer: selectedOption
    });
    console.log({ result })
    if (result.data?.isCorrect) {
      updateToast('success', "Correct Answer.Congrat's you won 10 reward points ")
    } else {
      updateToast('warning', `Wrong Answer.Correct Answer is ${result.data?.correctAnswer}`)
    }
    setSubmitted(true);
    setLoading(false);
  };

  const getQuiz = async () => {
    setLoading(true)
    setOption('')
    console.log("test")
    let url = `${API_HOST}/gptQuiz`;
    const result = await axios.post(url, {
      ques: 'only one quiz question for e-waste management with 4 options with correct answer'
    });
    const { question, options, quesId } = result.data;
    console.log({ result })
    setQuizData({ options, question, quesId })
    setSubmitted(false);
    setLoading(false)
  };

  useEffect(() => {
    getQuiz();
  }, [])

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
          <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={toastSeverity}
              lg={{ width: "100%" }}
            >
              {toastMessage}
            </Alert>
          </Snackbar>
          <Container maxWidth="lg">


            <Grid container spacing={4} sx={{ my: 2 }}>
              <Grid item xs={12} sm={8} md={8} lg={8}>
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
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Paper elevation={10} sx={{ padding: 5 }}>
                  <Typography
                    color="primary"
                    variant="h8"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'left' } }}
                  >
                    Your Carbon Points: 1200 {' '}<span>&#9786;</span>
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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  color="primary"
                  variant="h5"
                  // component="div"
                  sx={{ display: { sm: 'block', textAlign: 'center', pb: 0 } }}
                >
                Test your knowledge
                </Typography>
                <FormControl sx={{
                  bgcolor: "background.paper",
                  pt: 1,
                  pb: 5,
                  width: '80%'
                }}>
                  <Box sx={{ color: '#212B36', fontSize: "22px", fontWeight: "500" }}>{quizData.question}</Box>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2 }}
                    value={selectedOption}
                  >
                    {
                      quizData.options?.map((option) => {
                        return <FormControlLabel value={option?.charAt(0)} control={<Radio />} label={option} />
                      })
                    }
                  </RadioGroup>
                  {loading ? <LinearProgress sx={{ mb: 1 }} /> : ''}
                  <Button variant="contained" onClick={() => submitted ? getQuiz() : handleSubmit()}>
                    {submitted ? 'Next Question' : 'Submit'}
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
