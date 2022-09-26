import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    useEffect(() => {
        getRoomDetails();
    }, []);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>This is Room copmponent</p>
            <p>Votes to skip: {votesToSkip}</p>
            <p>Guests can pause: {guestCanPause ? "Yes" : " No"}</p>
            <p>Host: {isHost ? "Yes" : " No"}</p>
        </div>
    );
};

export default Room;
