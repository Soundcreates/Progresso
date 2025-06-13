import React, { useState } from "react";
import { Delete, Pencil, Save, X, Check, Undo } from "lucide-react";
import { useTasks } from "../context/TaskContext";

function TaskCard({ id, title, dueDate, description, onClick, isCompleted }) {
  const { handleDelete, handleEdit } = useTasks();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);

  const saveEdit = () => {
    handleEdit(id, editedTitle, editedDueDate, editedDescription);
    setEditMode(false);
  };

  return (
    <div className="w-[300px] min-h-[120px] p-3 gap-3 flex flex-col text-white shadow-md hover:shadow-lg hover:scale-95 transition-all duration-300 bg-green-800 rounded-xl">
      <div className="text-sm text-gray-200">{dueDate}</div>

      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-1 rounded bg-white text-black"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-1 rounded bg-white text-black"
            rows={2}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full p-1 rounded bg-white text-black"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={saveEdit}
              className="flex items-center gap-1 text-sm px-2 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-1 text-sm px-2 py-1 bg-gray-600 rounded hover:bg-gray-700"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      )}

      {!editMode && (
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-3">
            <div
              className="hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(true);
              }}
            >
              <Pencil size={18} />
            </div>
            <div
              className="hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
            >
              <Delete size={18} />
            </div>
            <div className="hover:scale-110" onClick={onClick}>
              {isCompleted ? <Undo /> : <Check />}
            </div>
          </div>
          <span className="text-xs">By, You</span>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
