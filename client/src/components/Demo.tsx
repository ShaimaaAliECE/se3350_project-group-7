import React, { useRef, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, Center } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import Boxes from "./Boxes";
import { useGame } from "../context/GameContext";

const TOOLBAR_HEIGHT = "64px";

export type DemoProps = {};

const Demo: React.FC<DemoProps> = ({}) => {
  const game = useGame();
  const endElemRef = useRef<HTMLDivElement>(null);

  function onNext() {
    game.nextStep();
    // This is to automatically scroll to the last step
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
        <Button mr={4} onClick={game.prevStep}>
          Prev
        </Button>
        {game.stepIndex === game.steps.length - 1 ? (
          <Button onClick={onNext}>Next Level</Button>
        ) : (
          <Button onClick={onNext}>Next</Button>
        )}
      </Flex>
      <Box h={`calc(100vh - ${TOOLBAR_HEIGHT})`} overflowY="auto">
        {game.steps.map((step, index) => (
          <Flex
            bg={index === game.stepIndex ? "gray.200" : "white"}
            justify="center"
            flexDir="column"
          >
            <Center>
              <Text display={index > game.stepIndex ? "none" : "block"}>
                {step.type === "initial" ? "" : `Step: ${index} -`}{" "}
                {step.instruction}
              </Text>
            </Center>
            <Flex
              justify="center"
              align="flex-end"
              p={2}
              m={2}
              display={index > game.stepIndex ? "none" : "flex"}
              opacity={index > game.stepIndex ? 0 : 1}
            >
              {step.value.map((arr, index) => (
                <>
                  {index !== 0 && <Box w="10px" />}
                  <Boxes values={arr} />
                </>
              ))}
            </Flex>
          </Flex>
        ))}
        <Box ref={endElemRef} />
      </Box>

      <Box>
        {game.stepIndex === game.steps.length - 1 && (
          <Button onClick={() => game.jumpToLevel(1)}>NEXT LEVEL</Button>
        )}
      </Box>
    </Box>
  );
};

export default Demo;
