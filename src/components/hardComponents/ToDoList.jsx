import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat Breakfast", "Study", "Workout"]);
  const [newTasks, setNewTasks] = useState("");

  function handleInputChange(event) {
    setNewTasks(event.target.value);
  }

  function addTask() {
    if (newTasks.trim() !== "") {
      setTasks((task) => [...task, newTasks]);
      newTasks("");
    }
  }

  function deleteTask(index) {
    
    for (let task of tasks){
        if(tasks.indexOf(task) !== index){
            
        }
    }

  }

  function moveTaskUp(index) {}

  function moveTaskDown(index) {}

  return (
    <div className="to-do-list">
      <h1>TO-DO-LIST</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a Task"
          value={newTasks}
          onChange={handleInputChange}
        />

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <span className="text">{task}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>

              <button className="move-button" onClick={() => moveTaskUp(index)}>
                UP
              </button>

              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                DOWN
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ToDoList;
