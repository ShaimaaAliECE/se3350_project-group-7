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
  Box,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { OPTIONS } from "@/constants";

export type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };

  const [selection, setSelection] = useState<number>(0);

  function start() {
    navigate(OPTIONS[selection].value);
  }

  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Welcome!{" "}
          <Text as={"span"} color={"orange.400"}>
            To the Algorithm Educational Game
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          We are on a mission to help undergraduate students learn different
          sorting algorithms. Currently, we only have one algorithm available,
          merge sort. Keep checking for new algorithms!
        </Text>
        <Select
          onChange={(e) => setSelection(parseInt(e.target.value))}
          defaultValue={"game"}
        >
          {OPTIONS.map(({ value, name }, index) => (
            <option value={index} key={value}>
              {name}
            </option>
          ))}
        </Select>
        <Button onClick={start}>Start</Button>
        <Button colorScheme="orange" onClick={routeChange}>
          View Analytics
        </Button>
        <Flex w={"full"}></Flex>
      </Stack>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
          position={"fixed"}
          bottom="0"
        >
          <Stack direction={"row"} spacing={6}>
            <Link href={"#"}>Instagram</Link>
            <Link href={"#"}>Facebook</Link>
            <Link href={"#"}>Linkedin</Link>
            <Link href={"#"}>Contact</Link>
          </Stack>
          <Text>© 2022 Softie Eng Design Team. All rights reserved</Text>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;
