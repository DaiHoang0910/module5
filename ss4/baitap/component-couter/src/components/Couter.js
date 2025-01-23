import React from "react";
import {UseIncrement} from "./UseIncrement";

function Counter({addAmount}) {
    const [count, increase] = UseIncrement(addAmount);

    return (
        <div style={{margin: "20px"}}>
            <h2>Counter {addAmount}</h2>
            <p>Count: {count}</p>
            <button onClick={increase}>Add {addAmount}</button>
        </div>
    );
}

export default Counter;