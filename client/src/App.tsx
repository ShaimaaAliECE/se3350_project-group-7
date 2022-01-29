import React from "react";
import { ChakraProvider, Select, Container } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1 style={{ textAlign: 'center' }}>Algorithmn Educational Game</h1>
        <br></br>
        <Select placeholder='Select Algo'>
          <option value='Merge Sort'>Merge Sort</option>
        </Select>
      </Container>
    </ChakraProvider >
  );
}

export default App;
