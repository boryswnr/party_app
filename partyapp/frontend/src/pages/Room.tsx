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
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [song, setSong] = useState({});
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
                if (data.is_host) {
                    authenticateSpotify();
                }
            });
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSpotifyAuthenticated(data.status);
                if (!data.status) {
                    fetch("/spotify/get-auth-url").then((response) =>
                        response.json().then((data) => {
                            window.location.replace(data.url);
                        })
                    );
                }
            });
    };

    const getCurrentSong = () => {
        console.log("fetching spotify/current-song");
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    console.log("response not ok");
                    return {};
                } else {
                    console.log("response ok:", response);
                    return response.json();
                }
            })
            .then((data) => {
                console.log("setting song");
                if (data !== undefined) setSong(data);
                console.log(data);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentSong();
        }, 1000);
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

    const renderSettings = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
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
        <Box>
            <Typography variant="h4">Code: {roomCode}</Typography>

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
