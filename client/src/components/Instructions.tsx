import { useGame } from "@/context/GameContext";
import { chakra, Flex, Text } from "@chakra-ui/react";

const Instructions = () => {
  const game = useGame();
  return (
    <Flex flexDir="column">
      <Text textAlign="center" p={1}>
        <chakra.span fontWeight="bold">What just happened:</chakra.span>{" "}
        {game.steps[game.stepIndex].instruction}
      </Text>
      {game.stepIndex < game.steps.length - 1 && (
        <Text textAlign="center" p={1}>
          <chakra.span fontWeight="bold">What to do next:</chakra.span>{" "}
          {game.steps[game.stepIndex + 1].instruction}
        </Text>
      )}
    </Flex>
  );
};

export default Instructions;
