import React from "react";
import {useIncrement} from "./useIncrement";

function Counter({addAmount}) {
    const [count, increase] = useIncrement(addAmount);

    return (
        <div style={{margin: "20px"}}>
            <h2>Counter {addAmount}</h2>
            <p>Count: {count}</p>
            <button onClick={increase}>Add {addAmount}</button>
        </div>
    );
}

export default Counter;