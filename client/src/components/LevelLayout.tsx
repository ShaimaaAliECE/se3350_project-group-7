import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useGame } from "@/context/GameContext";
import { TOOLBAR_HEIGHT } from "@/constants";
import BoxesContainer from "./BoxesContainer";
import StepValidation from "./StepValidation";
import Instructions from "./Instructions";

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
          game.stepIndex !== game.steps.length - 1 && (
            <Button onClick={game.nextStep}>Next Step</Button>
          )
        )}
      </Flex>
      <Container centerContent>
        {showInstructions && <Instructions />}
        <BoxesContainer mt="15px" />
        {showInput && <StepValidation />}
        {children}
      </Container>
      <Flex>
        <Spacer />
        {showAttempts && (
          <Box alignItems="center" bg="gray.200" p={4} borderRadius="lg">
            <Text>Remaining Attempts: {3 - game.attempts}/3 </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default LevelLayout;
