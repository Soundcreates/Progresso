import React from "react";

function FriendAddCard({ username }) {
  return (
    <div className="bg-stone-300 hover:shadow-md hover:scale-95 transition-all duration-300 text-black px-4 py-3 rounded-lg shadow-sm flex items-center justify-between">
      <span className="font-medium">{username}</span>
      <button className="bg-green-800 cursor-pointer hover:bg-blue-800 active:scale-80 text-white px-3 py-1 rounded-full hover:scale-95 transition-all text-sm">
        Add Friend
      </button>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-[20%] min-w-[250px] h-screen bg-stone-200 p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-green-800">Add Friends</h1>

      <input
        type="text"
        placeholder="Search users..."
        className="rounded-full px-4 py-2 bg-stone-100 border border-stone-400 outline-none"
      />

      <div className="flex flex-col gap-4 mt-4">
        <FriendAddCard username="john_doe" />
        <FriendAddCard username="jane_smith" />
        <FriendAddCard username="alex_dev" />
      </div>
    </div>
  );
}

export default Sidebar;
