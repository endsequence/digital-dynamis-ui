import React, { useEffect, useState } from "react";
import axios from "../customAxios";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_HOST } from '../constants'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup } from "@mui/material";
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

function createData(id, name, calories, fat, carbs, protein, price) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
        price
    };
}

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
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 20, pr: 3, pt: 2, pb: 2 }}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Choose Device Target</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                <Button variant="contained" onClick={() => handleSubmit(row.id)}>
                                    Update
                                </Button>
                            </FormControl>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

export default function ListRequests() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedOption, setOption] = useState('');
    const handleSubmit = async (rowId) => {
        console.log({ rowId, selectedOption })
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
        let url = `${API_HOST}/requests`;

        const result = axios.get(url).then(data => {
            console.log({ data })
        })

    }, [])

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    const rows = [
        createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
        createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
        createData(3, 'Eclair', 262, 16.0, 24, 6.0, 3.79),
        createData(4, 'Cupcake', 305, 3.7, 67, 4.3, 2.5),
        createData(5, 'Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    ];

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
                    <Container maxWidth="lg" sx={{ pt: 8 }}>
                        <Grid direction="column"
                            alignItems="center"
                            textAlign="center"
                            justifyContent="center">
                            <Box sx={{ fontSize: '35px', fontWeight: 'bold', pb: 6 }}>
                                Request List
                            </Box>
                        </Grid>

                        <Grid container spacing={4} sx={{ my: 2 }}>
                            {/* <div style={{ height: '400px',maxHeight:'700px', width: '100%' }}> */}
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Dessert (100g serving)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <Row key={row.name} row={row} setOption={setOption} handleSubmit={handleSubmit} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </div> */}
                        </Grid>
                    </Container>
                </Box>
            </main>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
    );
}