import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  Select,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useGame } from "@/context/GameContext";
import { TOOLBAR_HEIGHT } from "@/constants";
import BoxesContainer from "./BoxesContainer";
import StepValidation from "./StepValidation";
import Instructions from "./Instructions";
import { OPTIONS } from "@/constants";
import { useNavigate } from "react-router";

export type Props = {
  headingText: string;
  showInstructions: boolean;
  showInput: boolean;
};

const LevelLayout: React.FC<Props> = ({
  headingText,
  showInstructions,
  showInput,
  children,
}) => {
  const game = useGame();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selection, setSelection] = useState<number>(0);
  const [customRestart, setCustomRestart] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Box h="100vh">
      <Flex bg="white.100" h={TOOLBAR_HEIGHT} p={4}>
        <Heading as="h1" fontSize="lg">
          {headingText}
        </Heading>
        <Spacer />
        <Button mr={4} onClick={game.prevStep}>
          Previous Step
        </Button>
        {game.stepIndex === game.steps.length - 1 && game.level < 5 - 1 ? (
          <Button onClick={() => game.jumpToLevel(game.level + 1)}>
            Next Level
          </Button>
        ) : game.stepIndex !== game.steps.length - 1 && (
          <Button onClick={game.nextStep}>Next Step</Button>
        )}
      </Flex>
      <Container centerContent>
        {showInstructions && <Instructions />}
        <BoxesContainer mt="15px" />
        {showInput && <StepValidation />}
        {children}
      </Container>

      <Modal isOpen={game.hasFailed} onClose={onClose}>
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
                  onChange={(e) => setSelection(parseInt(e.target.value))}
                  placeholder="Select a Sorting Algorithm"
                >
                  {OPTIONS.map(({ value, name }, index) => (
                    <option value={index} key={value}>
                      {name}
                    </option>
                  ))}
                </Select>
                <Select placeholder="Select Level" marginTop={2}>
                  <option value="option1">Level 1</option>
                  <option value="option2">Level 2</option>
                  <option value="option3">Level 3</option>
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
                <Button colorScheme="blue" mr={1} variant="outline">
                  Go to level
                </Button>
                <Button colorScheme="red" mr={3} onClick={()=>{navigate("/")}}>
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
                <Button colorScheme="blue" mr={1} variant="outline">
                  Restart
                </Button>
                <Button colorScheme="red" mr={3} onClick={()=>{navigate("/")}}>
                  Quit
                </Button>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LevelLayout;
