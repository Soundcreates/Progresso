import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { api } from "../service/api";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [width, setWidth] = useState(0);

  const fetchProgress = async () => {
    try {
      const response = await api.get(`/tasks/progress/${user.id}`);
      console.log(response.data.progress);
      setWidth(response.data.progress);
    } catch (err) {
      console.error("Failed to fetch progress:", err.message);
    }
  };

  if (user?.id) {
    fetchProgress();
  }

  return (
    <ProgressContext.Provider value={{ width, fetchProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const content = useContext(ProgressContext);
  return content;
};

export default ProgressContext;
