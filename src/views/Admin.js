import React, { useEffect, useState } from "react";
import axios from "../customAxios";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_HOST } from '../constants'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Copyright from "../components/Copyright";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import TitleBar from "../components/TitleBar";
import { getStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
    let navigate = useNavigate();
    const [pieChartData, setPieData] = useState([]);
    const [currentStatus, setStatus] = useState('');
    const [inventoryData, setinventoryData] = useState([]);
    const handleSubmit = async (event) => {

    };

    const fetchPieChartData = () => {
        let url = `${API_HOST}/getPieChartData`;
        axios.get(url).then(data => {
            setPieData(data.data)
        })
    }

    const fetchInventoryData = status => {
        setStatus(status)
        let url = `${API_HOST}/inventory`;
        axios.post(url, { status }).then(data => {
            setinventoryData(data.data)
        })
    }
    useEffect(() => {
        fetchPieChartData();
        fetchInventoryData();
    }, [])

    console.log({ pieChartData, inventoryData })
    useEffect(() => {
        const userIsAdmin = getStorage("DD_isAdmin");
        if (userIsAdmin !== 'true') {
            navigate('/')
        }
    }, [navigate])

    return (
        <ThemeProvider theme={theme}>
            <TitleBar />
            <main>
                <Container maxWidth="lg" sx={{ mt: 8 }}>

                    <Grid container spacing={4} sx={{ my: 2 }}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography
                                color="primary"
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                            >
                                Admin Dashboard
                            </Typography>
                            <Typography
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                            >
                                Admin Device Inventory page provides real-time overview of devices in use with information such as type, model, location and current assignment, enabling effective device management.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} sx={{ my: 4 }}>
                        <Grid md={6}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false,
                                        type: 'pie',
                                    },
                                    title: {
                                        text: 'Devices Statuses',
                                        align: 'left'
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    accessibility: {
                                        point: {
                                            valueSuffix: '%'
                                        }
                                    },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            dataLabels: {
                                                enabled: true,
                                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                            }
                                        }
                                    },
                                    series: [{
                                        name: 'Share',
                                        colorByPoint: true,
                                        data: pieChartData,
                                        point: {
                                            events: {
                                                click: function (event) {
                                                    // alert(this.x + " " + this.y + this.name);
                                                    fetchInventoryData(this.name)

                                                }
                                            }
                                        }
                                        // events: {
                                        //     click: function (event) {
                                        //         console.log(this.category)
                                        //         alert(
                                        //             this.name + ' clicked\n' +
                                        //             'Alt: ' + event.altKey + '\n' +
                                        //             'Control: ' + event.ctrlKey + '\n' +
                                        //             'Meta: ' + event.metaKey + '\n' +
                                        //             'Shift: ' + event.shiftKey
                                        //         );
                                        //     }
                                        // }
                                    }]
                                }}
                            />
                        </Grid>
                        <Grid md={6} sx={{ pl: 2 }}>
                            {currentStatus ?
                                <Typography
                                    color="black"
                                    variant="h5"
                                    component="div"
                                    sx={{ display: {sm: 'block', textAlign: 'center',pb:2 } }}
                                >
                                    Devices in {currentStatus} status 
                                </Typography>
                                :'' }
                            <TableContainer component={Paper}>

                                <Table sx={{ minWidth: 375 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Image</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell >Owner Type</TableCell>
                                            <TableCell >Carbon footprint</TableCell>
                                            <TableCell >Acquired Date</TableCell>
                                            {/* <TableCell >Protein&nbsp;(g)</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {inventoryData.map((row) => (

                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell >
                                                    <img src={row.imgUrl} width="60" alt={row.name} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >{row.ownerType}</TableCell>

                                                <TableCell >{row.carbonFootprint}</TableCell>
                                                <TableCell >{row.acquiredDate.split('T')[0]}</TableCell>
                                                {/* <TableCell >{row.protein}</TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Copyright sx={{ mt: 12, mb: 4 }} />
        </ThemeProvider>
    );
}