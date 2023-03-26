import React, { useEffect, useState } from "react";
import axios from "../customAxios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_HOST } from '../constants'
import { Alert, FormControl, FormLabel, LinearProgress, Radio, RadioGroup, Snackbar } from "@mui/material";
import Copyright from "../components/Copyright";
import { setStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";


const theme = createTheme();

export default function SignIn() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
        if (result.data?.isCorrect) {
            updateToast('success', "Correct Answer.Congrat's you won 10 reward points ")
        } else {
            updateToast('warning', `Wrong Answer.Correct Answer is ${result.data?.correctAnswer}`)
        }
        setSubmitted(true);
        setLoading(false);
        setOption('')
    };

    const getQuiz = async () => {
        setLoading(true)
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

    return (
        <ThemeProvider theme={theme}>
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
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <TitleBar />
                <FormControl sx={{
                    bgcolor: "background.paper",
                    pt: 15,
                    pb: 5,
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
                        {submitted ? 'Next' : 'Submit'}
                    </Button>
                </FormControl>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}