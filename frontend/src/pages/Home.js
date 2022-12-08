import '../styles/home.css'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../service/api';
import { useEffect } from 'react';


function Home() {
    const navigate = useNavigate()
    const fetchSchool = async () => {
        const schoolData =  await fetchAPI("/schools")
        console.log('schoolData', schoolData)
        return schoolData
    }
 
    useEffect(() => {
        fetchSchool()
    }, [])
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
            </div>
        </div>
    );
}

export { Home };