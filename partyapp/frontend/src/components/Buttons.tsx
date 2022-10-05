import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

type renderCreateButtonsProps = {
    handleRoomButtonPressed: () => void;
};

type renderUpdateButtonsProps = {
    handleRoomButtonPressed: () => void;
};

export const RenderCreateButtons = ({
    handleRoomButtonPressed,
}: renderCreateButtonsProps) => {
    return (
        <>
            <Button
                sx={{ margin: "0 0 5px 0" }}
                color="primary"
                variant="contained"
                onClick={handleRoomButtonPressed}
            >
                Create a room
            </Button>
            <Button
                color="secondary"
                variant="contained"
                to="/"
                component={Link}
            >
                Back
            </Button>
        </>
    );
};

export const RenderUpdateButtons = ({
    handleRoomButtonPressed,
}: renderUpdateButtonsProps) => {
    return (
        <Button
            sx={{ margin: "0 0 5px 0" }}
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
        >
            Update a room
        </Button>
    );
};
