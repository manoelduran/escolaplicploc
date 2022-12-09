import '../styles/home.css'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../service/api';
import React, { useEffect, useState } from 'react';


function Home() {
    const navigate = useNavigate()
    const [school, setSchool] = useState({})
    const fetchSchool = async () => {
        const response = await fetchAPI("/schools", 'GET')
        const schoolData = await response.json()
        setSchool(schoolData[0])
    }

    useEffect(() => {
        fetchSchool()
    }, [])
    return (
        <div className='container'>
            <div className='schoolContainer'>
               {
                school ? (
                    <>
                    <h1 className='schoolTitle'>Informações da Escola</h1>
                    <h4 className='schoolName'>Nome: {school?.name}</h4>
                    <h4 className='schoolCNPJ'>CNPJ: {school?.cnpj}</h4>
                    <h4 className='schoolAddress'>Endereço: {school?.address}</h4>
                    </>
                ) : (
                    <h1>Escola não encontrada</h1>
                )
               }
            </div>
            <div className='buttonsContainer'>
                <button className='headerButton' onClick={() => navigate(`/classRooms`)}>Visualizar turmas</button>
            </div>
        </div>
    );
}

export { Home };