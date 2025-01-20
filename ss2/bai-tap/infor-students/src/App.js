import './App.css';

const students = [
  {
    company: 'Alfreds Futterkiste',
    contact: 'Maria Anders',
    country: 'Germany'
  },
  {
    company: 'Centro comercial Moctezuma',
    contact: 'Francisco Chang',
    country: 'Mexico'
  },
  {
    company: 'Ernst Handel',
    contact: 'Roland Mendel',
    country: 'Austria'
  },
  {
    company: 'Island Trading',
    contact: 'Helen Bennett',
    country: 'UK'
  },
  {
    company: 'Laughing Bacchus Winecellars',
    contact: 'Yoshi Tannamuri',
    country: 'Canada'
  },
  {
    company: 'Magazzini Alimentari Riuniti',
    contact: 'Giovanni Rovelli',
    country: 'Italy'
  }
];

const StudentRow = ({ student }) => (
    <tr>
      <td>{student.company}</td>
      <td>{student.contact}</td>
      <td>{student.country}</td>
    </tr>
);

const StudentTable = ({ students }) => (
    <table border="1">
      <thead>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      </thead>
      <tbody>
      {students.map((student, index) => (
          <StudentRow key={index} student={student} />
      ))}
      </tbody>
    </table>
);

const App = () => (
    <div>
      <h1>Student</h1>
      <StudentTable students={students} />
    </div>
);

export default App;
