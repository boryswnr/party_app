import React from "react";
import { Box } from "@mui/system";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <Box>
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
