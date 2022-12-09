import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {fetchAPI} from '../service/api';
import '../styles/teacherProfile.css';

function StudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('id', id)
    const [student, setStudent] = useState({});
    const fetchStudent = async (id) => {
        const response = await fetchAPI(`/teachers/${Number(id)}`, 'GET')
        const studentData = await response.json()
        console.log('selectedTeacher', studentData)
        setStudent(studentData)
    }
    useEffect(() => {
        fetchStudent(id)
    }, [id])
    return (
        <div className='studentProfileContainer'>
            <div className="studentProfileInfoContainer">
                <h1 className='studentTitle'>Informações do Professor:</h1>
                <h4 className='studentName'>Nome: {student.name}</h4>
                <h4 className='studentCPF'>CPF: {student.cpf}</h4>
                <h4 className='studentAcademicTitle'>Título Acadêmico: {student.academicTitle}</h4>
                <h4 className='studentDiscipline'>Disciplina: {student.discipline}</h4>
            </div>
            <div className='buttonsDiv'>
                    <button className="addStudentButton" onClick={() => navigate(`/AddEditstudent/${student.id}`)}>Editar Estudante</button>
                    <button className="classRoomButton" onClick={() => navigate(-1)}>Voltar</button>
                </div>
        </div>
    );
}

export {StudentProfile};