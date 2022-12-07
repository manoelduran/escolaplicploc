import React, { useState, useContext } from "react";

const initialState = {
    name: "",
    cpf: "",
    academic_title: "",
    subject: ""
};



export const TeachersContext = React.createContext({});

function TeachersProvider({ children }) {
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({});

    async function fetchTeachers() {
        const TeachersCollection = await fetch();
        setTeachers(TeachersCollection);
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



    async function showTeacher(subject) {
      const selectedTeacher = teachers.find(Teacher => Teacher.subject === subject)
      setTeacher(selectedTeacher);
    }

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