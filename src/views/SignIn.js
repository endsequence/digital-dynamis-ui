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
import { LinearProgress } from "@mui/material";
import Copyright from "../components/Copyright";
import { setStorage } from "../utils";
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
                username: data.get('email'), password: data.get('password')
            });
            const user = result.data.user;
            // console.log({result});
            setStorage("DD_isLoggedIn", true);
            setStorage("DD_username", user.name)
            setStorage("DD_isAdmin", user.isAdmin)
            setStorage("DD_id", user.id)
            navigate("/");
        } catch (e) {
            setStorage("DD_isLoggedIn", false);
        }
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            disabled={loading}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            disabled={loading}
                            autoComplete="current-password"
                        />
                        {loading ? <LinearProgress /> : ''}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}