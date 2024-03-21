import { TodoForm, TodoItem } from "./components";
import { useEffect, useState } from "react";
import { TodoContextProvider, useTodo } from "./context/TodoContext";
export default function App() {
    const [todoList, setTodoList] = useState([]);

    const addTodo = (msg, time) => {
        setTodoList((prev) => [
            { id: Date.now(), msg, completed: false, time },
            ...prev,
        ]);
    };
  const deleteTodo = (id) => {
    setTodoList((prev) =>
      prev.filter((eachTodo) => eachTodo.id !== id
      ))
    };
    const updateTodo = (newmsg, time, id) => {
        setTodoList((prev) => 
          prev.map((eachTodo) => {
            if (eachTodo.id === id) {
              return { ...eachTodo, msg: newmsg, time };
            }
            return eachTodo;
          })
        );
    };
    const toggleComplete = (id) => {
        setTodoList((prev) =>
            prev.map((eachTodo) => {
                if (eachTodo.id === id) {
                    return { ...eachTodo, completed: !eachTodo.completed };
                }
                return eachTodo;
            })
        );
    };

    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem("todoList"));
        if (todoList && todoList.length > 0) {
            setTodoList(todoList);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <TodoContextProvider
            value={{
                todoList,
                addTodo,
                deleteTodo,
                updateTodo,
                toggleComplete,
            }}
        >
            <div className="min-h-screen bg-[#181717] py-8 px-5 md:px-32">
                <h1 className="text-3xl font-extrabold md:text-5xl my-3 md:my-6">
                    <span className="bg-gradient-to-r from-[#FD42B1] to-[#3792FC] bg-clip-text text-transparent">
                        ToDo List
                    </span>
                </h1>
                <TodoForm />
                <div id="todo-container" className="my-6 w-full">
                    {todoList.map((eachTodo) => (
                        <div key={eachTodo.id} className="w-full">
                            <TodoItem todo={eachTodo} />
                        </div>
                    ))}
                </div>
            </div>
        </TodoContextProvider>
    );
}
