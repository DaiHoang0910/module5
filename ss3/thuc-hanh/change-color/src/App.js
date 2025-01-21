import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: "black"
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({color: "pink"});
        }, 5000);
    }

    render() {
        return (
            <div>
                <div style={{
                    backgroundColor: this.state.colors,
                    paddingTop: 20,
                    width: 400,
                    height: 80,
                    margin: "auto"
                }}>

                </div>
            </div>
        );
    }
}

export default App;