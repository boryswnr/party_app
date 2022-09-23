import React from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
const App = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(JoinRoom, null),
        React.createElement("p", null, "This is paragraph of text"),
        React.createElement(CreateRoom, null)));
};
export default App;
