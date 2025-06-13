import React, { useState, useEffect } from "react";
import { api } from "../service/api";
import { useAuth } from "../context/AuthContext";

function ProgressBar() {
  const { user } = useAuth();
  const [width, setWidth] = useState(0);

  useEffect(() => {
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
  }, [user]);

  return (
    <div className="w-full h-4 bg-gray-300 rounded-full">
      <div
        className="bg-green-800 h-4 rounded-full transition-all duration-300"
        style={{ width: "50%" }}
      ></div>
    </div>
  );
}

export default ProgressBar;
