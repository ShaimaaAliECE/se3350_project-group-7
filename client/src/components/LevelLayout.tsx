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

export type Props = {
  headingText: string;
  showInstructions: boolean;
  showInput: boolean;
};

const LevelLayout: React.FC<Props> = ({
  headingText,
  showInstructions,
  showInput,
  children
}) => {
  const game = useGame();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selection, setSelection] = useState<number>(0);

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
        ) : (
          <Button onClick={game.nextStep}>Next Step</Button>
        )}
      </Flex>
      <Container centerContent>
        {showInstructions && <Instructions />}
        <BoxesContainer mt="15px" />
        {showInput && <StepValidation />}
        {children}
      </Container>
      <Button onClick={onOpen}>Open Drawer</Button>
      <Modal isOpen={game.hasFailed} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>You messed up too many times</ModalHeader>
          <ModalBody>
          <Select
                onChange={(e) => setSelection(parseInt(e.target.value))}
                placeholder="Select a Sorting Algorithm"
              >
                {OPTIONS.map(({ value, name }, index) => (
                  <option value={index} key={value}>
                    {name}
                  </option>
                ))}
              </Select>
          </ModalBody>
          </ModalContent>
      </Modal>
    </Box>
  );
};

export default LevelLayout;
