import React from "react";
import { Grid, Typography, } from "@mui/material";
const CreateRoom = () => {
    return (React.createElement(Grid, { container: true, spacing: 1 },
        React.createElement(Grid, { xs: 12 },
            React.createElement(Typography, { component: "h4", variant: "h4" }, "Create A Room"))));
};
export default CreateRoom;
