import React from "react";
import HomePage from "../pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";
import ReactRouter from "./ReactRouter";
import { appLayout } from "./muiSxStyling";

const App = () => {
    return (
        <Router>
            <Box sx={appLayout}>
                <ReactRouter />
            </Box>
        </Router>
    );
};

export default App;
