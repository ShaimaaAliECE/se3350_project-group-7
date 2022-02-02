import React, { useState } from "react";
import { Button, Select, Container } from "@chakra-ui/react";
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
  );
};

export default Home;
