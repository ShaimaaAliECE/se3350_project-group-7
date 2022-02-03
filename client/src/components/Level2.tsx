import React, { useState } from "react";
import { Box, Flex, Button, Container, Input, Center } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import Boxes from "./Boxes";

export default function Level2() {
  const game = useGame();
  const [counter, setCounter] = useState(1);
  const [correct, setCorrect] = useState({}) as any;
  const [values, setValues] = useState<Record<number, string>>({});

  function onChange(key: number, value: string, ans: string) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    isValid(value, ans);
  }

  function isValid(input: string, answer: string) {
    if (input === answer) {
      let prev = correct;
      prev[answer] = true;
      setCorrect({ ...prev });
      var audio = new Audio(require("./sounds/shortSuccess.mp3"));
      audio.play();
    } else {
      console.log("wrong");
    }
  }

  function nextStep(ans: any) {
    if (Object.keys(correct).length === ans.length) {
      setCounter(counter + 1);
    }
    setCorrect({});
    setValues({});
  }

  return (
    <Container centerContent>
      <Flex>
        {game.steps[counter - 1].value.map((arr, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Box w="10px" />}
            <Boxes values={arr} />
          </React.Fragment>
        ))}
      </Flex>
      <Flex mt={6}>
        {game.steps[counter].value.map((arr, index) => (
          <Input
            value={values[index] || ""}
            onChange={(e) => onChange(index, e.target.value, arr.toString())}
            isDisabled={correct[arr.toString()]}
            focusBorderColor={correct[arr.toString()] ? "lime" : "grey"}
            borderColor={correct[arr.toString()] ? "lime" : "grey"}
            placeholder="Insert numbers"
          />
        ))}
      </Flex>

      <Button mt={6} onClick={() => nextStep(game.steps[counter].value)}>
        Next Step
      </Button>
    </Container>
  );
}
