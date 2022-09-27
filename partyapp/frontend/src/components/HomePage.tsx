import React from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import { Routes, Route } from "react-router-dom";

function HomePage() {
    return (
        <Routes>
            <Route path="/" element={<h1>This is HomePage</h1>} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
    );
}

export default HomePage;
