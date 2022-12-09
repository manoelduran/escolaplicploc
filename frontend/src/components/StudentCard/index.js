import React from 'react';
import './studentCard.css';


function StudentCard({student, onShow, onDelete}) {
    console.log('student', student)
    return (
        <div className="studentCardContainer">
            <h1>Aluno: {student.name}</h1>
            <div className='teacherButtonContainer'>
            <button className="enterButton" onClick={onShow}>Visualizar</button>
            <button className="enterButton" onClick={onDelete}>Deletar</button>
            </div>
        </div>
    );
};

export {StudentCard};