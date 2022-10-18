import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import MusicPlayer from "../components/MusicPlayer";
import { renderSettingsLayout, roomLayout } from "../components/muiSxStyling";
import { defaultSong } from "../components/defaultSong";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [song, setSong] = useState(defaultSong);
    const navigate = useNavigate();

    const getRoomDetails = async () => {
        const getRoom = await fetch("/api/get-room" + "?code=" + roomCode);
        const data = await (getRoom.ok ? getRoom.json() : navigate("/"));
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        if (data.is_host) {
            authenticateSpotify();
        }
    };

    const authenticateSpotify = async () => {
        const isAuthenticated = await (
            await fetch("/spotify/is-authenticated")
        ).json();
        if (!isAuthenticated.status) {
            const data = await (await fetch("/spotify/get-auth-url")).json();
            window.location.replace(data.url);
        }
    };

    const getCurrentSong = async () => {
        const song = await fetch("/spotify/current-song");
        if (!song.ok || song.status == 204) {
            return defaultSong;
        }
        const songJson = await song.json();
        setSong(songJson);
        document.body.style.backgroundImage = `url('${songJson.image_url}')`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentSong();
        }, 1000);
        setAppBackground();
        getRoomDetails();

        return () => clearInterval(interval);
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

    const setAppBackground = () => {
        document.body.style.backgroundImage = `url('${song.image_url}')`;
    };

    const renderSettings = () => {
        return (
            <Box sx={renderSettingsLayout}>
                <CreateRoom
                    votes={votesToSkip}
                    pauseRules={guestCanPause}
                    editing={showSettings}
                    code={roomCode}
                    updateCallback={getRoomDetails}
                />
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
        <Box sx={{ textAlign: "center" }} className="white-background">
            <Typography variant="h4">Code: {roomCode}</Typography>

            <MusicPlayer {...song} />
            <Box mt={1}>
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
        </Box>
    );
};

export default Room;
