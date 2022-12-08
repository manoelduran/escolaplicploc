import '../styles/room.css';
import { useNavigate, useParams } from "react-router-dom";
import { TeacherCard } from '../components/TeacherCard';
import { StudentCard } from '../components/StudentCard';
import { useStudents } from '../context/StudentsContext';
import { useTeachers } from '../context/TeachersContext';

function Room() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { deleteStudent, showStudent } = useStudents()
    const { deleteTeacher, showTeacher } = useTeachers()
    const teacher = {
        name: 'Teacher 1',
        cpf: '023.332.353-11',
        academic_title: 'Letras',
        subject: 'Português'
    }
    const students3 = [
        {
            id: '1',
            name: 'Student 1',
            cpf: '023.332.353-11',
            registration_number: '321312312',
            room: '1'
        },
        {
            id: '2',
            name: 'Student 2',
            cpf: '023.332.353-11',
            registration_number: '321312312',
            room: '1'
        },
        {
            id: '3',
            name: 'Student 3',
            cpf: '023.332.353-11',
            registration_number: '321312312',
            room: '1'
        }
    ]

    return (
        <div className="roomContainer">
            <div className="teacherContainer">
                <TeacherCard
                    teacher={teacher}
                    onShow={() => showTeacher(teacher?.id)}
                    onDelete={() => deleteTeacher(teacher?.id)}
                />
                <button className="addStudentButton" onClick={() => navigate(-1)}>Voltar</button>

            </div>
            <button className='headerButton' style={{ width: 'fit-content', alignSelf: 'flex-end' }} onClick={() => navigate(`/addEditStudent`)}>Criar Aluno</button>
            <div className='studentsContainer'>
                {students3.map((student, index) => (
                    <StudentCard
                        key={index}
                        student={student}
                        onShow={() => showStudent(student.id)}
                        onDelete={() => deleteStudent(student.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export { Room };