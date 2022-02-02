import React, { useState } from "react";
import { Box, Flex, Button, Container, Input, Center } from "@chakra-ui/react";
import useGame from "../hooks/useGame";

export default function Level2() {
    const game = useGame();
    const [counter, setCounter] = useState(1);
    function isValid(e:any, answer:any) {
        console.log(e)
        console.log(answer)
        if (e === answer) {
            console.log("correct")
        } else {
            console.log("wrong")
        }
    }
    return (
        <Container centerContent>
            <h1>{game.steps[0].value.toString()}</h1>
            <Center>
                {game.steps[counter].value.map(arr => (
                    <Input name={arr.toString()} onChange={(e) => isValid(e.target.value, arr.toString())} placeholder='Insert numbers' />
                ))}
            </Center>
            <Button onClick={() => setCounter(counter + 1)}>Next Step</Button>
        </Container>
    )
}