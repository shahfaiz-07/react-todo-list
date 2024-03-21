import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todoList : [],
    addTodo: (msg) => { },
    updateTodo: (msg, time, id) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
})

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}