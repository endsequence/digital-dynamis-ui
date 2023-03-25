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
import Footer from "../components/Footer";
import axios from "axios";
import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";
// import FileUpload from "react-mui-fileuploader"
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function Tools() {
    let navigate = useNavigate();
    const [filesToUpload, setFilesToUpload] = useState([])
    const [fileName, setFilename] = useState();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    const [toastSeverity, setToastSeverity] = useState();
    const [date, setDate] = useState(new Date());

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setToastOpen(false);
    };

    const handleFileUpload = (e) => {
        console.log("in handleFileUpload");
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setFilename(name);
    };

    const updateToast = (severity, message) => {
        setToastSeverity(severity);
        setToastMessage(message);
        setToastOpen(true);
    };

    const handleSubmit = () => {
        console.log("in handleSubmit")
        setFilename();
        updateToast("success", "Congrats! Your request is submitted and you have won rewards :)");
        // navigate("/tools");
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TitleBar />
            <Snackbar
                open={toastOpen}
                autoHideDuration={4000}
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
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                >
                                    Print Scheduler
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: "100%",
                                            height: 400,
                                        },
                                    }}
                                >
                                    <Paper elevation={3}>
                                        <Grid container spacing={4} sx={{ my: 5 }}>
                                            <Grid item xs={12} sm={6} md={6} lg={6} textAlign="center">
                                                <Button
                                                    component="label"
                                                    variant="outlined"
                                                    startIcon={<UploadFileIcon />}
                                                    sx={{ marginRight: "1rem" }}
                                                >
                                                    Upload ZIP
                                                    <input type="file" accept=".zip" hidden onChange={handleFileUpload} />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6} textAlign="center">
                                                <Box>
                                                    <DateTimePicker
                                                        label="Choose Date/Time"
                                                        // inputFormat="MM/dd/yyyy"
                                                        value={date}
                                                        //   onChange={handleChange}
                                                        onChange={(value) => setDate(value)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={4} sx={{ my: 2 }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                                                {fileName && <Typography
                                                    // variant="h6"
                                                    component="div"
                                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                                >
                                                    File submitted: {fileName}
                                                </Typography>}
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={4} sx={{ my: 2 }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} textAlign="right">
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    sx={{ marginRight: "1rem" }}
                                                >
                                                    SUBMIT
                                                    <input type="submit" accept=".zip" hidden onClick={handleSubmit} />
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Paper>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                >
                                    Coming soon...
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: "100%",
                                            height: 400,
                                        },
                                    }}
                                >
                                    <Paper elevation={3}>
                                        <Grid container spacing={4} sx={{ my: 2 }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                                                <Typography
                                                    // variant="h6"
                                                    component="div"
                                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                                >
                                                    Check this space for upcoming awesome tools!!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </main>



        </ThemeProvider>
    )
}