import React, { useState } from "react";
import { Box, Flex, Button, Container, Input, Center } from "@chakra-ui/react";
import useGame from "../hooks/useGame";

export default function Level2() {
    const game = useGame();
    const [counter, setCounter] = useState(1);
    return (
        <Container centerContent>
            <h1>{game.steps[0].value.toString()}</h1>
            <Center>
                {game.steps[counter].value.map(arr => (
                    <Input placeholder='Insert numbers' />
                ))}
            </Center>
            <Button onClick={() => setCounter(counter + 1)}>Next Step</Button>
        </Container>
    )
}