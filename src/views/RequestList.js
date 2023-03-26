import React, { useEffect, useState } from "react";
import axios from "../customAxios";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_HOST } from '../constants'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup, Typography } from "@mui/material";
import Copyright from "../components/Copyright";
import TitleBar from "../components/TitleBar";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function Row(props) {
    const { row, setOption, handleSubmit } = props;
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setOption(event.target.value);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {row.status.toLowerCase() === "pending" ?

                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.deviceName}
                </TableCell>
                <TableCell >{row.userName}</TableCell>
                <TableCell >{row.status}</TableCell>
                <TableCell >{row.reason}</TableCell>
                <TableCell >{row.type}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    {row.status.toLowerCase() === "pending" ?

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 20, pr: 3, pt: 2, pb: 2 }}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Choose Device Target</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        name="radio-buttons-group"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="REPAIR" control={<Radio />} label="REPAIR" />
                                        <FormControlLabel value="DONATE" control={<Radio />} label="DONATE" />
                                        <FormControlLabel value="RECYCLE" control={<Radio />} label="RECYCLE" />
                                        <FormControlLabel value="REFURBISH" control={<Radio />} label="REFURBISH" />
                                        <FormControlLabel value="REJECT" control={<Radio />} label="REJECT" />
                                    </RadioGroup>
                                    <Button variant="contained" onClick={() => handleSubmit(row)}>
                                        Update
                                    </Button>
                                </FormControl>
                            </Box>
                        </Collapse>
                        : ''}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function ListRequests() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedOption, setOption] = useState('');
    const [reqList, setList] = useState([]);
    const handleSubmit = async (row) => {
        console.log({ row, selectedOption })
        setLoading(true);
        event.preventDefault();
        let url = `${API_HOST}/processRequest`;
        await axios.post(url, {
            status: selectedOption,
            userId: row.userId,
            deviceId: row.deviceId,
            requestId: row._id
        });
        fetchRequests();
        setLoading(false);
    };
    console.log({ reqList })
    const fetchRequests = () => {
        let url = `${API_HOST}/requests`;
        axios.get(url).then(data => {
            setList(data.data)
        })
    }
    useEffect(() => {
        fetchRequests();
    }, [])

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
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 5,
                        pb: 5,
                    }}
                >
                    <Container maxWidth="lg" sx={{ pt: 1 }}>

                    <Grid container spacing={4} sx={{ my: 2 }}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography
                                color="primary"
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                            >
                                Requests List
                            </Typography>
                            <Typography
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                            >
                                The Return Request page shows all user return requests with relevant details. It enables administrators to manage return requests efficiently, including approving or rejecting requests, handling e-waste, donating and refurbishing.
                            </Typography>
                        </Grid>
                    </Grid>

                        <Grid container spacing={4} sx={{ my: 2 }}>
                            {/* <div style={{ height: '400px',maxHeight:'700px', width: '100%' }}> */}
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Device Name</TableCell>
                                            <TableCell >Employee Name</TableCell>
                                            <TableCell >Status</TableCell>
                                            <TableCell >Reason</TableCell>
                                            <TableCell >Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reqList.map((row) => (
                                            <Row key={row.name} row={row} setOption={setOption} handleSubmit={handleSubmit} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Container>
                </Box>
            </main>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
    );
}