import React from "react";
import HomePage from "../pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";
import ReactRouter from "./ReactRouter";

const App = () => {
    return (
        <Router>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <ReactRouter />
            </Box>
        </Router>
    );
};

export default App;
