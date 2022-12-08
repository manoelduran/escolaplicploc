import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTeachers } from '../context/TeachersContext';
import { fetchAPI } from '../service/api';
import '../styles/addEditTeacher.css';

const initialState = {
    name: "",
    CPF: "",
    academicTitle: "",
    discipline: ""
};

function AddEditTeacher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const {updateTeacher, createTeacher} = useTeachers();
    const [formValue, setFormValue] = useState(initialState);
    const { name, CPF, academicTitle, discipline } = formValue;
    const showTeacher = async (teacher_id) => {
        console.log('teacher_id', teacher_id)
        const selectedTeacher = await fetchAPI(`/teachers/${teacher_id}`, 'get')
        const data = await selectedTeacher.json()
        console.log('teachersData', data)
        setFormValue(data)
    }
    useEffect(() => {
        if (id) {
            setEditMode(true);
            const selectedTeacher = showTeacher(id)
            setFormValue({ ...selectedTeacher });
        }
    }, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name && CPF && academicTitle && discipline && editMode) {
           await updateTeacher({ id, formValue })
            setEditMode(false);
            setTimeout(() => navigate("/"), 500);
            return;
        };
        console.log('event', formValue)
       await fetchAPI("/teachers", 'post', event)
        setTimeout(() => navigate("/"), 500);
    };

    const onInputChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });

    };
    return (
        <div className="addTeacherContainer">
            <div className="addTeacherInfo">
                <h1 className="addTeacherTitle">Cadastre um professor:</h1>
                <button className="addTeacherButton" onClick={() => navigate(-1)}>Voltar</button>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Nome' required value={name || ""} onChange={onInputChange} />
                    <input type='cpf' name='CPF' title='CPF' placeholder='CPF' required value={CPF || ""} onChange={onInputChange} />
                    <input type='text' name='academicTitle' title='Título Acadêmico' placeholder='Título Acadêmico' required value={academicTitle || ""} onChange={onInputChange} />
                    <input type='text' name='discipline' title='Disciplina' placeholder='Disciplina' required value={discipline || ""} onChange={onInputChange} />
                    <button type='submit' className='addStudentButton' style={{ marginTop: 15 }}>{editMode ? "Editar" : "Criar"}</button>
                </form>
            </div>
        </div>
    );
}

export { AddEditTeacher };