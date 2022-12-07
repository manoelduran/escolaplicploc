import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from "../context/StudentsContext";
import { useTeachers } from "../context/TeachersContext";


function Room() {
    const {id} = useParams();
    const {navigate} = useNavigate();
    const teacher = {
        name: 'Teacher 1',
        cpf: '023.332.353-11',
        academic_title: 'Letras',
        subject: 'Português'
    }
    const students = [
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

    const handleShowTeacher = (teacher) => {
        navigate()
    }
    return (
        <div className="roomContainer">
           <div className="teacherContainer">
            <TeacherCard
            teacher={teacher}
            onClick={handleShowTeacher}
            />
           </div>
        </div>
    );
};

export {Room};