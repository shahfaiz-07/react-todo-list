import {useState} from "react";
import { useTodo } from "../context/TodoContext";

const TodoItem = ({todo}) => {
    const [editable, setEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.msg);
    const [todoTime, setTodoTime] = useState(todo.time)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()
    const updateMsg = () => {
        updateTodo(todoMsg, todoTime, todo.id);
        setEditable(false)
    }
    const toggleDone = () => {
        toggleComplete(todo.id)
    }
    
    return (
        <div className="w-full flex flex-col lg:flex-row justify-between rounded-lg px-2 my-4 gap-1">
            <div className="flex grow">
                <div className="inline-block">
                    <div className="flex items-center my-2 cursor-pointer">
                        <input
                            type="checkbox"
                            id="A3-yes"
                            name="A3-confirmation"
                            defaultValue="yes"
                            className="opacity-0 absolute h-6 w-6 md:h-8 md:w-8"
                            checked={todo.completed}
                            onChange={toggleDone}
                        />
                        <div className="bg-transparent border-2 rounded-full border-green-400 h-6 w-6 md:h-8 md:w-8 flex flex-shrink-0 justify-center items-center focus-within:border-[#3A9162]">
                            <svg
                                className="fill-current hidden w-3 h-3 text-[#181717] pointer-events-none"
                                version="1.1"
                                viewBox="0 0 17 12"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g fill="none" fillRule="evenodd">
                                    <g
                                        transform="translate(-9 -11)"
                                        fill="#181717"
                                        fillRule="nonzero"
                                    >
                                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    className={`${
                        editable ? "bg-gray-700" : "bg-transparent"
                    } py-1 px-2 sm:py-2 sm:px-3 md:px-5 text-base md:text-2xl grow shrink mx-2 sm:mx-4 rounded-lg outline-none ${
                        todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-300"
                    }`}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    value={todoMsg}
                    readOnly={!editable}
                />
            </div>
            <div className="flex lg:flex-row items-center gap-x-3 justify-between w-full lg:w-fit">
                <div className="inline-block text-gray-200">
                    <input
                        type="datetime-local"
                        value={todoTime}
                        onChange={(e) => setTodoTime(e.target.value)}
                        disabled={!editable}
                        className={`${
                            editable ? "bg-gray-700" : "bg-transparent"
                        } p-1 sm:p-2 rounded-md outline-none text-sm sm:text-base md:text-lg lg:text-xl`}
                    />
                </div>
                <div className="flex justify-between gap-3 md:gap-5">
                    <button
                        className="text-gray-200 sm:text-xl md:text-3xl cursor-pointer"
                        onClick={() => {
                            if (!todoMsg) return;
                            if (editable) updateMsg();
                            else setEditable((prev) => !prev);
                        }}
                        disabled={todo.completed}
                    >
                        <i
                            className={`ri-pencil-line ${
                                editable ? "hidden" : ""
                            }`}
                        />
                        <i
                            className={`ri-save-line ${
                                editable ? "" : "hidden"
                            }`}
                        ></i>
                    </button>
                    <button
                        className="text-red-600 text-xl md:text-3xl cursor-pointer"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <i className={`ri-delete-bin-line`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
