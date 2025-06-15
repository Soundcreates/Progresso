import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../service/api";
import { useAuth } from "./AuthContext";
import { useProgress } from "./ProgressContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const { fetchProgress } = useProgress();

  const [availableTasks, setAvailableTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      clearTasksAtMidnight();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/tasks/${user.id}`);
      const tasks = response.data.tasks;
      setAvailableTasks(tasks.filter((task) => !task.isCompleted));
      setDoneTasks(tasks.filter((task) => task.isCompleted));
      fetchProgress();
    } catch (err) {
      console.error("Failed to fetch tasks:", err.message);
    }
  };

  const addTask = async ({ title, dueDate, description }) => {
    try {
      const formattedDate = new Date(dueDate).toISOString().split("T")[0];
      await api.post(
        "/tasks",
        { title, dueDate: formattedDate, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      await fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await api.patch(
        `/tasks/complete/${taskId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAvailableTasks((prev) => prev.filter((task) => task._id !== taskId));
      const movedTask = availableTasks.find((task) => task._id === taskId);
      if (movedTask)
        setDoneTasks((prev) => [...prev, { ...movedTask, isCompleted: true }]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleTaskCompletion = async (taskId, isCompleted) => {
    try {
      await api.patch(
        `/tasks/toggle/${taskId}`,
        { isCompleted: !isCompleted },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      await fetchTasks();
      setIsCompleted((prev) => !prev);
      fetchProgress();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAvailableTasks((tasks) => tasks.filter((task) => task._id !== id));
      setDoneTasks((tasks) => tasks.filter((task) => task._id !== id));
      fetchProgress();
    } catch (err) {
      console.error("Failed to delete task:", err.message);
    }
  };

  const handleEdit = async (id, title, dueDate, description) => {
    try {
      await api.put(
        `/tasks/${id}`,
        { title, date: dueDate, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      await fetchTasks();
    } catch (err) {
      console.log(err.message);
    }
  };

  const isMidnight = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours === 0 && minutes === 0;
  };

  const clearTasksAtMidnight = async () => {
    try {
      const now = new Date();
      if (isMidnight(now)) {
        setAvailableTasks([]);
        setDoneTasks([]);
        console.log("All tasks have been cleared at midnight");
        fetchProgress();
      }
    } catch (err) {
      console.log(err.message, " Cant clear messages at midnight");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        availableTasks,
        doneTasks,
        fetchTasks,
        addTask,
        completeTask,
        toggleTaskCompletion,
        handleDelete,
        handleEdit,
        isCompleted,
        fetchProgress,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
