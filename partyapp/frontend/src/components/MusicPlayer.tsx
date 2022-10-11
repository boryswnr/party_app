import React, { Component } from "react";
import { PlayArrow, SkipNext, Pause } from "@mui/icons-material";
import {
    Box,
    LinearProgress,
    Card,
    Typography,
    IconButton,
} from "@mui/material";

type MusicPlayerProps = {
    time?: number;
    duration?: number;
    image_url?: string;
    title?: string;
    artist?: string;
    is_playing?: boolean;
};

const MusicPlayer = ({
    time,
    duration,
    image_url,
    title,
    artist,
    is_playing,
}: MusicPlayerProps) => {
    const songProgress =
        time !== undefined && duration !== undefined
            ? (time / duration) * 100
            : 0;

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    };

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
    };

    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ maxWidth: "40%" }}>
                    <img src={image_url} height="100%" width="100%" />
                </Box>
                <Box
                    sx={{
                        width: "60%",
                    }}
                >
                    <Typography variant="h5">{title}</Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {artist}
                    </Typography>
                    <Box>
                        <IconButton
                            onClick={() => {
                                is_playing ? pauseSong() : playSong();
                            }}
                        >
                            {is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
};

export default MusicPlayer;
