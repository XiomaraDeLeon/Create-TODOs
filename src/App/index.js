import React from "react";
import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";
// import './App.css';

  // const defaultTodos = [
  //   {text: "cortar cebolla", completed: false},
  //   {text: "tomar curso", completed: false},
  //   {text: "llorar con la llorona", completed: false},
  // ]

function App() {
  return (
    <TodoProvider>
        <AppUI />
    </TodoProvider>
  )
}

export default App;