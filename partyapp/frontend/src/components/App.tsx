import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/system";

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
                <HomePage />
            </Box>
        </Router>
    );
};

export default App;
