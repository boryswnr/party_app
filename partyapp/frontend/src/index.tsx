import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";

const divApp = document.getElementById("app");
const root = createRoot(divApp!);
root.render(<App />);
