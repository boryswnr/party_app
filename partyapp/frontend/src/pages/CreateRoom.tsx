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
    Alert,
    Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import {
    RenderCreateButtons,
    RenderUpdateButtons,
} from "../components/Buttons";
import {
    centerText,
    createRoomLayout,
    flexColumn,
} from "../components/muiSxStyling";

type CreateRoomProps = {
    votes?: number;
    pauseRules?: boolean;
    editing?: boolean;
    code?: string | undefined;
    updateCallback?: () => void;
};

const CreateRoom = ({
    votes = 2,
    pauseRules = true,
    editing = false,
    code,
    updateCallback,
}: CreateRoomProps) => {
    const [guestCanPause, setGuestCanPause] = useState(pauseRules);
    const [votesToSkip, setVotesToSkip] = useState(votes);
    const [editingSettings, setEditingSettings] = useState(editing);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

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

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: code,
            }),
        };
        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                setSuccessMsg("Room updated successfully!");
            } else {
                setErrorMsg("Error updating room...");
            }
            if (updateCallback) {
                updateCallback();
            }
        });
    };

    const editOrCreate = editingSettings ? "Edit a room" : "Create a Room";

    return (
        <Box sx={createRoomLayout} className="white-background">
            <Box>
                <Collapse in={successMsg !== "" || errorMsg !== ""}>
                    {successMsg ? (
                        <Alert severity="success">{successMsg}</Alert>
                    ) : (
                        <Alert severity="error">{errorMsg}</Alert>
                    )}
                </Collapse>
                <Typography component="h4" variant="h4">
                    {editOrCreate}
                </Typography>
            </Box>
            <Box>
                <FormControl component="fieldset">
                    <FormHelperText sx={centerText}>
                        Guest control of playback
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue={pauseRules.toString()}
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
                    <FormHelperText sx={centerText}>
                        Votes required to skip a song
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box sx={flexColumn}>
                {editingSettings ? (
                    <RenderUpdateButtons
                        handleUpdateButtonPressed={handleUpdateButtonPressed}
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

export default CreateRoom;
