import * as React from "react";
import Box from "@mui/material/Box";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Discover from "./views/Discover";
import Manage from "./views/Manage";
import Tools from "./views/Tools";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Router>
          <Routes>
            <Route exact path="/" element={<Discover />} />
            <Route exact path="/devices" element={<Manage />} />
            <Route exact path="/tools" element={<Tools />} />
          </Routes>
        </Router>
      </Box>
    </LocalizationProvider>
  );
}
