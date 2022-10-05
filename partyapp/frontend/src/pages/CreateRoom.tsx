import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import {
    RenderCreateButtons,
    RenderUpdateButtons,
} from "../components/Buttons";

type CreateRoomProps = {
    votes: number;
    pauseRules: boolean;
    editing: boolean;
};

const CreateRoom = ({ votes, pauseRules, editing }: CreateRoomProps) => {
    const [guestCanPause, setGuestCanPause] = useState(pauseRules);
    const [votesToSkip, setVotesToSkip] = useState(votes);
    const [editingSettings, setEditingSettings] = useState(editing);

    const handleVotesChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setVotesToSkip(parseInt(e.currentTarget.value));
    };

    const handleGuestCanPauseChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        e.currentTarget.value === "true"
            ? setGuestCanPause(true)
            : setGuestCanPause(false);
    };

    const navigate = useNavigate();

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/room/" + data.code));
    };

    const editOrCreate = editingSettings ? "Edit a room" : "Create a Room";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                margin: "0 auto",
            }}
        >
            <Box>
                <Typography component="h4" variant="h4">
                    {editOrCreate}
                </Typography>
            </Box>
            <Box>
                <FormControl component="fieldset">
                    <FormHelperText sx={{ textAlign: "center" }}>
                        Guest control of playback
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue="true"
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <FormControl>
                    <TextField
                        required={true}
                        onChange={handleVotesChange}
                        type="number"
                        defaultValue={votesToSkip}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                    />
                    <FormHelperText sx={{ textAlign: "center" }}>
                        Votes required to skip a song
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {editingSettings ? (
                    <RenderUpdateButtons
                        handleRoomButtonPressed={handleRoomButtonPressed}
                    />
                ) : (
                    <RenderCreateButtons
                        handleRoomButtonPressed={handleRoomButtonPressed}
                    />
                )}
            </Box>
        </Box>
    );
};

CreateRoom.defaultProps = {
    votes: 2,
    pauseRule: true,
    editing: false,
};

export default CreateRoom;
