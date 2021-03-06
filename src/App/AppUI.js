import React from "react";
import { TodoContext } from "../TodoContext";
import {TodoCounter} from "../TodoCounter";
import {TodoSearch} from "../TodoSerch";
import {TodoList} from "../TodoList";
import {TodoItem} from "../TodoItem";
import { TodoForm } from "../formulario";
import {CreateTodoButton} from "../CreateTodoButton/CreateTodoButton";
import {Modal} from "../modal"
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';

function AppUI(){
    const {
        error, 
        loading, 
        searchedTodos, 
        completeTodos,
        deleteTodos,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext)

    return(
        <React.Fragment>
            <TodoCounter />
            <TodoSearch />
                <TodoList>
                {error && <TodosError />}
                {loading && <TodosLoading />}
                {(!loading && !searchedTodos.length) && <EmptyTodos />}

                {searchedTodos.map(todo => (
                    <TodoItem 
                    key={todo.text} 
                    text={todo.text}
                    completed={todo.completed}
                    onComplete={() => completeTodos(todo.text)}
                    onDelete={() => deleteTodos(todo.text)}
                    />
                ))}
                </TodoList>
            
            {!!openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}
            <CreateTodoButton 
                setOpenModal={setOpenModal}
            />
            
        </React.Fragment>
    );
}

export {AppUI}