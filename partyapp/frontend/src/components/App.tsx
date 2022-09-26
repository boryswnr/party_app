import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <HomePage />
        </Router>
    );
};

export default App;
