import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos }) {
    return (
        <ul style={{ marginTop: "20px" }}>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;
