import React from "react";
import { Box, Flex, Button, Container } from "@chakra-ui/react";
import useGame from "../hooks/useGame";

export default function Level2() {
    const game = useGame();
    let i = 1
    return (
        <Container centerContent>
            <h1>{game.steps[0].value.toString()}</h1>

        </Container>
    )
}