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
  useColorMode,
  Divider,
  Switch,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
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
  const { colorMode, toggleColorMode } = useColorMode();
  const routeChange = () => {
    let path = "/";
    logActionToServer("EXIT", {});
    navigate(path);
  };

  return (
    <Tabs index={game.level}>
      <Flex w="100%" position="sticky" zIndex="1" p={4}>
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
        {colorMode === ('light') ? <SunIcon mt={3} mr={4}/> : <MoonIcon mt={3} mr={4}/>}
        <Switch onChange={toggleColorMode} colorScheme='blue' size='lg' mt={1.5} mr={4}/>
        <Button onClick={game.restartLevel} mr={4}>
          Restart
        </Button>
        <Button colorScheme="red" onClick={routeChange}>
          Quit
        </Button>
      </Flex>
      <Divider />
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
