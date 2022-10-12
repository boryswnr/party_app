import React, { Component } from "react";
import { PlayArrow, SkipNext, Pause } from "@mui/icons-material";
import {
    Box,
    LinearProgress,
    Card,
    Typography,
    IconButton,
} from "@mui/material";
import { musicPlayerLayout } from "./muiSxStyling";

type MusicPlayerProps = {
    time?: number;
    duration?: number;
    image_url?: string;
    title?: string;
    artist?: string;
    is_playing?: boolean;
    votes?: number;
    votes_required?: number;
};

const MusicPlayer = ({
    time,
    duration,
    image_url,
    title,
    artist,
    is_playing,
    votes,
    votes_required,
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

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
    };

    return (
        <Card>
            <Box sx={musicPlayerLayout}>
                <Box sx={{ maxWidth: "40%" }}>
                    <img src={image_url} height="100%" width="100%" />
                </Box>
                <Box sx={{ width: "60%" }}>
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
                        <IconButton onClick={() => skipSong()}>
                            {votes} / {votes_required}
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
