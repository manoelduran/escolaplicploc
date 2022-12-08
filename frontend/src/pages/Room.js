import React, { useEffect, useState } from 'react';
import '../styles/room.css';
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from '../service/api';
import { TeacherCard } from '../components/TeacherCard';
import { StudentCard } from '../components/StudentCard';
import { useStudents } from '../context/StudentsContext';


function Room() {
    const { id } = useParams();
    console.log('id', id)
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({})
    const { deleteStudent, showStudent, students } = useStudents()
    const fetchTeacher = async (id) => {
        const response = await fetchAPI(`/teachers/${Number(id)}`, 'GET')
        const teachersData = await response.json()
        console.log('selectedTeacher', teachersData)
        setTeacher(teachersData)
    }

    const handleShowTeacher = async (id) => {
        //  const selectedTeacher = await fetchAPI(`/teachers/${id}`, 'get')
        //const data = await selectedTeacher.json()
        //console.log('teachersData', data)
        navigate(`/showTeacher/${id}`)
    }
    const handleDeleteTeacher = async (id) => {
        await fetchAPI(`/teachers/${id}`, 'delete')
        navigate('/')
    }
    useEffect(() => {
        fetchTeacher()
    }, [id])
    console.log('teacher', teacher)
    return (
        <div className="roomContainer">
            <div className="teacherContainer">
                <TeacherCard
                    teacher={teacher}
                    onShow={() => handleShowTeacher(teacher.id)}
                    onDelete={() => handleDeleteTeacher(teacher.id)}
                />
                <button className="addStudentButton" onClick={() => navigate(-1)}>Voltar</button>

            </div>
            <button className='headerButton' style={{ width: 'fit-content', alignSelf: 'flex-end' }} onClick={() => navigate(`/addEditStudent`)}>Criar Aluno</button>
            <div className='studentsContainer'>
                {students.map((student, index) => (
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