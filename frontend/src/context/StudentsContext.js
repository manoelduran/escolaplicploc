import React, { useState, useContext } from "react";

const initialState = {
    id: "",
    name: "",
    cpf: "",
    room: "",
    registration_number: "",
};

export const StudentsContext = React.createContext({});

function StudentsProvider({ children }) {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState(initialState);

    async function fetchStudents() {
        const studentsCollection = await fetch();
        setStudents(studentsCollection);
    }

    async function createStudent(data) {
        const newStudent = data;
        const updatedStudents = students.push(newStudent);
        setStudents(updatedStudents);
    }

    async function updateStudent(id) {
        const selectedStudent = students.find(student => student.id === id)

    }

    async function deleteStudent(id) {
        const removedStudent = students.filter(student => student.id !== id)
        setStudents(removedStudent)
    }



    async function showStudent(id) {
        students.find(student => student.id === id)
    }

    <StudentsContext.Provider value={{
        students,
        student,
        createStudent,
        updateStudent,
        deleteStudent,
        fetchStudents,
        showStudent
    }
    }>
        {children}
    </StudentsContext.Provider >

}

const useStudents = () => {
    const context = useContext(StudentsContext);
    return context;
};

export { StudentsProvider, useStudents };