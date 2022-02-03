import React, { useState } from "react";
import { Box, Flex, Button, Container, Input, Center } from "@chakra-ui/react";
import useGame from "../hooks/useGame";

export default function Level2() {
    const game = useGame();
    const [counter, setCounter] = useState(1);
    const [correct, setCorrect] = useState({}) as any;

    function isValid(input: string, answer: string) {
        if (input === answer) {
            let prev = correct
            prev[answer] = true
            setCorrect({ ...prev })
            var audio = new Audio(require("./sounds/shortSuccess.mp3"));
            audio.play();
        } else {
            console.log("wrong")
        }
    }

    function nextStep() {
        setCounter(counter + 1)
        setCorrect({})
    }

    return (
        <Container centerContent>
            <h1>{game.steps[0].value.toString()}</h1>
            <Center>
                {game.steps[counter].value.map((arr, index) => (
                    <Input isDisabled={correct[arr.toString()]} focusBorderColor={correct[arr.toString()] ? 'lime' : 'red.300'} borderColor={correct[arr.toString()] ? 'lime' : "grey"} onChange={(e) => isValid(e.target.value, arr.toString())} placeholder='Insert numbers' />
                )
                )}
            </Center>
            <Button onClick={nextStep}>Next Step</Button>
        </Container >
    )
}