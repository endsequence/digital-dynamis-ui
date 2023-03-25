import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { setStorage } from "../utils";

const TitleBar = () => {
  let navigate = useNavigate();
  const location = useLocation()

  const navItems = location.pathname.includes('admin') ? [
    { label: 'Change Reuqest', value: '/admin/request' },
    { label: 'Inventory', value: '/admin/invetory' }
  ] : [
    { label: 'Insights', value: '/' },
    { label: 'Devices', value: '/devices' },
    { label: 'Tools', value: '/tools' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    setStorage("DD_isLoggedIn", undefined);
    navigate("/login");
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          PUBLICIS GREEN
        </Typography>
        <Typography
          variant="h7"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Welcome user name
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item, index) => (
            <Button key={++index} sx={{ color: '#fff' }} onClick={() => { handleNavigate(item.value) }}>
              {item.label}
            </Button>
          ))}
          <Button key={0} sx={{ color: '#fff' }} onClick={() => { handleLogout() }}>
              Logout
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
