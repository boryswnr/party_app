import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import HomePage from "./HomePage";
import JoinRoom from "./JoinRoom";

class ReactRouter extends React.Component {
    delayFetch(ms: number, func: (resolve: any, reject: any) => any) {
        return new Promise((resolve, reject) =>
            setTimeout(() => func(resolve, reject), ms)
        );
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/create" element={<CreateRoom />} />
            </Routes>
        );
    }
}

export default ReactRouter;
