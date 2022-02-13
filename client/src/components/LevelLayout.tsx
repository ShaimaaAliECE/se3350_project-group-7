import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useGame } from "@/context/GameContext";
import { TOOLBAR_HEIGHT } from "@/constants";
import BoxesContainer from "./BoxesContainer";
import StepValidation from "./StepValidation";
import Instructions from "./Instructions";
import Confetti from "react-confetti";

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
  const toast = useToast();

  function didWin() {
    if (game.stepIndex === game.steps.length - 2) {
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
    </Box>
  );
};

export default LevelLayout;
