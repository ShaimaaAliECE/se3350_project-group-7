import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Select,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { useGame } from "@/context/GameContext";
import { TOOLBAR_HEIGHT } from "@/constants";
import BoxesContainer from "./BoxesContainer";
import StepValidation from "./StepValidation";
import Instructions from "./Instructions";
import Timer from "@/components/Timer";
import { OPTIONS } from "@/constants";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export type Props = {
  headingText: string;
  showInstructions: boolean;
  showInput: boolean;
  showAttempts: boolean;
};

const LevelLayout: React.FC<Props> = ({
  headingText,
  showInstructions,
  showInput,
  showAttempts,
  children,
}) => {
  const game = useGame();
  const toast = useToast();

  function didWin() {
    if (
      (game.stepIndex === game.steps.length - 2 && game.level === 0) ||
      (game.stepIndex === game.steps.length - 2 &&
        game.level > 0 &&
        game.correct[0])
    ) {
      toast({
        title: "Good job!",
        description: `You've completed level ${game.level + 1}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handleNextStep() {
    game.nextStep();
    didWin();
  }

  const [algo, setAlgo] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [customRestart, setCustomRestart] = useState<boolean>(false);
  const navigate = useNavigate();

  const availableLevels = useMemo(() => {
    let items = [];
    for (let i = 0; i <= game.maxLevelSeen; i++) {
      items.push(<option value={i}>Level {i + 1}</option>);
    }
    return items;
  }, [game.maxLevelSeen]);

  return (
    <Box h="100vh">
      <Flex bg="white.100" h={TOOLBAR_HEIGHT} p={4}>
        <Heading as="h1" fontSize="lg">
          {headingText}
        </Heading>
        <Spacer />
        <Text
          fontFamily="monospace"
          fontSize="lg"
          fontWeight="bold"
          mr={4}
          mt={2}
        >
          <Timer />
        </Text>
        <Button mr={4} onClick={game.prevStep}>
          Previous Step
        </Button>
        {game.stepIndex === game.steps.length - 1 && game.level < 5 - 1 ? (
          <>
            <Button onClick={() => game.jumpToLevel(game.level + 1)}>
              Next Level
            </Button>
            <Confetti recycle={false} />
          </>
        ) : (
          game.stepIndex !== game.steps.length - 1 && (
            <Button onClick={() => handleNextStep()}>Next Step</Button>
          )
        )}
      </Flex>
      <Container centerContent>
        {showInstructions && <Instructions />}
        <BoxesContainer mt="15px" />
        {showInput && <StepValidation />}
        {children}
      </Container>

      <Modal
        isOpen={game.hasFailed}
        onClose={() => {
          navigate("/");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You messed up too many times</ModalHeader>
          <ModalBody>
            <Text>
              You used all 3 of your attempts. Do you want to restart this
              level, try a previous level, or quit the game?
            </Text>
            {customRestart && (
              <div>
                <Select
                  marginTop={4}
                  onChange={(e) => setAlgo(parseInt(e.target.value))}
                  defaultValue={"game"}
                >
                  {OPTIONS.map(({ value, name }, index) => (
                    <option value={index} key={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Select
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                  defaultValue={"0"}
                  marginTop={2}
                >
                  {availableLevels}
                </Select>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {customRestart ? (
              <Flex width={"100%"}>
                <Button
                  onClick={() => {
                    setCustomRestart(false);
                  }}
                  variant="ghost"
                >
                  Easy Restart
                </Button>
                <Spacer />
                <Button
                  onClick={() => {
                    game.jumpToLevel(level);
                  }}
                  colorScheme="blue"
                  mr={1}
                  variant="outline"
                >
                  Go to level
                </Button>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    game.restartLevel();
                    navigate("/");
                  }}
                >
                  Quit
                </Button>
              </Flex>
            ) : (
              <Flex width={"100%"}>
                <Button
                  onClick={() => {
                    setCustomRestart(true);
                  }}
                  variant="ghost"
                >
                  Custom Restart
                </Button>
                <Spacer />
                <Button
                  onClick={() => {
                    game.restartLevel();
                  }}
                  colorScheme="blue"
                  mr={1}
                  variant="outline"
                >
                  Restart
                </Button>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    game.restartLevel();
                    navigate("/");
                  }}
                >
                  Quit
                </Button>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex>
        <Spacer />
        {showAttempts && (
          <Box bg="gray.200" p={4} borderRadius="lg">
            <Text>Remaining Attempts: {3 - game.attempts}/3 </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default LevelLayout;
