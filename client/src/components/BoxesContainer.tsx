import { useGame } from "@/context/GameContext";
import { Box, Flex, BoxProps } from "@chakra-ui/react";
import React from "react";
import Boxes from "@/components/Boxes";

export type BoxesContainerProps = {} & BoxProps;

const BoxesContainer: React.FC<BoxesContainerProps> = ({ ...rest }) => {
  const game = useGame();
  return (
    <Box {...rest}>
      {game.stepIndex >= 0 && (
        <Flex>
          {game.steps[game.stepIndex].value.map((arr, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <Box w="10px" />}
              <Boxes values={arr} />
            </React.Fragment>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default BoxesContainer;
