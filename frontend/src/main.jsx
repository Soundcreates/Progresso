import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TaskBoard from "./components/TaskBoard.jsx";
import FriendsBar from "./components/Sidebar.jsx";
import FriendsView from "./components/FriendsView.jsx";
import TaskCard from "./components/TaskCard.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import AddTask from "./components/AddTask.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
