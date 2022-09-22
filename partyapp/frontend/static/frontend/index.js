import React from "react";
import App from "./components/App";
import HomePage from "./components/HomePage";
import { createRoot } from "react-dom/client";
function Index() {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "This is index.tsx"),
        React.createElement(App, null),
        React.createElement(HomePage, null)));
}
export default Index;
const divApp = document.getElementById("app");
const root = createRoot(divApp);
root.render(React.createElement(App, null));
