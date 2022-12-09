import React, { useEffect, useState } from "react";
import "../styles/room.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../service/api";
import { TeacherCard } from "../components/TeacherCard";
import { StudentCard } from "../components/StudentCard";

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState({});

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

  const handleDeleteStudent = async (id) => {
    //  const selectedTeacher = await fetchAPI(`/teachers/${id}`, 'get')
    //const data = await selectedTeacher.json()
    //console.log('teachersData', data)
    await fetchAPI(`/students/${Number(id)}`, 'DELETE')
    navigate("/")
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
        {
          classroom?.students?.map((student, index) => (
            <StudentCard
              key={index}
              student={student}
              onShow={() => navigate(`/showStudent/${student.id}`)}
              onDelete={() => handleDeleteStudent(student.id)}
            />
          ))
        }
      </div>
    </div>
  );
}

export { Room };
