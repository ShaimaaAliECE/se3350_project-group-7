import React, { useState, useEffect } from "react";
import {
  Text,
  Stack,
  Heading,
  Button,
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Action, retrieveActionFromServer } from "@/lib/logger";
interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      border={"1px solid"}
      borderColor={useColorModeValue("orange.400", "orange.400")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

//retrieve all the durations from the log file
let timeSpentOnLevels = retrieveActionFromServer();

//somehow need to parse this data based on the action
//if action is is FINISHED_LEVEL_1, access level 1 duration
//figure out the duration spent on each of the five levels
let durationL1 = 0;
let durationL2 = 0;
let durationL3 = 0;
let durationL4 = 0;
let durationL5 = 0;
let durationTotal =
  durationL1 + durationL2 + durationL3 + durationL4 + durationL5;

const Admin = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  // useEffect(() => {
  //   //update the durations when there is an update
  // })
  return (
    <Stack>
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        padding-left={"50px"}
      >
        <Button colorScheme="orange" onClick={routeChange}>
          Home
        </Button>
      </Heading>

      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          <Text as={"span"} color={"orange.400"}>
            Player Analytics
          </Text>
        </chakra.h1>
        {/* how to get the time spent on each level? */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Time Spent on Level 1 "}
            stat={durationL1 + " minutes"}
          />
          <StatsCard
            title={"Time Spent on Level 2 "}
            stat={durationL2 + " minutes"}
          />
          <StatsCard
            title={"Time Spent on Level 3 "}
            stat={durationL3 + " minutes"}
          />
          <StatsCard
            title={"Time Spent on Level 4 "}
            stat={durationL4 + " minutes"}
          />
          <StatsCard
            title={"Time Spent on Level 5 "}
            stat={durationL5 + " minutes"}
          />
          <StatsCard
            title={"Time Spent Overall"}
            stat={durationTotal + " minutes"}
          />
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default Admin;
