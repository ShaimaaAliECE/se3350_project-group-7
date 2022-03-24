import React, { useState } from "react";
import {
    Text,
    Heading,
    Button,
    Input,
  } from "@chakra-ui/react";

const LoginPage = () => {
    
    return(
        <div>
            <Heading>Time to Login</Heading>
            <Text>Username: </Text>
            <Input placeholder='medium size' size='md' />
            <Text>Password: </Text>
            <Input placeholder='medium size' size='md' />
            <Button>Login</Button>
        </div>
    );
}

export default LoginPage;