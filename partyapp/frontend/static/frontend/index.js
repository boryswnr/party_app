import React from "react";
import App from "./components/App";
import HomePage from "./components/HomePage";
function index() {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "This is index.tsx"),
        React.createElement(App, null),
        React.createElement(HomePage, null)));
}
export default index;
