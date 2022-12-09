import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from '../context/StudentsContext';
import { fetchAPI } from '../service/api';
import '../styles/addEditStudentGrade.css';


function AddEditStudentGrade() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const { updateStudent } = useStudents();
    const [formValue, setFormValue] = useState({
        finalGrade: "",
    });
    const { finalGrade } = formValue;
    console.log(formValue);
    const showStudent = async (student_id) => {
        const selectedStudent = await fetchAPI(`/students/${student_id}`, "GET");
        const data = await selectedStudent.json();
        setFormValue(data);
    };
    useEffect(() => {
        if (id) {
            setEditMode(true);
            const selectedStudent = showStudent(id);
            setFormValue({ ...selectedStudent });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (finalGrade && editMode) {
            await updateStudent({ id, formValue });
            setEditMode(false);
            setTimeout(() => navigate("/"), 500);
            return;
        }
        console.log("event", formValue);
        await fetchAPI("/students", "POST", formValue);
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
                    <input type='text' name='finalGrade' placeholder='Nome' required value={finalGrade || ""} onChange={onInputChange} />

                    <button type='submit' className='addStudentButton' style={{ marginTop: 15 }}>{editMode ? "Editar" : "Criar"}</button>
                </form>
            </div>
        </div>
    );
};

export { AddEditStudentGrade };