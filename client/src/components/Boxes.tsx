import React from "react";
import { Flex } from "@chakra-ui/react";

export type BoxesProps = { values: number[] };

const Boxes: React.FC<BoxesProps> = ({ values }) => {
  return (
    <Flex>
      {values.map((num) => (
        <Flex
          key={num}
          borderWidth="2px"
          borderColor="blue.500"
          borderStyle="solid"
          h="50px"
          w="50px"
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
