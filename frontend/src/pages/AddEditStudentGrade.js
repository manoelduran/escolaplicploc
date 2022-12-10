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
        student_id: ""
    });
    const { finalGrade  } = formValue;
    const showReportCard = async () => {
        console.log('student_id', id)
        const selectedStudent = await fetchAPI(`/reportcards/${Number(id)}`, "GET");
        const data = await selectedStudent.json();
        console.log('data', data)
        setFormValue(data);
    };
    useEffect(() => {
        if (id) {
            setEditMode(true);
            const selectedStudent = showReportCard(id);
            console.log('selectedStudent', selectedStudent)
            setFormValue({ ...selectedStudent });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchAPI(`/reportcards/`, "POST", {finalGrade: finalGrade, student_id: id});
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
                <h1 className="addStudentTitle"> Adicione uma nota a este estudante:</h1>
                <button className="addStudentButton" onClick={() => navigate(-1)}>Voltar</button>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input type='number' name='finalGrade' placeholder='Nota' required value={finalGrade || ""} onChange={onInputChange} />

                    <button type='submit' className='addStudentButton' style={{ marginTop: 15 }}>Adicionar</button>
                </form>
            </div>
        </div>
    );
};

export { AddEditStudentGrade };