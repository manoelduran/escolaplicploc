import { useEffect, useState } from 'react';
import { fetchAPI } from '../../service/api';
import './roomCard.css';


function RoomCard({ classRoom, onClick }) {
    const [teacher, setTeacher] = useState({})
    const showTeacher = async (teacher_id) => {
        console.log('teacher_id', teacher_id)
        const selectedTeacher = await fetchAPI(`/teachers/${teacher_id}`, 'get')
        const data = await selectedTeacher.json()
        console.log('teachersData', data)
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