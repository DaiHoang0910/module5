import {Component} from "react";

class ConditionalRendering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false
        }
    }

    toggleExpand = () => {
        this.setState((prevState) => ({
            isExpand: !prevState.isExpand,
        }));
    }

    render() {
        const {isExpand} = this.state;
        return (
            <div>
                <h1>Conditional Rendering</h1>
                {isExpand ? (
                    <div>
                        <button onClick={this.toggleExpand}>Đóng giới thiệu</button>
                        <p><strong>Giới thiệu</strong></p>
                        <p>Trong ReactJS, đôi khi bạn có một số component và tùy thuộc vào từng điều kiện ví dụ như
                        trạng thái của state,props,... mà bạn muốn hiển thị một hoặc một số component nào đó. Khi
                        đó bạn có thể sử dụng Conditional Rendering để render ra component mà bạn mong muốn.</p>
                    </div>
                ) : (
                    <button onClick={this.toggleExpand}>Xem giới thiệu</button>
                )}
            </div>
        )
    }
}

export default ConditionalRendering;