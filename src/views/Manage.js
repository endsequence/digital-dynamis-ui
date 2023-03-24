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

const theme = createTheme();
export default function Discover() {

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [heroes, setHeroes] = useState([]);

  const [options, setOptions] = useState([]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const getHeroes = async () => {
    let url = 'https://digital-dynamos.azurewebsites.net/api/heroes';
    const result = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHeroes(result.data);
  };

  useEffect(() => {
    getHeroes();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar
        text={`Discover || Have fun :)`}
        link={"/"}
        linkText={"Discover Content"}
      />
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
                <Autocomplete
                  sx={{ width: "100%" }}
                  id="free-solo-demo"
                  freeSolo
                  options={options}
                  inputValue={searchQuery}
                  onInputChange={(event, newInputValue) => {
                    handleSearchQuery(newInputValue);
                  }}
                  renderInput={(params) => {
                    const InputProps = { ...params.InputProps };
                    InputProps.endAdornment = null;
                    return (
                      <TextField
                        {...params}
                        InputProps={InputProps}
                        label="Search"
                        value={searchQuery || ""}
                        onChange={(e) => handleSearchQuery(e.target.value)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Pagination
                  count={1000}
                  page={page}
                  shape="rounded"
                  size="large"
                  onChange={(event, Number) => {
                    setPage(Number);
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* {loading && ( */}
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <LinearProgress />
        </Container>
        {/* )} */}

        <Container maxWidth="lg">
          {heroes.map((result, index) => (
            <p key={index}>{result.name} - {result.saying}</p>
          ))}
        </Container>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <DiscoverCard result={{ id: 1, title: "title", rating: 3 }} key={0} />
            <DiscoverCard result={{ id: 1, title: "title", rating: 3 }} key={1} />
          </Grid>
        </Container>

      </main>
      <Footer />
    </ThemeProvider>
  );
}
