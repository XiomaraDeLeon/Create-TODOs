import React from "react";
import { useLocalStorage } from "../App/useLocalStorage";

const TodoContext = React.createContext()

function TodoProvider(props){
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage("TODOs_V1", []);
      const [state, setState] = React.useState("");
      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = todos.filter((todo) => !!todo.completed).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];
    
      if(!state.length >= 1){
        searchedTodos = todos;
      }
      else{
        searchedTodos = todos.filter((todo) => {
          const todoText = todo.text.toLowerCase();
          const searchText = state.toLowerCase();
          return todoText.includes(searchText);
        })
      }
    

      const addTodos = (text) => {
        const newTodos = [...todos]
        newTodos.push({
          completed: false,
          text,
        });
        saveTodos(newTodos);
      }

      const completeTodos = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
    
        const newTodos = [...todos]
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
      }
      
      // const deleteTodos = (text) => {
      //   const todoIndex = todos.findIndex(todo => todo.text === text);
      //   const newTodos = [...todos]
      //   newTodos.splice(todoIndex, 1)
      //   saveTodos(newTodos);
      // }
    
      const deleteTodos = (text) => {
        const todoIndex = todos.filter((todo) => todo.text !== text)
        saveTodos(todoIndex)
      }
    return (
        <TodoContext.Provider value ={{
            error,
            loading,
            totalTodos,
            completedTodos,
            state,
            setState,
            searchedTodos,
            completeTodos,
            addTodos,
            deleteTodos,
            openModal,
            setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider}
