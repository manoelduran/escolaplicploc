import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from '../context/StudentsContext';
import '../styles/addEditStudent.css';

const initialState = {
    name: "",
    cpf: "",
    room: "1",
    registration_number: "",
};

function AddEditStudent() {
    const { id } = useParams();
    const { createStudent, updateStudent, showStudent } = useStudents()
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [formValue, setFormValue] = useState(initialState);
    const { name, cpf, room, registration_number } = formValue;

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const selectedStudent = showStudent(id)
            setFormValue({ ...selectedStudent });
        }
    }, [id, showStudent]);


    const handleSubmit = async  (event) => {
        event.preventDefault();
        console.log('aq')
        if (name && cpf && room && registration_number && editMode) {
            await updateStudent({ id, formValue })
            setEditMode(false);
            setTimeout(() => navigate("/"), 500);
            return;
        };
       await createStudent(formValue);
        setTimeout(() => navigate("/"), 500);
    };

    const onInputChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });

    };

    return (
        <div className="addStudentContainer">
            <div className="addStudentInfo">
                <h1 className="addStudentTitle"> {editMode ? `Edite o estudante:` : "Cadastre um estudante:"}</h1>
                <button className="addStudentButton" onClick={() => navigate(-1)}>Voltar</button>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Nome' required value={name || ""} onChange={onInputChange} />
                    <input type='cpf' name='cpf' title='CPF' placeholder='CPF' required value={cpf || ""} onChange={onInputChange} />
                    <input type='text' name='registration_number' title='Matrícula' placeholder='Número de Matrícula' required value={registration_number || ""} onChange={onInputChange} />
                    <input type='text' name='room' title='Sala' placeholder='Sala' required value={room || ""} onChange={onInputChange} />
                    <button type='submit'  className='addStudentButton' style={{ marginTop: 15 }}>{editMode ? "Editar" : "Criar"}</button>
                </form>
            </div>
        </div>
    );
};

export { AddEditStudent };