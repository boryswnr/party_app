import React from "react";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <h1>This is HomePage</h1>
            <Routes>
                <Route path={JoinRoomPage} component={JoinRoomPage} />
                <Route path={CreateRoomPage} component={CreateRoomPage} />
            </Routes>
        </>
    );
};

export default HomePage;
