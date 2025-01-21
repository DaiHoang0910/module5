import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            form: {name: "", phone: "", email: ""},
            isValid: false,
            indexSelected: -1
        };
    };

    handleChange = (event) => {
        this.setState((state) => {
            const form = state.form
            form[event.target.name] = event.target.value;
            return {form}
        }, () => this.checkValidForm())
    };
    handleSelect = (studentSelected, index) => {
        this.setState({
            form: JSON.parse(JSON.stringify(studentSelected)),
            indexSelected: index
        })
    };
    checkValidForm = () => {
        const {name, phone, email} = this.state.form
        const value = name && phone && email
        this.setState({
            inValid: value
        })
    };
    handleSubmit = () => {
        if(this.state.isValid) {
            const newList = this.state.studentList
            if(this.state.indexSelected > -1) {

            }else{

            }
            this.setState({})
        }
    }
}