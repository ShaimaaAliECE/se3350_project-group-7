import React, { useState } from "react";
import {
  Button,
  Select,
  VStack,
  Center,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const OPTIONS = [{ value: "merge-sort", name: "Merge Sort" }];

export type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const navigate = useNavigate();

  const [selection, setSelection] = useState<number>(0);

  function start() {
    navigate(OPTIONS[selection].value);
  }

  return (
          <Center mt={8}>
            <VStack justify="center" align="center" w="50%" spacing={4}>
              <Text as="h1">Algorithm Educational Game</Text>
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
              <Button onClick={start}>Start</Button>
            </VStack>
          </Center>
  );
};

export default Home;
