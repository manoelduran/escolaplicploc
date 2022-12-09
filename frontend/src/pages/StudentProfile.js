import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReportCard } from "../components/ReportCard/ReportCard";
import { fetchAPI } from "../service/api";
import "../styles/teacherProfile.css";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({});

  const fetchStudent = async () => {
    const response = await fetchAPI(`/students/${Number(id)}`, "GET");
    const studentData = await response.json();
    setStudent(studentData);
  };

  console.log(student);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  return (
    <div className="studentProfileContainer">
      <div className="studentProfileInfoContainer">
        <h1 className="studentTitle">Informações do estudante:</h1>
        <h4 className="studentName">Nome: {student.name}</h4>
        <h4 className="studentCPF">CPF: {student.CPF}</h4>
        <h4 className="studentAcademicTitle">
          Número da matricula: {student.registrationNumber}
        </h4>
      </div>
      <div className="buttonsDiv">
        <button
          className="addStudentButton"
          onClick={() => navigate(`/AddEditstudent/${student.id}`)}
        >
          Editar Estudante
        </button>
        <button className="classRoomButton" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>

      <div className="reportCardContainer">
        <h1>Boletim</h1>
        {student?.reportcards?.map((reportCard, index) => (
          <ReportCard
            key={index}
            reportcard={reportCard}
            teacher={student.teacher}
            classroom={student.classroom}
          />
        ))}
      </div>
    </div>
  );
}

export { StudentProfile };
