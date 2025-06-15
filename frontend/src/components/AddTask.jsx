import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useProgress } from "../context/ProgressContext";
function AddTask() {
  const { fetchProgress } = useProgress();

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
  });

  const { addTask } = useTasks();

  const handleAdd = async () => {
    await addTask(formData);
    setFormData({ title: "", dueDate: "", description: "" });
    fetchProgress();
  };

  return (
    <div className="w-full h-[200px] bg-stone-200 flex rounded-lg p-2 shadow-md text-black">
      <div className="w-[30%] flex items-center justify-center">
        <button
          onClick={handleAdd}
          className="bg-green-800 text-white cursor-pointer hover:scale-95 active:scale-90 px-3 py-2 rounded hover:bg-green-900 transition-all"
        >
          Add Task
        </button>
      </div>
      <div className="w-[70%] p-2 flex flex-col gap-4 justify-between">
        <input
          type="text"
          placeholder="Task name"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="px-2 py-1 rounded border border-gray-300 bg-stone-400"
        />
        <textarea
          placeholder="Describe your task"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="px-2 py-1 rounded border border-gray-300 bg-stone-400"
        ></textarea>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          className="px-2 py-1 rounded border border-gray-300 bg-stone-400"
        />
      </div>
    </div>
  );
}

export default AddTask;
