import * as React from "react";
import Box from "@mui/material/Box";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Discover from "./views/Discover";

export default function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route exact path="/" element={<Discover />} />
          <Route exact path="/manage" element={<Discover />} />
          {/* <Route exact path="/discover" element={<Discover />} /> */}
        </Routes>
      </Router>
    </Box>
  );
}
