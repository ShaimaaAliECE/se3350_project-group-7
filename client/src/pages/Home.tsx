import React, { useState } from "react";
import {
  Button,
  Select,
  Tabs,
  TabList,
  Tab,
  VStack,
  Center,
  Text,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Level2 from "../components/Level2";
import Demo from "../components/Demo";

const OPTIONS = [{ value: "merge-sort", name: "Merge Sort" }];

export type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const navigate = useNavigate();

  const [selection, setSelection] = useState<number>(0);

  function start() {
    navigate(OPTIONS[selection].value);
  }

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
          <Center mt={8}>
            <VStack justify="center" align="center" w="50%" spacing={4}>
              <Text as="h1">Algorithm Educational Game</Text>
              <Select
                onChange={(e) => setSelection(parseInt(e.target.value))}
                placeholder="Select a Sorting Algorithm"
              >
                {OPTIONS.map(({ value, name }, index) => (
                  <option value={index} key={value}>
                    {name}
                  </option>
                ))}
              </Select>
              <Button onClick={start}>Start</Button>
            </VStack>
          </Center>
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

export default Home;
