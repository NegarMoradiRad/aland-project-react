
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskItem = { id: Date.now(), text: newTask, isCompleted: false };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter(task =>
      filterStatus === "all"
        ? true
        : filterStatus === "done"
        ? task.isCompleted
        : !task.isCompleted
    )
    .filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="جستجو..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="filter-buttons">
        <button onClick={() => setFilterStatus("all")}>همه</button>
        <button onClick={() => setFilterStatus("done")}>انجام شده</button>
        <button onClick={() => setFilterStatus("in-progress")}>در حال انجام</button>
      </div>
      
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.isCompleted ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button onClick={() => removeTask(task.id)}>حذف</button>
          </li>
        ))}
      </ul>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="تسک جدید..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>اضافه</button>
      </div>
    </div>
  );
}

export default App;
