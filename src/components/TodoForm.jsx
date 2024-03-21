import { useEffect, useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
    const getTime = () => {
        const currDate = new Date();
        let date = currDate.getDate();
        date = date < 10 ? `0${date}` : date;
        let month = currDate.getMonth();
        month = month < 10 ? `0${month}` : month;
        let year = currDate.getFullYear();
        let hours = currDate.getHours();
        hours = hours < 10 ? `0${hours}` : hours;
        let minutes = currDate.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${year}-${month}-${date}T${hours}:${minutes}`;
    }
    const [todoVal, setTodoVal] = useState("")
    const [time, setTime] = useState(getTime)
    const { addTodo } = useTodo()
    const add = (e) => {
        e.preventDefault()
        if (!todoVal) return;
        addTodo(todoVal, time)
        setTodoVal("")
    }
    return (
        <div className="w-full rounded-lg bg-[#2E2E2E] flex items-center">
            <form
                onSubmit={add}
                className="flex w-full items-center justify-between p-2 md:px-4"
            >
                <div className="flex flex-col lg:items-center lg:flex-row md:pr-5 grow">
                    <input
                        type="text"
                        placeholder="Add Task..."
                        maxLength={30}
                        value={todoVal}
                        onChange={(e) => setTodoVal(e.target.value)}
                        className="h-full p-2 md:p-4 bg-transparent  md:text-2xl text-gray-300 grow outline-none"
                    />
                    <div>
                        <input
                            type="datetime-local"
                            className="bg-transparent text-sm md:text-2xl w-min text-[#3792FC] px-2 outline-none"
                            name="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:text-4xl text-[#3792FC]">
                    <button
                        className="rounded-full text-3xl md:text-5xl"
                        type="submit "
                    >
                        <i className="ri-add-box-fill flex items-center"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
