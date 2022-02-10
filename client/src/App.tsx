import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import SortingGame from "./components/SortingGame";

function App() {
  return (
    <ChakraProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SortingGame />} />
          </Routes>
        </Router>
      </GameProvider>
    </ChakraProvider>
  );
}

export default App;
