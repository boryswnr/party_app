import React from "react";
import App from "./components/App";
import HomePage from "./components/HomePage";
import { createRoot } from "react-dom/client";
import ReactRouter from "./components/ReactRouter";

function Index() {
    return (
        <>
            <h1>This is index.tsx</h1>
            <App />
            <HomePage />
        </>
    );
}

export default Index;
const divApp = document.getElementById("app");
const root = createRoot(divApp!);
root.render(<App />);
