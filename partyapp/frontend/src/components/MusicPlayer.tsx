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

    return (
        <Card>
            <Box sx={{ textAlign: "center" }}>
                <img src={image_url} height="100%" width="100%" />
                <Typography variant="h5">{title}</Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {artist}
                </Typography>
                <Box>
                    <IconButton>
                        {is_playing ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton>
                        <SkipNext />
                    </IconButton>
                </Box>
            </Box>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
};

export default MusicPlayer;
