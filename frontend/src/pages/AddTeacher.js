import { useNavigate } from "react-router-dom";


function AddTeacher() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="classRoomInfo">
                <h1 className="classRoomTitle">Selecione uma turma:</h1>
                <button className="classRoomButton" onClick={() => navigate(-1)}>Voltar</button>
            </div>
            <div className="mapContainer">
                <form>
                    <input />
                </form>
            </div>
        </div>
    );
}

export { AddTeacher };