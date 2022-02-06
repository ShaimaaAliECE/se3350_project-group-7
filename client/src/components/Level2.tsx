import React, {useEffect} from "react";
import { Box, Flex, Button, Container, Input } from "@chakra-ui/react";
import Boxes from "./Boxes";
import { useGame } from "../context/GameContext";

export default function Level2() {
  const game = useGame();

  return (
    <Container centerContent>
      {game.stepIndex > 0 && (
        <Flex>
          {game.steps[game.stepIndex - 1].value.map((arr, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <Box w="10px" />}
              <Boxes values={arr} />
            </React.Fragment>
          ))}
        </Flex>
      )}
      <Flex mt={6}>
        {game.steps[game.stepIndex].value.map((arr, index) => (
          <Input ml={2} mr={2}
            value={game.values[index] || ""}
            onChange={(e) => game.handleInput(index, e.target.value)}
            isDisabled={game.correct[index]}
            isReadOnly={game.constant[index] || false}
            focusBorderColor={game.correct[index] ? "lime" : "grey"}
            borderColor={game.correct[index] ? "lime" : "grey"}
            placeholder="Insert numbers"
          />
        ))}
      </Flex>
      {game.stepIndex === game.steps.length - 1 ?
       <Button mt={6} onClick={() => game.nextStep()}>Next Level</Button>
      :<Button mt={6} onClick={() => game.nextStep()}>
        Next Step
      </Button>
      }
    </Container>
  );
}
