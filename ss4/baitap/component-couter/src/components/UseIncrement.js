import {useState} from "react";

export function UseIncrement(addAmount) {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount((prevCount) => prevCount + addAmount);
    };

    return [count, increase];
}
