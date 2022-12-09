import React, { useEffect, useState } from "react";
import "../styles/room.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../service/api";
import { TeacherCard } from "../components/TeacherCard";
import { StudentCard } from "../components/StudentCard";
import { useStudents } from "../context/StudentsContext";

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState({});
  const { deleteStudent, showStudent, students } = useStudents();

  const fetchClassroom = async () => {
    const response = await fetchAPI(`/classrooms/${Number(id)}`, "GET");
    const teachersData = await response.json();
    setClassroom(teachersData);
  };

  const handleShowTeacher = async () => {
    //  const selectedTeacher = await fetchAPI(`/teachers/${id}`, 'get')
    //const data = await selectedTeacher.json()
    //console.log('teachersData', data)
    navigate(`/showTeacher/${classroom.teacher.id}`);
  };

  useEffect(() => {
    fetchClassroom();
  }, [id]);

  return (
    <div className="roomContainer">
      <div className="teacherContainer">
        <TeacherCard
          teacher={classroom?.teacher}
          onShow={() => handleShowTeacher(classroom?.teacher?.id)}
        />
        <button className="addStudentButton" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
      <button
        className="headerButton"
        style={{ width: "fit-content", alignSelf: "flex-end" }}
        onClick={() => navigate(`/addEditStudent`)}
      >
        Criar Aluno
      </button>
      <div className="studentsContainer">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
            onShow={() => showStudent(student.id)}
            onDelete={() => deleteStudent(student.id)}
          />
        ))}
      </div>
    </div>
  );
}

export { Room };
