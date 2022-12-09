import React, { useEffect, useState } from "react";
import { fetchAPI } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/teacherProfile.css';

function TeacherProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('id', id)
    const [teacher, setTeacher] = useState({});
    const fetchTeacher = async (id) => {
        const response = await fetchAPI(`/teachers/${Number(id)}`, 'GET')
        const teachersData = await response.json()
        console.log('selectedTeacher', teachersData)
        setTeacher(teachersData)
    }
    useEffect(() => {
        fetchTeacher(id)
    }, [id])
    return (
        <div className='teacherProfileContainer'>
            <div className="teacherProfileInfoContainer">
                <h1 className='teacherTitle'>Informações do Professor:</h1>
                <h4 className='teacherName'>Nome: {teacher.name}</h4>
                <h4 className='teacherCPF'>CPF: {teacher.cpf}</h4>
                <h4 className='teacherAcademicTitle'>Título Acadêmico: {teacher.academicTitle}</h4>
                <h4 className='teacherDiscipline'>Disciplina: {teacher.discipline}</h4>
            </div>
            <div className='buttonsDiv'>
                    <button className="addStudentButton" onClick={() => navigate(`/AddEditTeacher/${teacher.id}`)}>Editar Professor</button>
                    <button className="classRoomButton" onClick={() => navigate(-1)}>Voltar</button>
                </div>
        </div>
    );
}

export { TeacherProfile };