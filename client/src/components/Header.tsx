import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import Home from "../pages/Home";
import Level1 from "@/components/Level1";
import Level2 from "@/components/Level2";
import Level3 from "@/components/Level3";
import Level4 from "@/components/Level4";
import Level5 from "@/components/Level5";
import { useGame } from "@/context/GameContext";

export type Props = {};

const Header = () => {
  // TODO: Remove this hook once next level is properly implemented.
  // Tabs should not be clickable, this is only for demo purpose.
  //index={game.level}
  const game = useGame();
  return (
    <Tabs index={game.level + 1}> 
      <Box bg="gray.200" w="100%" position="sticky" zIndex="1" p={4}>
        <TabList>
          <Tab>Home</Tab>
          <Tab onClick={() => game.jumpToLevel(0)}>Level 1</Tab>
          <Tab onClick={() => game.jumpToLevel(1)}>Level 2</Tab>
          <Tab onClick={() => game.jumpToLevel(2)}>Level 3</Tab>
          <Tab onClick={() => game.jumpToLevel(3)}>Level 4</Tab>
          <Tab onClick={() => game.jumpToLevel(4)}>Level 5</Tab>
        </TabList>
      </Box>
      <TabPanels>
        <TabPanel>
          <Home />
        </TabPanel>
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
