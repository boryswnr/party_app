import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import HomePage from "./HomePage";
import JoinRoom from "./JoinRoom";
class ReactRouter extends React.Component {
    delayFetch(ms, func) {
        return new Promise((resolve, reject) => setTimeout(() => func(resolve, reject), ms));
    }
    render() {
        return (React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(HomePage, null) }),
            React.createElement(Route, { path: "/join", element: React.createElement(JoinRoom, null) }),
            React.createElement(Route, { path: "/create", element: React.createElement(CreateRoom, null) })));
    }
}
export default ReactRouter;
