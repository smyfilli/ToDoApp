//import React, { useState, useEffect } from "react";

import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <TaskFilter />
      <TaskList />
    </div>
  );
}
