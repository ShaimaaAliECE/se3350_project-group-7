import React from "react";
import {
  Text,
  Stack,
  Heading,
  Button
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Admin = () =>{
    const navigate = useNavigate();
        const routeChange = () => {
          let path = "/";
          navigate(path);
        };
    return (
        <Stack>
            <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            <Text as={'span'} color={'orange.400'}>
            Player Analytics
            </Text>
            <Button colorScheme="orange" onClick={routeChange}>
            Home
            </Button>
            </Heading>
        </Stack>
        
    )
};


export default Admin;