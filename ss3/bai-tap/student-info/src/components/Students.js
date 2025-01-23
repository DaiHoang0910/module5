import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Students extends Component {
    render() {
        const students = [
            {id: 1, name: "Hoàng Văn A", age: 21, address: "Gia Lai"},
            {id: 2, name: "Hoàng Văn B", age: 21, address: "Đà Nẵng"},
            {id: 3, name: "Hoàng Văn C", age: 21, address: "Thanh Hóa"},
            {id: 4, name: "Hoàng Văn D", age: 21, address: "TP.Hồ Chí Minh"},
            {id: 5, name: "Hoàng Văn E", age: 21, address: "Vũng Tàu"},
        ];
        return (
            <div className="container mt-4">
                <h1 className="text-center mb-4">Danh sách sinh viên</h1>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Tuổi</th>
                        <th>Địa chỉ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => {
                        return (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Students;