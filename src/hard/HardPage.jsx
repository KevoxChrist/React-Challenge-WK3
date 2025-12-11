import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "../components/hardComponents/ToDoList";
import TaskDetail from "../components/hardComponents/TaskDetail";

function HardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Eat Breakfast", completed: false, notes: "" },
    { id: 2, text: "Study", completed: false, notes: "" },
    { id: 3, text: "Workout", completed: false, notes: "" },
  ]);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      notes: "",
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function updateTask(id, updates) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function reorderTasks(newTasks) {
    setTasks(newTasks);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ToDoList
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onReorderTasks={reorderTasks}
          />
        }
      />
      <Route
        path="/task/:taskId"
        element={
          <TaskDetail
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        }
      />
    </Routes>
  );
}

export default HardPage;