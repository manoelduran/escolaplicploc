import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAPI } from '../service/api';
import { RoomCard } from "../components/RoomCard";
import '../styles/classRooms.css';

function ClassRooms() {
    const navigate = useNavigate();
    const [classRooms, setClassRooms] = useState([]);
    console.log('classRooms', classRooms)
    const fetchRooms = async () => {
        const response = await fetchAPI("/classrooms", 'get')
        const classRoomsData = await response.json()
        console.log('roomsData', classRoomsData)
        setClassRooms(classRoomsData)
    }
    useEffect(() => {
        fetchRooms()
    }, [])
    const handleClick = (classRoom) => {
        navigate(`/classRooms/${classRoom.id}`)
    }
    return (
        <div className="classRoomsContainer">
            <div className="classRoomInfo">
                <h1 className="classRoomTitle">Selecione uma turma:</h1>
                <div className='buttonsDiv'>
                    <button className="addStudentButton" onClick={() => navigate(`/AddEditTeacher`)}>Adicionar Professor</button>
                    <button className="classRoomButton" onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </div>
            <div className="mapContainer">
                {
                    classRooms.length === 0 ?
                        (
                            <h1 style={{ width: '100%', height: '100%', display: 'flex', alignSelf: 'center', justifySelf: 'center' }} >Crie o professor com sua disciplina para gerar uma turma da matéria</h1>
                        ) : classRooms.map((classRoom, index) => (
                            <RoomCard
                                key={index}
                                classRoom={classRoom}
                                onClick={() => handleClick(classRoom)}
                            />
                        ))

                }

            </div>
        </div>
    );
};

export { ClassRooms };