import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import AddTask from "./components/AddTask.jsx";
import TaskBoard from "./components/TaskBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/taskboard" element={<TaskBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
