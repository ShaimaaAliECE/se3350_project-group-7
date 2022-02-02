import React, { useState } from "react";
import { Button, Select, Container, Tabs, TabList, TabPanels,Tab, TabPanel} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
        onChange={(e) => setSelection(parseInt(e.target.value))}
        placeholder="Select Algo"
      >
        {OPTIONS.map(({ value, name }, index) => (
          <option value={index} key={value}>
            {name}
          </option>
        ))}
      </Select>
      <Button mt={4} onClick={start}>
        Start
      </Button>
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
  );
};

export default Home;
