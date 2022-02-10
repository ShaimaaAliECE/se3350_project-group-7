import React from "react";
import { Flex } from "@chakra-ui/react";
import { useGame } from "@/context/GameContext";

export type BoxesProps = { values: number[] };

const Boxes: React.FC<BoxesProps> = ({ values }) => {
  const game = useGame();
  return (
    <Flex>
      {values.map((num, index) => (
        <Flex
          key={index}
          borderWidth="2px"
          borderColor="blue.500"
          borderStyle="solid"
          h={game.level === 4 ? "28px" : "50px"}
          w={game.level === 4 ? "28px" : "50px"}
          bg="blue.300"
          justify="center"
          align="center"
        >
          {num.toString()}
        </Flex>
      ))}
    </Flex>
  );
};

export default Boxes;
