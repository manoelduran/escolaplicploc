import React from 'react';
import './roomCard.css';


function RoomCard({ classRoom, onClick }) {
    return (
        <div className="cardContainer">
            <h1>Matéria: {classRoom?.subject}</h1>
            <h4>Professor: {classRoom.teacher.name}</h4>
            <span>Título Acadêmico: {classRoom.teacher.academicTitle}</span>
            <button className="enterButton" onClick={onClick}>Entrar</button>
        </div>
    );
};

export { RoomCard };