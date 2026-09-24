import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  return (
    <div>
      <p class="header1">Task Manager</p>
      <label for="choices">What operation would you like to do today?</label>
      <select id="choices">
        <option value="add">Add a task</option>
        <option value="complete">Complete a task</option>
        <option value="delete">Delete a task</option>
        <option value="edit">Edit a task</option>
        <option value="filter">Filter tasks</option>
        <option value="view">View tasks</option>
      </select>

      <button>Submit Choice</button>
    </div>
  );
}

export default App;
