import './roomCard.css';


function RoomCard({room, onClick}) {
    return (
        <div className="cardContainer">
            <h1>Matéria: {room.subject}</h1>
            <h4> Módulo: {room.room}</h4>
            <h4>Professor: {room.teacher.name}</h4>
            <span>Formação: {room.teacher.academic_title}</span>
            <button className="enterButton" onClick={onClick}>Entrar</button>
        </div>
    );
};

export {RoomCard};