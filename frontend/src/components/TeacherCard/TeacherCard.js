import './roomCard.css';


function TeacherCard({teacher, onClick}) {
    return (
        <div className="cardContainer">
            <h1>Matéria: {teacher.subject}</h1>
            <h4> Módulo: {teacher.room}</h4>
            <h4>Professor: {teacher.teacher.name}</h4>
            <span>Formação: {teacher.teacher.academic_title}</span>
            <button className="enterButton" onClick={onClick}>Entrar</button>
        </div>
    );
};

export {TeacherCard};