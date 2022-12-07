import { useNavigate } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import '../styles/classRooms.css';

function ClassRooms() {
    const navigate = useNavigate();
    const rooms = [
        {
            id: '1',
            subject: 'Português',
            room: '1',
            teacher: {
                name: 'Teacher 1',
                cpf: '023.332.353-11',
                academic_title: 'Letras',
                subject: 'Português'
            },
            students: [
                {
                    id: '1',
                    name: 'Student 1',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '1'
                },
                {
                    id: '2',
                    name: 'Student 2',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '1'
                },
                {
                    id: '3',
                    name: 'Student 3',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '1'
                }
            ]
        },
        {
            id: '2',
            subject: 'Inglês',
            room: '2',
            teacher: {
                name: 'Teacher 2',
                cpf: '023.332.353-11',
                academic_title: 'Letras',
                subject: 'Inglês'
            },
            students: [
                {
                    id: '1',
                    name: 'Student 4',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '2'
                },
                {
                    id: '2',
                    name: 'Student 5',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '2'
                },
                {
                    id: '3',
                    name: 'Student 6',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '2'
                }
            ]
        },
        {
            id: '2',
            subject: 'Religião',
            room: '3',
            teacher: {
                name: 'Teacher 2',
                cpf: '023.332.353-11',
                academic_title: 'Letras',
                subject: 'Religião'
            },
            students: [
                {
                    id: '1',
                    name: 'Student 7',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '3'
                },
                {
                    id: '2',
                    name: 'Student 8',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '3'
                },
                {
                    id: '3',
                    name: 'Student 9',
                    cpf: '023.332.353-11',
                    registration_number: '321312312',
                    room: '3'
                }
            ]
        }
    ];

    const handleClick = (room) => {
        navigate(`/classRooms/${room.room}`)
    }
    return (
        <div className="classRoomsContainer">
            <div className="classRoomInfo">
                <h1 className="classRoomTitle">Selecione uma turma:</h1>
                <button className="classRoomButton" onClick={() => navigate(-1)}>Voltar</button>
            </div>
            <div className="mapContainer">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        room={room}
                        onClick={() => handleClick(room)}
                    />
                ))}
            </div>
        </div>
    );
};

export { ClassRooms };