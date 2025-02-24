import React, {useState, useEffect} from 'react';
import "./App.css"

const App = () => {
    const [firstName, setFirstName] = useState(localStorage.getItem('classFirstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('classLastName') || '');

    useEffect(() => {
        localStorage.setItem('classFirstName', firstName);
        localStorage.setItem('classLastName', lastName);
    }, [firstName, lastName]);

    return (
        <div>
            Nhập họ: <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br />
            Nhập tên: <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <p>
                Hello, <span className="name">{firstName} {lastName}</span> !
            </p>
        </div>
    );
}
export default App;
