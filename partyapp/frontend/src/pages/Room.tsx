import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateRoom from "./CreateRoom";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
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

    const renderSettings = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                {/* ADD props to CreateRoom */}
                <CreateRoom votes={votesToSkip} pauseRules={guestCanPause} editing={showSettings} />
                <Button
                    sx={{ margin: "4px 0 0 0" }}
                    variant="contained"
                    color="error"
                    onClick={() => {
                        setShowSettings(false);
                    }}
                >
                    Close
                </Button>
            </Box>
        );
    };

    if (showSettings) {
        return renderSettings();
    }
    return (
        <Box>
            <Typography variant="h4">Code: {roomCode}</Typography>

            <Typography variant="h6">Votes to skip: {votesToSkip}</Typography>

            <Typography variant="h6">
                Guests can pause: {guestCanPause ? "Yes" : " No"}
            </Typography>

            <Typography variant="h6">Host: {isHost ? "Yes" : " No"}</Typography>

            {isHost ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowSettings(true)}
                >
                    Settings
                </Button>
            ) : null}

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
