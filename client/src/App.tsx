import React, { useState } from "react";
import { ChakraProvider, Select, Container } from "@chakra-ui/react";
import Demo from "./components/Demo";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";


function App() {
  const [algo, setAlgo] = useState("");
  return (
    
    <ChakraProvider>
      <Demo/>
    </ChakraProvider>
  );
  return (
    <ChakraProvider>
<Tabs>
  <TabList>
    <Tab>Level 1</Tab>
    <Tab>Level 2</Tab>
    <Tab>Level 3</Tab>
    <Tab>Level 4</Tab>
    <Tab>Level 5</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Algorithmn Educational Game-</h1>
        <br></br>
        <Select
          onChange={(e) => setAlgo(e.target.value)}
          placeholder="Select Algo"
        >
          <option value="MergeSort">Merge Sort</option>
        </Select>
        <br></br>
        <Button>Start</Button>
      </Container>
    </TabPanel>
    <TabPanel>
      <p>Level 2</p>
    </TabPanel>
    <TabPanel>
      <p>Level 3</p>
    </TabPanel>
    <TabPanel>
      <p>Level 4</p>
    </TabPanel>
    <TabPanel>
      <p>Level 5</p>
    </TabPanel>
  </TabPanels>
</Tabs> 
    </ChakraProvider>
  );
}

export default App;
