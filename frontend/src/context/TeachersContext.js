import React, { useState, useContext, useEffect } from "react";
import { fetchAPI } from "../service/api";



export const TeachersContext = React.createContext({});

function TeachersProvider({ children }) {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({})

    async function fetchTeachers() {
        const TeachersCollection = await fetchAPI("/teachers", 'get')
        const teachersData = await TeachersCollection.json()
        setTeachers(teachersData);
    }

    async function createTeacher(data) {
        const newTeacher = data;
        const updatedTeachers = teachers.push(newTeacher);
        setTeachers(updatedTeachers);
    }

    async function updateTeacher(id, data) {
        const selectedTeacher = teachers.filter(Teacher => Teacher.id === id)
        const updatedList = teachers.push(...selectedTeacher, data);
        setTeachers(updatedList)
    }

    async function deleteTeacher(id) {
        const removedTeacher = teachers.filter(Teacher => Teacher.id !== id);
        setTeachers(removedTeacher);
    }

    const showTeacher = async (teacher_id) => {
        console.log('teacher_id', teacher_id)
        const selectedTeacher = await fetchAPI(`/teachers/${teacher_id}`, 'get')
        const data = await selectedTeacher.json()
        console.log('teachersData', data)
        setTeacher(data)
    }

 useEffect(() => {
    fetchTeachers()
 }, [])
    return (
        <TeachersContext.Provider value={{
            teachers,
            teacher,
            createTeacher,
            updateTeacher,
            deleteTeacher,
            fetchTeachers,
            showTeacher
        }
        }>
            {children}
        </TeachersContext.Provider >
    )

}

const useTeachers = () => {
    const context = useContext(TeachersContext);
    return context;
};

export { TeachersProvider, useTeachers };