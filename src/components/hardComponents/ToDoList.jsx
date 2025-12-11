import { useState } from "react";
import { Link } from "react-router-dom";
import "./ToDoList.css";

function ToDoList({ tasks, onAddTask, onUpdateTask, onDeleteTask, onReorderTasks }) {
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function deleteTask(id) {
    onDeleteTask(id);
  }

  function toggleComplete(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      onUpdateTask(id, { completed: !task.completed });
    }
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit(id) {
    if (editText.trim() !== "") {
      onUpdateTask(id, { text: editText.trim() });
    }
    setEditingId(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  function handleEditKeyPress(event, id) {
    if (event.key === "Enter") {
      saveEdit(id);
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      onReorderTasks(newTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      onReorderTasks(newTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>TO-DO-LIST</h1>

      <div className="add-task-container">
        <input
          type="text"
          placeholder="Enter a Task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="task-stats">
        <span>Total: {tasks.length}</span>
        <span>Completed: {tasks.filter((t) => t.completed).length}</span>
        <span>Pending: {tasks.filter((t) => !t.completed).length}</span>
      </div>

      <ol className="task-list">
        {tasks.map((task, index) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="task-checkbox"
            />

            {editingId === task.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                  className="edit-input"
                  autoFocus
                />
                <button className="save-btn" onClick={() => saveEdit(task.id)}>
                  Save
                </button>
                <button className="cancel-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <Link to={`/hard/task/${task.id}`} className="task-text">
                  {task.text}
                </Link>

                <div className="button-group">
                  <button
                    className="edit-button"
                    onClick={() => startEditing(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTaskUp(index)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTaskDown(index)}
                    disabled={index === tasks.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>

      {tasks.length === 0 && (
        <p className="empty-message">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}

export default ToDoList;
