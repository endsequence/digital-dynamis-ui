import React, { useEffect, useState } from "react";
import axios from "../customAxios";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_HOST } from '../constants'
import { Grid } from "@mui/material";
import Copyright from "../components/Copyright";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import TitleBar from "../components/TitleBar";
import { getStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        let url = `${API_HOST}/login`;
        try {
            const result = await axios.post(url, {
                userName: data.get('email'), password: data.get('password')
            });
        } catch (e) {

        }

        setLoading(false);
    };

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
                <Container maxWidth="lg" sx={{ pt: 8 }}>
                    <Grid container spacing={4} sx={{ my: 2 }}>
                        <Grid md={6}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                    chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'Carbon foot print'
                                    },
                                    subtitle: {
                                        text: 'Source: Publicis Green'
                                    },
                                    xAxis: {
                                        categories: [
                                            'Jan',
                                            'Feb',
                                            'Mar',
                                            'Apr',
                                            'May',
                                            'Jun',
                                            'Jul',
                                            'Aug',
                                            'Sep',
                                            'Oct',
                                            'Nov',
                                            'Dec'
                                        ],
                                        crosshair: true
                                    },
                                    yAxis: {
                                        min: 0,
                                        title: {
                                            text: 'Rainfall (mm)'
                                        }
                                    },
                                    tooltip: {
                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                        footerFormat: '</table>',
                                        shared: true,
                                        useHTML: true
                                    },
                                    plotOptions: {
                                        column: {
                                            pointPadding: 0.2,
                                            borderWidth: 0
                                        }
                                    },
                                    series: [{
                                        name: 'Tokyo',
                                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                                            194.1, 95.6, 54.4]

                                    }]
                                }}
                            />
                        </Grid>
                        <Grid md={6}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false,
                                        type: 'pie'
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
                                        name: 'Brands',
                                        colorByPoint: true,
                                        data: [{
                                            name: 'Chrome',
                                            y: 70.67,
                                            sliced: true,
                                            selected: true
                                        }, {
                                            name: 'Edge',
                                            y: 14.77
                                        }, {
                                            name: 'Firefox',
                                            y: 4.86
                                        }, {
                                            name: 'Safari',
                                            y: 2.63
                                        }, {
                                            name: 'Internet Explorer',
                                            y: 1.53
                                        }, {
                                            name: 'Opera',
                                            y: 1.40
                                        }, {
                                            name: 'Sogou Explorer',
                                            y: 0.84
                                        }, {
                                            name: 'QQ',
                                            y: 0.51
                                        }, {
                                            name: 'Other',
                                            y: 2.6
                                        }]
                                    }]
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
    );
}