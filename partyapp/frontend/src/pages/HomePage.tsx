import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                if (data.code) {
                    navigate(`/room/${data.code}`);
                }
            });
    }, []);

    return (
        <Box className="white-background">
            <Box>
                <Typography variant="h3">House party</Typography>
            </Box>
            <Box>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                >
                    <Button color="primary" to="/join" component={Link}>
                        Join a room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                        Create a room
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}

export default HomePage;
