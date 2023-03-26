import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TitleBar from "../components/TitleBar";
import axios from "../customAxios";
import { API_HOST } from '../constants'
import { Button, Link, Modal, Paper, Typography } from "@mui/material";
import Copyright from "../components/Copyright";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../utils";
import AddIcon from '@mui/icons-material/Add';

const linkCss = { border: 1, borderRadius: 48, pb: 1, pt: 1, pr: 2, pl: 2, fontSize: 10, mt: 2 };
const theme = createTheme();
export default function Discover() {
  let navigate = useNavigate();
  const userId = getStorage("DD_id");
  const userName = getStorage("DD_username");

  const [devices, setDevices] = useState([]);
  const [reason, setReason] = useState('');
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (deviceData) => {
    event.preventDefault();
    setModalData(deviceData)
    setOpen(true);

  }
  const handleClose = () => {
    setOpen(false)
    setModalData({})
  }

  const createRequest = async (deviceData) => {
    console.log({ deviceData, reason })
    let url = `${API_HOST}/requests`;
    const result = await axios.post(url, {
      userId, reason, deviceId: deviceData._id, type: "Company"
    });
    handleClose();
  }


  const getDeviceList = async () => {
    let url = `${API_HOST}/user/device/${userId}`;
    const result = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDevices(result.data);
  };

  useEffect(() => {
    getDeviceList();
  }, [])

  // console.log({ devices })

  useEffect(() => {
    const userIsAdmin = getStorage("DD_isAdmin");
    if (userIsAdmin === 'true') {
      navigate('/admin')
    }
  }, [navigate])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  color="primary"
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                >
                  My Devices
                </Typography>
                <Typography
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                >
                  Content Needed here
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6} md={4} key="addNew"
                alignItems="center"
                textAlign="center"
                justifyContent="center">
                <Paper elevation={3} sx={{ p: 2, m: 3, minHeight: "423px", opacity: .45 }}>
                  <Typography
                    variant="h7"
                    color="primary"
                    component="div"
                    sx={{ flexGrow: 1, pt: 4, fontSize: "40px", display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                  >
                    Add Device
                  </Typography>
                  <AddIcon sx={{ mt: 5, color: "#9a9a9a", fontSize: "140px" }} />
                  <Typography
                    variant="h7"
                    color="primary"
                    component="div"
                    sx={{ flexGrow: 1, pt: 4, fontSize: "20px", display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                  >
                    Coming soon...
                  </Typography>

                </Paper>
              </Grid>
              {devices.map((device, index) => {
                return (
                  <Grid item xs={6} md={4} key={index}
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center">
                    <Paper elevation={3} sx={{ p: 2, m: 3 }}>
                      <Box>
                        <Box sx={{ color: '#212B36' }}>{`${device.ownerType} Device`}</Box>
                        <Typography
                          variant="h7"
                          color="primary"
                          component="div"
                          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'center' } }}
                        >
                          {device.name}
                        </Typography>

                        <Box sx={{ pb: 3, pt: 3 }}>
                          <img src={device.imgUrl} width="300" alt={device.name} />
                        </Box>
                        <Box sx={{ fontsize: "5px" }}>
                          <span style={{ color: "rgb(25, 118, 210)" }}>Carbon Foot Print : </span>
                          {`${device.carbonFootprint} gCO2eq/kWh`}</Box>
                        <Box sx={{ fontsize: "5px", pb: 2 }}>
                          <span style={{ color: "rgb(25, 118, 210)" }}>Aquired On : </span>
                          {`${device.acquiredDate?.split('T')[0]}`}</Box>
                        <Box>
                          <Link underline="hover" color="rgb(25, 118, 210)" sx={linkCss} href="return false;" onClick={() => handleOpen(device)}>
                            Raise Request
                          </Link>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>)
              })}
            </Grid>

          </Container>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
          >
            <Paper elevation={3} sx={{ marginRight: "20%", marginLeft: "20%", mt: "5%", pb: 6 }}>
              <Box sx={{ padding: 5 }} alignItems="center"
                textAlign="left"
                justifyContent="left">
                <Box sx={{ display: 'flex', verticalAlign: 'center' }}>

                  <Typography variant="h6" gutterBottom sx={{ paddingBottom: 1 }}>
                    Change Request for Device : {modalData.name}
                  </Typography>
                </Box>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Please tell us the reason for returning."
                    multiline
                    fullWidth
                    rows={4}
                    value={reason}
                    onChange={(event) => { setReason(event.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box justifyContent="right">
                    <Button variant="contained" sx={{ color: "#ffffff", float: "right", mt: 3 }} onClick={() => createRequest(modalData)}>
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Modal>
        </Box>
      </main>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
