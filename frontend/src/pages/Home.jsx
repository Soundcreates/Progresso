import React from "react";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import TaskBoard from "../components/TaskBoard";
import AddTask from "../components/AddTask";
import { api } from "../service/api";
import { useAuth } from "../context/AuthContext";

function FriendCard({ username, progress }) {
  return (
    <div className="bg-green-800 text-white p-4 rounded-[30px] shadow-md hover:shadow-lg hover:scale-95 transition-all flex flex-col gap-2 w-full max-w-[200px]">
      <h3 className="text-lg font-semibold">{username}</h3>
      <div className="w-full h-2 bg-white rounded-full">
        <div
          className="bg-stone-200 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex-1 h-full flex flex-col gap-5 p-6 overflow-y-auto">
        <div className="bg-stone-200 rounded-[30px] shadow-md hover:shadow-lg hover:scale-95 transition-all p-6">
          <h2 className="text-green-800 text-xl font-semibold mb-4">
            Your Progress
          </h2>
          <ProgressBar />
        </div>
        <div className="bg-stone-200 rounded-[30px] shadow-md hover:shadow-lg hover:scale-95 transition-all p-6">
          <h2 className="text-green-800 text-xl font-semibold mb-4">
            Add New Task
          </h2>
          <AddTask />
        </div>
        <div className="bg-stone-200 rounded-[30px] shadow-md hover:shadow-lg hover:scale-95 transition-all p-6">
          <TaskBoard />
        </div>
      </div>
    </div>
  );
}

export default Home;
