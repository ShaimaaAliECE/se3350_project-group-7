import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import { Heading } from "@chakra-ui/react";

export type DemoProps = {};

const Demo: React.FC<DemoProps> = ({}) => {
  const game = useGame();
  return (
    <div>
      <Flex bg="white.100">
        <Heading position="fixed">Level 1: Demo of Merge Sort</Heading>
        <Box position="fixed" right="0">
          <Button onClick={game.prev}>Prev</Button>
          <Button onClick={game.next}>Next</Button>
        </Box>
      </Flex>

      <br></br>
      <br></br>
      {game.steps.map((step, index) => (
        <Flex
          align="baseline"
          text-align="baseline"
          p={1}
          m={2}
          opacity={index > game.stepIndex ? 0 : 1}
          bg={index === game.stepIndex ? "gray.200" : "white"}
        >
          {step.value.map((arr, index) => (
            <>
              {index !== 0 && <Box w="10px" />}
              {arr.map((num) => (
                <Box
                  h={num * 6 + "px"}
                  w="50px"
                  bg="blue.300"
                  text-align="center"
                >
                  {num.toString()}
                </Box>
              ))}
            </>
          ))}
        </Flex>
      ))}
    </div>
  );
};

export default Demo;
