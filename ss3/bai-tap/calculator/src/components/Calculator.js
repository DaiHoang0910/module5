import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Calculator.css"

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num1: "",
            num2: "",
            result: null,
            error: "",
        };
    }

    handleCalculate = (operator) => {
        const {num1, num2} = this.state;
        const number1 = parseInt(num1);
        const number2 = parseInt(num2);

        if (isNaN(number1) || isNaN(number2)) {
            this.setState({result: null, error: "Vui lòng nhập số"});
            return;
        }

        let calResult;
        let calError = "";
        switch (operator) {
            case "+":
                calResult = number1 + number2;
                break;
            case "-":
                calResult = number1 - number2;
                break;
            case "*":
                calResult = number1 * number2;
                break;
            case "/":
                if (number2 === 0) {
                    calError = "Không thể chia cho số 0, vui lòng nhập lại!";
                    calResult = null;
                } else {
                    calResult = number1 / number2;
                }
                break;
            default:
                calResult = "Phép tính không hợp lệ";
        }
        this.setState({result: calResult, error: calError});
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            this.setState({[name]: value, error: ''});
        } else {
            this.setState({error: "Chỉ được phép nhập số!"});
        }
    };

    render() {
        const {num1, num2, result, error} = this.state;

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white text-center">
                                <h3>Máy tính đơn giản</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <input type="text" name="num1" className="form-control" placeholder="Nhập số thứ nhất" value={num1} onChange={this.handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="num2" className="form-control" placeholder="Nhập số thứ hai" value={num2} onChange={this.handleChange}/>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => this.handleCalculate('+')}>+</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => this.handleCalculate('-')}>-</button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => this.handleCalculate('*')}>*</button>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => this.handleCalculate('/')}>/</button>
                                </div>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <h5 className="text-center mt-4">
                                    Kết quả: <strong>{result !== null ? result : '---'}</strong>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export default Calculator;