import React, { HTMLInputTypeAttribute, useState } from "react";
import {
    Text,
    Heading,
    Button,
    Input,
  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const routeChange = () => {
        let path = "/yay";
        navigate(path);
    }

    function handleUsername(e: React.SyntheticEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setUsername(value);
    }

    function handlePassword(e: React.SyntheticEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setPassword(value);
    }

    function handleSubmit() {
        if(username=="admin" && password=="root"){
            routeChange();
        }
    }

    return(
        <div>
            <Heading>Time to Login</Heading>
            <Text>Username: </Text>
            <Input onChange={handleUsername} value={username} placeholder='medium size' size='md' />
            <Text>Password: </Text>
            <Input onChange={handlePassword} value={password} placeholder='medium size' size='md' />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    );
}

export default LoginPage;