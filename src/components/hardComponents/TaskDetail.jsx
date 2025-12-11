import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./TaskDetail.css";

function TaskDetail({ tasks, onUpdateTask, onDeleteTask }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(taskId));

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task?.text || "");
  const [notes, setNotes] = useState(task?.notes || "");

  if (!task) {
    return (
      <div className="task-detail">
        <h2>Task Not Found</h2>
        <p>The task you're looking for doesn't exist.</p>
        <Link to="/hard" className="back-link">
          ← Back to Task List
        </Link>
      </div>
    );
  }

  function handleSave() {
    if (editText.trim()) {
      onUpdateTask(task.id, { text: editText.trim(), notes });
      setIsEditing(false);
    }
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task.id);
      navigate("/hard");
    }
  }

  function handleToggleComplete() {
    onUpdateTask(task.id, { completed: !task.completed });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(task.text);
    }
  }

  return (
    <div className="task-detail">
      <Link to="/hard" className="back-link">
        ← Back to Task List
      </Link>

      <div className="task-detail-card">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="task-checkbox-large"
          />

          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="task-title-input"
              autoFocus
            />
          ) : (
            <h2 className={task.completed ? "completed" : ""}>{task.text}</h2>
          )}
        </div>

        <div className="task-meta">
          <span className={`status-badge ${task.completed ? "done" : "pending"}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
          <span className="task-id">ID: {task.id}</span>
        </div>

        <div className="task-notes-section">
          <label htmlFor="notes">Notes:</label>
          {isEditing ? (
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this task..."
              className="notes-textarea"
              rows={4}
            />
          ) : (
            <p className="notes-display">
              {task.notes || "No notes added yet."}
            </p>
          )}
        </div>

        <div className="task-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(task.text);
                  setNotes(task.notes || "");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Task
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
