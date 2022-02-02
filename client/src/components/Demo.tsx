import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import { Heading } from '@chakra-ui/react';

export type DemoProps = {};

const Demo: React.FC<DemoProps> = ({}) => {
  const game = useGame();
  return (
    <div>
      <Heading >Level 1: Demo of Merge Sort</Heading>
      <Box position= "fixed" right= "0" >
        <Button onClick={game.prev}>Prev</Button>
        <Button onClick={game.next}>Next</Button>
      </Box>
      {game.steps.map((step, index) => (
        <Flex 
          align = "baseline"
          p={1} 
          m={2} 
          opacity = {index > game.stepIndex ? 0 : 1}
          bg={index === game.stepIndex ? "gray.200" : "white"}>
          {step.value.map((s) => 
          s.map((ss) => <Box h={ss+"1px"} w = "50px" bg="blue.200"/>)
          // (
          //   <Box borderColor="black" borderStyle="solid" borderWidth="1px">
          //     {s.toString()}
          //   </Box>
          // ) 
          )}
        </Flex>
      ))}
    </div>
  );
};

export default Demo;
