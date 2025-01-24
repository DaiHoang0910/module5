import React, { useState } from "react";
import { toast } from "react-toastify";

function TodoForm({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = () => {
        if (!newTodo.trim()) {
            toast.warning("Please enter a todo task!");
            return;
        }

        onAddTodo(newTodo);
        setNewTodo("");
    };

    return (
        <div>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new task"
                style={{ padding: "10px", width: "calc(100% - 120px)", marginRight: "10px" }}
            />
            <button onClick={handleSubmit} style={{ padding: "10px" }}>
                Submit
            </button>
        </div>
    );
}

export default TodoForm;
