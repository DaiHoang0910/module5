import logo from './logo.svg';
import './App.css';
import Counter from "./components/Couter";

function App() {
    return (
        <div>
            <h1>Counter App</h1>
            <Counter addAmount={1}/>
            <Counter addAmount={2}/>
        </div>
    );
}

export default App;
