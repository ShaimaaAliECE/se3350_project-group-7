import React from "react";
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
import { retrieveActionFromServer } from "@/lib/logger";

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

const Admin = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
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
          <StatsCard title={"Time Spent on Level 1"} stat={"5 minutes"} />
          <StatsCard title={"Time Spent on Level 2"} stat={"5 minutes"} />
          <StatsCard title={"Time Spent on Level 3"} stat={"5 minutes"} />
          <StatsCard title={"Time Spent on Level 4"} stat={"5 minutes"} />
          <StatsCard title={"Time Spent on Level 5"} stat={"5 minutes"} />
          <StatsCard title={"Time Spent Overall"} stat={"25 minutes"} />
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default Admin;
