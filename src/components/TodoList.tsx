import React, { useState, useEffect } from "react";

interface Task {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#ffffff] p-6 w-80 rounded-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#000000]">
        My To-Do List
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-[#000000] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#fad3d7]"
        />
        <button
          onClick={addTask}
          className="bg-[#d1898f] text-white px-3 py-1 rounded hover:opacity-90"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-[#fad3d7] px-3 py-2 rounded"
          >
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {task.text}
            </span>

            <div className="flex gap-1">
              <button
                onClick={() => toggleTask(index)}
                className="bg-white px-2 rounded border border-black"
              >
                ✔
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-white px-2 rounded border border-black"
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
