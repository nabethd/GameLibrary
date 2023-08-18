import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "./Components/NavBar";
import Games from "./pages/Games";
import Customers from "./pages/Customers";
import GameForm from "./pages/GameForm";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-header">
        <NavBar />
        <Routes>
          <Route path="/games" element={<Games />} />
          <Route path="/games/new" element={<GameForm />} />
          <Route path="/games/:gameId" element={<GameForm />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
