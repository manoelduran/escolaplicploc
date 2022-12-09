import React from 'react';
import './TeacherCard.css';


function TeacherCard({ teacher, onShow, onDelete }) {

    return (
        <div className="teacherCardContainer">
            <h1>Disciplina: {teacher.discipline}</h1>
            <h4>Professor: {teacher.name}</h4>
            <div className='teacherButtonContainer'>
                <button className="enterButton" onClick={onShow}>Visualizar</button>
                <button className="enterButton" onClick={onDelete}>Deletar</button>
            </div>
        </div>
    );
};

export { TeacherCard };