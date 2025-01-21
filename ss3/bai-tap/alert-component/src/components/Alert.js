import {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";

class Alert extends Component {
    render() {
        const { text } = this.props;
        return (
            <div className="alert alert-warning" role="alert">
                {text}
            </div>
        );
    }
}

export default Alert;