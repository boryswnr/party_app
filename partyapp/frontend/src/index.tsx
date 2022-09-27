import React from "react";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import { createRoot } from "react-dom/client";

const divApp = document.getElementById("app");
const root = createRoot(divApp!);
root.render(<App />);
