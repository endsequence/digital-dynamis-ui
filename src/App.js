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
import Devices from "./views/Devices";
import SignIn from "./views/SignIn";
import Admin from "./views/Admin";
import RequestList from "./views/RequestList";
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
            <Route exact path="/devices" element={<Devices />} />
            <Route exact path="/tools" element={<Tools />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/request" element={<RequestList />} />
          </Routes>
        </Router>
      </Box>
    </LocalizationProvider>
  );
}
