import React, { useState } from "react";
import { ChakraProvider, Select, Container } from '@chakra-ui/react'

function App() {
  const [algo, setAlgo] = useState("")
  return (
    <ChakraProvider>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1 style={{ textAlign: 'center' }}>Algorithmn Educational Game</h1>
        <br></br>
        <Select onChange={(e) => setAlgo(e.target.value)} placeholder='Select Algo'>
          <option value='MergeSort'>Merge Sort</option>
        </Select>
      </Container>
    </ChakraProvider >
  );
}

export default App;
