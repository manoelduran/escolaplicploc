import React, { useState, useContext } from "react";




export const StudentsContext = React.createContext({});

function StudentsProvider({ children }) {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    console.log('students', students)

    async function fetchStudents() {
        const studentsCollection = await fetch();
        setStudents(studentsCollection);
    }

    async function createStudent(data) {
        console.log('data', data)
        const newStudent = data;
        const updatedStudents = students.push(newStudent);
        setStudents(updatedStudents);
    }

    async function updateStudent(id, data) {
        const selectedStudent = students.filter(student => student.id === id)
        const updatedList = students.push(...selectedStudent, data);
        setStudents(updatedList)
    }

    async function deleteStudent(id) {
        const removedStudent = students.filter(student => student.id !== id);
        setStudents(removedStudent);
    }



    async function showStudent(id) {
        const selectedStudent = students.find(student => student.id === id)
        setStudent(selectedStudent);
    }

 return (
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
 )

}

const useStudents = () => {
    const context = useContext(StudentsContext);
    return context;
};

export { StudentsProvider, useStudents };