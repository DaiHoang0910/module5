const StudentTable = ({students}) => (
    <table border="1">
        <thead>
        <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
        </tr>
        </thead>
        <tbody>
        {students.map((student, id) => (
            <StudentRow key={id} student={student}/>
        ))}
        </tbody>
    </table>
);