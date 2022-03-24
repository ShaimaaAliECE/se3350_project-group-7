import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer,
  Flex,
  Button,
} from "@chakra-ui/react";
import Level1 from "@/components/Level1";
import Level2 from "@/components/Level2";
import Level3 from "@/components/Level3";
import Level4 from "@/components/Level4";
import Level5 from "@/components/Level5";
import { useGame } from "@/context/GameContext";
import { useNavigate } from "react-router";
import { logActionToServer } from "@/lib/logger";

export type Props = {};

const Header = () => {
  // TODO: Remove this hook once next level is properly implemented.
  // Tabs should not be clickable, this is only for demo purpose.
  const game = useGame();
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    logActionToServer("EXIT", {});
    navigate(path);
  };

  return (
    <Tabs index={game.level}>
      <Flex bg="gray.200" w="100%" position="sticky" zIndex="1" p={4}>
        <TabList>
          <Tab onClick={() => game.jumpToLevel(0)}>Level 1</Tab>
          <Tab
            isDisabled={!game.hasSeenLevel(0)}
            onClick={() => game.jumpToLevel(1)}
          >
            Level 2
          </Tab>
          <Tab
            isDisabled={!game.hasSeenLevel(1)}
            onClick={() => game.jumpToLevel(2)}
          >
            Level 3
          </Tab>
          <Tab
            isDisabled={!game.hasSeenLevel(2)}
            onClick={() => game.jumpToLevel(3)}
          >
            Level 4
          </Tab>
          <Tab
            isDisabled={!game.hasSeenLevel(3)}
            onClick={() => game.jumpToLevel(4)}
          >
            Level 5
          </Tab>
        </TabList>
        <Spacer />
        <Button onClick={game.restartLevel} mr={4}>
          Restart
        </Button>
        <Button colorScheme="red" onClick={routeChange}>
          Quit
        </Button>
      </Flex>
      <TabPanels>
        <TabPanel>
          <Level1 />
        </TabPanel>
        <TabPanel>
          <Level2 />
        </TabPanel>
        <TabPanel>
          <Level3 />
        </TabPanel>
        <TabPanel>
          <Level4 />
        </TabPanel>
        <TabPanel>
          <Level5 />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Header;
