import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function StudentRow({ student }) {
    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.point}</td>
            <td>{student.address}</td>
        </tr>
    );
}

function StudentTable({ students }) {
    return (
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Điểm</th>
                <th>Địa chỉ</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                <StudentRow key={student.id} student={student} />
            ))}
            </tbody>
        </table>
    );
}

function StudentList() {
    const name = "c08";
    const students = [
        {
            id: 1,
            name: "Trương Tấn Hải",
            point: 9,
            address: "Quảng Nam",
        },
        {
            id: 2,
            name: "Nguyễn Văn A",
            point: 7,
            address: "Đà Nẵng",
        },
    ];

    return (
        <div className="container mt-4">
            <h1 className="text-center text-primary">
                Danh sách học sinh {name}
            </h1>
            <StudentTable students={students} />
        </div>
    );
}

export default StudentList;
