import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import useGame from "../hooks/useGame";

export type DemoProps = {};

const Demo: React.FC<DemoProps> = ({}) => {
  const game = useGame();
  return (
    <div>
      <Box>
        <Button onClick={game.prev}>Prev</Button>
        <Button onClick={game.next}>Next</Button>
      </Box>
      {game.steps.map((step, index) => (
        <Flex
          align="baseline"
          p={1}
          m={2}
          opacity={index > game.stepIndex ? 0 : 1}
          bg={index === game.stepIndex ? "blue.200" : "white"}
        >
          {step.value.map((arr, index) => (
            <>
              {index !== 0 && <Box w="5px" />}
              {arr.map((num) => (
                <Box
                  h={num * 6 + "px"}
                  w="20px"
                  bg="blue.500"
                  borderStyle="solid"
                  borderColor="black"
                  borderWidth="2px"
                />
              ))}
            </>
          ))}
        </Flex>
      ))}
    </div>
  );
};

export default Demo;
