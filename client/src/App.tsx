import React from "react";
import { ChakraProvider, Box, Flex, Button } from "@chakra-ui/react";
import useGame from "./hooks/useGame";

function App() {
  const game = useGame();
  return (
    <ChakraProvider>
      <Box>
        <Button onClick={game.prev}>Prev</Button>
        <Button onClick={game.next}>Next</Button>
      </Box>
      {game.steps.map((step, index) => (
        <Flex p={1} m={2} bg={index === game.stepIndex ? "blue.200" : "white"}>
          {step.map((s) => (
            <Box borderColor="black" borderStyle="solid" borderWidth="1px">
              {s.toString()}
            </Box>
          ))}
        </Flex>
      ))}
    </ChakraProvider>
  );
}

export default App;
