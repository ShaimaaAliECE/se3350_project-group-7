import { useGame } from "@/context/GameContext";
import { Flex, Input } from "@chakra-ui/react";

const StepValidation = () => {
  const game = useGame();
  return (
    <Flex mt={6}>
      {game.stepIndex < game.steps.length - 1 && 
        game.steps[game.stepIndex + 1].value.map((arr, index) => (
          game.steps[game.stepIndex + 1].type !== "answer" && (
          <Input
            mx={2}
            value={game.values[index] || ""}
            onChange={(e) => game.handleInput(index, e.target.value)}
            isDisabled={game.correct[index]}
            isReadOnly={game.readOnly[index] || false}
            focusBorderColor={game.correct[index] ? "lime" : "blue.200"}
            borderColor={
              game.correct[index]
                ? "lime"
                : !game.correct[index] && game.correct[index] !== undefined
                ? "red.500"
                : "grey"
            }
            placeholder={"Insert numbers"}
          />
        )))}
    </Flex>
  );
};

export default StepValidation;
