import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  Text,
  Flex,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react';

const OPTIONS = [{ value: "game", name: "Merge Sort" }];

export type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const navigate = useNavigate();

  const [selection, setSelection] = useState<number>(0);

  function start() {
    navigate(OPTIONS[selection].value);
  }

  return (
    <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}>
       Welcome!{' '}
        <Text as={'span'} color={'orange.400'}>
          To the Algorithm Educational Game
        </Text>
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'}>
        We are on a mission to help undergraduate students learn different sorting algorithms. Currently, we only have one algorithm available, merge sort.
        Keep checking for new algorithms!
      </Text>
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
      <Flex w={'full'}>
      </Flex>
    </Stack>
  </Container>
  );
};

export default Home;
