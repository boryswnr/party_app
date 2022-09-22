import React from "react";
import CreateRoomPage from "./CreateRoomPage";
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

// export default ReactRouter;
