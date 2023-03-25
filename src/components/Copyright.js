import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.publicissapient.com/">
                Digital Dynamos
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
