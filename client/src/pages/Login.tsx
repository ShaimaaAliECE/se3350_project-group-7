import React, { useState } from "react";
import {
  Text,
  Heading,
  Button,
  Input,
  Flex,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { reduceEachTrailingCommentRange } from "typescript";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/yay";
    navigate(path);
  };

  function handleUsername(e: React.SyntheticEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setUsername(value);
  }

  function handlePassword(e: React.SyntheticEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setPassword(value);
  }

  function handleSubmit() {
    if (username == "admin" && password == "root") {
      routeChange();
    } else {
      toast({
        title: "ERROR",
        description:
          "You've entered an incorrect username or password. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex justify={"center"} align={"center"} height={"100vh"}>
      <Box maxWidth={"640px"} height={"min-content"}>
        <Stack>
          <Heading>Login</Heading>
          <Text>Username: </Text>
          <Input
            onChange={handleUsername}
            value={username}
            placeholder="Username"
            size="md"
          />
          <Text>Password: </Text>
          <Input
            onChange={handlePassword}
            value={password}
            placeholder="Password"
            size="md"
          />
          <Button onClick={handleSubmit} colorScheme={"orange"}>
            Login
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
