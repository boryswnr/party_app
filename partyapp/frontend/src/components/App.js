import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import { Routes, Route } from "react-router-dom";

class ReactRouter extends React.Component {
    delayFetch(ms, func) {
        return new Promise((resolve, reject) =>
            setTimeout(() => func(resolve, reject), ms)
        );
    }

    render() {
        return (
            <Routes>
                <Route path="/join" component={JoinRoomPage} />
                <Route path="/create" component={CreateRoomPage} />
            </Routes>
        );
    }
}

const App = () => {
    return (
        <div>
            <HomePage />
        </div>
    );
};

export default App;

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
