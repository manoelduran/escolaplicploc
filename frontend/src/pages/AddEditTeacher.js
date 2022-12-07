import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/addEditTeacher.css';

const initialState = {
    name: "",
    cpf: "",
    room: "",
    registration_number: "",
};

function AddEditTeacher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [formValue, setFormValue] = useState(initialState);
    const { name, cpf, room, registration_number } = formValue;

    useEffect(() => {
        if (id) {
            setEditMode(true);
            // setFormValue({ ...selectedTeacher });
        }
    }, [id]);


    const handleSubmit = (event) => {
        console.log('event', event)
        event.preventDefault();
        if (name && cpf && room && registration_number && editMode) {
            // updateTeacher({ id, formValue })
            setEditMode(false);
            setTimeout(() => navigate("/"), 500);
            return;
        };
        //  createTeacher(formValue);
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
                    <input type='cpf' name='cpf' title='CPF' placeholder='CPF' required value={cpf || ""} onChange={onInputChange} />
                    <input type='text' name='registration_number' title='Matrícula' placeholder='Número de Matrícula' required value={registration_number || ""} onChange={onInputChange} />
                    <input type='text' name='room' title='Sala' placeholder='Sala' required value={room || ""} onChange={onInputChange} />
                    <button type='submit' className='addStudentButton' style={{ marginTop: 15 }}>{editMode ? "Editar" : "Criar"}</button>
                </form>
            </div>
        </div>
    );
}

export { AddEditTeacher };