import React, { useRef } from "react";
import { Box, Flex, Button, Spacer } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import { Heading } from "@chakra-ui/react";

const TOOLBAR_HEIGHT = "64px";

export type DemoProps = {};

const Demo: React.FC<DemoProps> = ({}) => {
  const game = useGame();
  const endElemRef = useRef<HTMLDivElement>(null);

  function onNext() {
    game.next();
    setTimeout(
      () =>
        endElemRef.current?.scrollIntoView({ block: "end", inline: "start" }),
      0
    );
  }

  return (
    <Box h="100vh">
      <Flex bg="white.100" h={TOOLBAR_HEIGHT} p={4}>
        <Heading as="h1" fontSize="lg">
          Level 1: Demo of Merge Sort
        </Heading>
        <Spacer />
        <Button mr={4} onClick={game.prev}>
          Prev
        </Button>
        <Button onClick={onNext}>Next</Button>
      </Flex>
      <Box h={`calc(100vh - ${TOOLBAR_HEIGHT})`} overflowY="auto">
        {game.steps.map((step, index) => (
          <Flex
            justify="center"
            align="flex-end"
            p={2}
            m={2}
            display={index > game.stepIndex ? "none" : "flex"}
            opacity={index > game.stepIndex ? 0 : 1}
            bg={index === game.stepIndex ? "gray.200" : "white"}
          >
            {step.value.map((arr, index) => (
              <>
                {index !== 0 && <Box w="10px" />}
                {arr.map((num) => (
                  <Flex
                    borderWidth="2px"
                    borderColor="blue.500"
                    borderStyle="solid"
                    h="50px"
                    w="50px"
                    bg="blue.300"
                    justify="center"
                    align="center"
                  >
                    {num.toString()}
                  </Flex>
                ))}
              </>
            ))}
          </Flex>
        ))}
        <Box ref={endElemRef} />
      </Box>
    </Box>
  );
};

export default Demo;
