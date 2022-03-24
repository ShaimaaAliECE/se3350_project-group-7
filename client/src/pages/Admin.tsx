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
  Flex,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { Action, getLogFromServer } from "@/lib/logger";
interface StatsCardProps {
  title: string;
  stat: string;
}

const ACTIONS: Action[] = [
  "FINISH_LEVEL_1",
  "FINISH_LEVEL_2",
  "FINISH_LEVEL_3",
  "FINISH_LEVEL_4",
  "FINISH_LEVEL_5",
];

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
  const [log, setLog] = useState<null | any[]>(null);

  const computeArrAverage = (arr: number[]) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length || 0;
  };

  const getAvgCompletedLevelDuration = (level: number) => {
    if (!log) return;
    const filteredLog = log.filter(
      ({ action }) => action === `FINISH_LEVEL_${level}`
    );
    if (filteredLog.length === 0) return 0;
    const filteredLogDurations = filteredLog.map(({ payload }) =>
      parseInt(payload.duration)
    ) as number[];
    return computeArrAverage(filteredLogDurations);
  };

  useEffect(() => {
    const fetchLog = async () => {
      const logData = await getLogFromServer(ACTIONS);
      setLog(logData);
    };
    fetchLog().catch(console.error);
  }, []);

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <Box>
      <Flex align="center" justify="center" height="100vh">
        <Box maxWidth={"900px"} height={"min-content"}>
          <Box textAlign="center">
            <chakra.h1 fontSize={"4xl"} fontWeight={"bold"}>
              <Text as={"span"} color={"orange.400"}>
                Player Analytics
              </Text>
            </chakra.h1>
            <Button mb="4" colorScheme="orange" onClick={routeChange}>
              Home
            </Button>
          </Box>
          {log && (
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <StatsCard
                title={"Average Time Spent on Level 1 "}
                stat={`${getAvgCompletedLevelDuration(1)} seconds`}
              />
              <StatsCard
                title={"Average Time Spent on Level 2 "}
                stat={`${getAvgCompletedLevelDuration(2)} seconds`}
              />
              <StatsCard
                title={"Average Time Spent on Level 3 "}
                stat={`${getAvgCompletedLevelDuration(3)} seconds`}
              />
              <StatsCard
                title={"Average Time Spent on Level 4 "}
                stat={`${getAvgCompletedLevelDuration(4)} seconds`}
              />
              <StatsCard
                title={"Average Time Spent on Level 5 "}
                stat={`${getAvgCompletedLevelDuration(5)} seconds`}
              />
              <StatsCard
                title={"Average Time Spent on All Levels "}
                stat={`${computeArrAverage([
                  getAvgCompletedLevelDuration(1) || 0,
                  getAvgCompletedLevelDuration(2) || 0,
                  getAvgCompletedLevelDuration(3) || 0,
                  getAvgCompletedLevelDuration(4) || 0,
                  getAvgCompletedLevelDuration(5) || 0,
                ])} seconds`}
              />
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Admin;
