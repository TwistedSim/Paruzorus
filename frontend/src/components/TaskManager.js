import React from "react";
import { useState, useEffect } from "react";

import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const TaskManager = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
    return await res.json();
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`);
    return await res.json();
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );
    console.log(JSON.stringify(updatedTask));
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task left"
      )}
    </div>
  );
};

export default TaskManager;
