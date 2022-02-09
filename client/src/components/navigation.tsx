import React from "react";
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  } from "@chakra-ui/react";
import Home from "../pages/Home";
import Level2 from "./Level2";
import Demo from "./Demo";

const Navigation= () => {
  return (
      <Tabs>
      <TabList>
        <Tab>Home</Tab>
        <Tab>Level 1</Tab>
        <Tab>Level 2</Tab>
        <Tab>Level 3</Tab>
        <Tab>Level 4</Tab>
        <Tab>Level 5</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
            <Home/>
        </TabPanel>
        <TabPanel>
          <Demo />
        </TabPanel>
        <TabPanel>
          <Level2 />
        </TabPanel>
        {/* TabPanels for additional levels are below */}
        {/* <TabPanel> */}
        {/* </TabPanel> */}
        {/* <TabPanel> */}
        {/* </TabPanel> */}
        {/* <TabPanel> */}
        {/* </TabPanel> */}
        {/* <TabPanel> */}
        {/* </TabPanel> */}
        {/* <TabPanel> */}
        {/* </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};

export default Navigation;
