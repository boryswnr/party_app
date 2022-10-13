import React, { ChangeEvent, useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { joinRoomLayout } from "../components/muiSxStyling";

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTextFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRoomCode(e.currentTarget.value);
    };

    const roomBtnHandler = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: roomCode }),
        };

        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate(`/room/${roomCode}`);
                } else {
                    setError("Room not found");
                }
            })
            .catch((errorMessage) => console.log(errorMessage));
    };

    return (
        <Box sx={joinRoomLayout} className="white-background">
            <Typography mb={3} variant="h4" component="h4">
                Join a room
            </Typography>

            <TextField
                sx={{ marginBottom: "6px" }}
                error={error.length > 0}
                label="Code"
                placeholder="Enter the room code"
                variant="outlined"
                value={roomCode}
                helperText={error}
                onChange={handleTextFieldChange}
            ></TextField>

            <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: "6px" }}
                onClick={roomBtnHandler}
            >
                Enter room
            </Button>

            <Button
                variant="contained"
                color="secondary"
                to="/"
                component={Link}
            >
                Back
            </Button>
        </Box>
    );
};

export default JoinRoom;
