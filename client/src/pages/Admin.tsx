import React from "react";
import {
  Text,
  Stack,
  Heading
} from '@chakra-ui/react';


const Admin = () =>{
    return (
        <Stack>
            <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            <Text as={'span'} color={'orange.400'}>
            Player Analytics
            </Text>
            </Heading>
        </Stack>
        
    )
};


export default Admin;