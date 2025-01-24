import React from "react";

function TodoItem({ todo }) {
    return (
        <li style={{ marginBottom: "10px" }}>
            <span>{todo.title}</span>
        </li>
    );
}

export default TodoItem;
