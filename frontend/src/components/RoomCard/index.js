import { useEffect } from 'react';
import { useTeachers } from '../../context/TeachersContext';
import './roomCard.css';


function RoomCard({ classRoom, onClick }) {
    const { teacher, showTeacher } = useTeachers();
    
    useEffect(() => {
        showTeacher(classRoom.teacher_id)
    }, [])
    return (
        <div className="cardContainer">
            <h1>Matéria: {classRoom?.subject}</h1>
            <h4>Professor: {teacher?.name}</h4>
            <span>Formação: {teacher?.academictitle}</span>
            <button className="enterButton" onClick={onClick}>Entrar</button>
        </div>
    );
};

export { RoomCard };