import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskBoard() {
  const { user } = useAuth();
  const {
    availableTasks,
    doneTasks,
    fetchTasks,
    toggleTaskCompletion,
    isCompleted,
  } = useTasks();

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="w-full h-[400px] bg-stone-200 flex rounded-lg shadow-md p-4">
      <div className="w-1/2 pr-4 border-r border-stone-400 overflow-y-auto">
        <h2 className=" sticky absolute top-0 z-10 text-center text-green-800 text-2xl bg-stone-200 font-boldbold mb-4">
          Available Tasks
        </h2>
        <div className="space-y-2">
          {availableTasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              dueDate={task.dueDate}
              description={task.description}
              onClick={() => toggleTaskCompletion(task._id, false)}
              isCompleted={isCompleted}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 pl-4 overflow-y-auto">
        <h2 className="text-center text-green-800 text-xl font-semibold mb-4">
          Done Tasks
        </h2>
        <div className="space-y-2">
          {doneTasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              dueDate={task.dueDate}
              description={task.description}
              onClick={() => toggleTaskCompletion(task._id, true)}
              isCompleted={isCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;
