import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "../pages/CreateRoom";
import HomePage from "../pages/HomePage";
import JoinRoom from "../pages/JoinRoom";
import Room from "../pages/Room";

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
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        );
    }
}

export default ReactRouter;
