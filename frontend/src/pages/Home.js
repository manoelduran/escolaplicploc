import '../styles/home.css'
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <div className='schoolContainer'>
                <h1 className='schoolTitle'>Informações da Escola</h1>
                <h4 className='schoolName'>Nome: Plic Ploc</h4>
                <h4 className='schoolCNPJ'>CNPJ: 2231312312312</h4>
                <h4 className='schoolAddress'>Endereço: Rua Neverland, numero 420</h4>
            </div>
            <div className='buttonsContainer'>
                <button className='headerButton' onClick={() => navigate(`/classRooms`)}>Visualizar turmas</button>
                <button className='headerButton' onClick={() => navigate(`/addTeacher`)}>Criar Professor</button>
                <button className='headerButton' onClick={() => navigate(`/AddGrade`)}>Criar Aluno</button>
            </div>
        </div>
    );
}

export { Home };