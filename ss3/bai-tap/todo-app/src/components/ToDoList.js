import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react";


class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: "",
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9\s]*$/;

        if (regex.test(value)) {
            this.setState({item: value});
        }
    };
    handleAddItem = () => {
        const {item, list} = this.state;

        if (item.trim() !== "") {
            this.setState({
                list: [...list, item],
                item: ""
            });
        }
    };

    render() {
        const {list, item} = this.state;
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Todo List</h1>
                <div className="d-flex justify-content-center mb-4">
                    <input type="text" value={item} onChange={(event) => this.handleChange(event)}
                           placeholder="Enter a new item"/>
                    <button className="btn btn-primary" onClick={this.handleAddItem}>Add</button>
                </div>
                <div>
                    <p><strong>List</strong></p>
                    <ul className="list-group">
                        {list.map((todo, index) => (
                            <li className="list-group-item" key={index}>{todo}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ToDoList;