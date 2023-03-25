import * as React from "react";
import Box from "@mui/material/Box";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Insights from "./views/Insights";
import Manage from "./views/Manage";
import Devices from "./views/Devices";
import SignIn from "./views/SignIn";
import Admin from "./views/Admin";
import RequestList from "./views/RequestList";
import Tools from "./views/Tools";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { getStorage } from "./utils";

export default function App() {

  const RequireAuth = ({ children }) => {
    const userIsLogged = getStorage("DD_isLoggedIn");
    if (!userIsLogged) {
      return <SignIn />;
    }
    return children;
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Router>
          <Routes>
            <Route exact path="/" element={<RequireAuth><Insights /></RequireAuth>} />
            <Route exact path="/devices" element={<RequireAuth><Devices /></RequireAuth>} />
            <Route exact path="/tools" element={<RequireAuth><Tools /></RequireAuth>} />
            <Route exact path="/login" element={<RequireAuth><SignIn /></RequireAuth>} />
            <Route exact path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
            <Route exact path="/admin/request" element={<RequireAuth><RequestList /></RequireAuth>} />
          </Routes>
        </Router>
      </Box>
    </LocalizationProvider>
  );
}
