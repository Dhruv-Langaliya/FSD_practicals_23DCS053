import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, editing: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editing: !task.editing } : task
    ));
  };

  const handleUpdateTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText, editing: false } : task
    ));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Get Things Done !</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="What is the task today?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask();
              }
            }}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              {task.editing ? (
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                  onBlur={() => handleUpdateTask(task.id, task.text)} // Save on blur
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateTask(task.id, e.target.value);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span>{task.text}</span>
              )}
              <div className="task-actions">
                <button onClick={() => handleEditTask(task.id)} className="edit-btn">
                  {task.editing ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;