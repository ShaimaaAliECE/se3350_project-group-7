import { useGame } from "@/context/GameContext";
import { Flex, Text } from "@chakra-ui/react";

const Instructions = () => {
  const game = useGame();
  return (
    <Flex flexDir="column">
      <Text textAlign="center" p={1}>
        <Text fontWeight="bold">What just happened:</Text>{" "}
        {game.steps[game.stepIndex].instruction}
      </Text>
      {game.stepIndex < game.steps.length - 1 && (
        <Text textAlign="center" p={1}>
          <Text fontWeight="bold">What to do next:</Text>{" "}
          {game.steps[game.stepIndex + 1].instruction}
        </Text>
      )}
    </Flex>
  );
};

export default Instructions;
