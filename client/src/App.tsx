import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <ChakraProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </GameProvider>
    </ChakraProvider>
  );
}

export default App;
