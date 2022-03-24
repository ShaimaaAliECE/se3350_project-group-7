import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import SortingGame from "./components/SortingGame";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import LoginPage from "pages/Login";

function App() {
  return (
    <ChakraProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/game" element={<SortingGame />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </GameProvider>
    </ChakraProvider>
  );
}

export default App;
