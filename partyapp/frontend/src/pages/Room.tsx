import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate();

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => {
                if (!response.ok) {
                    navigate("/");
                }
                return response.json();
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    useEffect(() => {
        getRoomDetails();
    }, []);

    const leaveBtnPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            navigate("/");
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
            }}
        >
            <Typography variant="h4">Code: {roomCode}</Typography>

            <Typography variant="h6">Votes to skip: {votesToSkip}</Typography>

            <Typography variant="h6">
                Guests can pause: {guestCanPause ? "Yes" : " No"}
            </Typography>

            <Typography variant="h6">Host: {isHost ? "Yes" : " No"}</Typography>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => leaveBtnPressed()}
            >
                Leave room
            </Button>
        </Box>
    );
};

export default Room;
