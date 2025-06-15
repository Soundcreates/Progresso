import React, { useState, useEffect } from "react";
import { api } from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

function ProgressBar() {
  const { user } = useAuth();
  const { width, fetchProgress } = useProgress();

  fetchProgress();
  return (
    <div className="w-full h-4 bg-gray-300 rounded-full">
      <div
        className="bg-green-800 h-4 rounded-full transition-all duration-300"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
