import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [todos, setTodos] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        axios
            .get("http://localhost:3001/todos")
            .then((response) => {
                setTodos(response.data);
                if (isFirstRender.current) {
                    toast.success("Todos loaded successfully!");
                    isFirstRender.current = false;
                }
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
                if (isFirstRender.current) {
                    toast.error("Failed to load todos.");
                    isFirstRender.current = false;
                }
            });
    }, []);

    const addTodo = (newTask) => {
        const todoData = {
            title: newTask,
            completed: false,
        };

        axios
            .post("http://localhost:3001/todos", todoData)
            .then((response) => {
                setTodos([response.data, ...todos]);
                toast.success("Todo added successfully!");
            })
            .catch((error) => {
                console.error("Error adding todo:", error);
                toast.error("Failed to add todo.");
            });
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>Todo List</h1>
            <TodoForm onAddTodo={addTodo} />
            <TodoList todos={todos} />
            <ToastContainer />
        </div>
    );
}

export default App;
