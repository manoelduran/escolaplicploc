import React, { useState, useContext, useEffect } from "react";
import { fetchAPI } from "../service/api";

export const TeachersContext = React.createContext({});

function TeachersProvider({ children }) {
  const [teachers, setTeachers] = useState([]);

  async function fetchTeachers() {
    const TeachersCollection = await fetchAPI("/teachers", "get");
    const teachersData = await TeachersCollection.json();
    setTeachers(teachersData);
  }

  async function createTeacher(data) {
    console.log("data", data);
    await fetchAPI("/teachers", "post", data);
    await fetchTeachers();
  }

  async function updateTeacher(id, data) {
    const response = await fetchAPI(`/teachers/${id}`, "PUT", data);
    setTeachers(response.json());
  }

  async function deleteTeacher(id) {
    const removedTeacher = teachers.filter((Teacher) => Teacher.id !== id);
    setTeachers(removedTeacher);
  }

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <TeachersContext.Provider
      value={{
        teachers,
        createTeacher,
        updateTeacher,
        deleteTeacher,
        fetchTeachers,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
}

const useTeachers = () => {
  const context = useContext(TeachersContext);
  return context;
};

export { TeachersProvider, useTeachers };
