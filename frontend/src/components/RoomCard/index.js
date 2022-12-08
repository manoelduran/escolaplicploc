import { useEffect, useState } from 'react';
import { fetchAPI } from '../../service/api';
import './roomCard.css';


function RoomCard({ classRoom, onClick }) {
    const [teacher, setTeacher] = useState({})
    const showTeacher = async (teacher_id) => {
        const selectedTeacher = await fetchAPI(`/teachers/${Number(teacher_id)}`, 'get')
        const data = await selectedTeacher.json()
        setTeacher(data)
    }
    
    useEffect(() => {
        showTeacher(classRoom.teacher_id)
    }, [classRoom])
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