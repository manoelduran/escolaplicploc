import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeachers } from "../context/TeachersContext";
import { fetchAPI } from "../service/api";
import "../styles/addEditTeacher.css";

function AddEditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { updateTeacher } = useTeachers();
  const [formValue, setFormValue] = useState({
    name: "",
    CPF: "",
    academicTitle: "",
    discipline: "",
  });
  const { name, CPF, academicTitle, discipline } = formValue;
  console.log(formValue);
  const showTeacher = async (teacher_id) => {
    const selectedTeacher = await fetchAPI(`/teachers/${teacher_id}`, "GET");
    const data = await selectedTeacher.json();
    setFormValue(data);
  };
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const selectedTeacher = showTeacher(id);
      setFormValue({ ...selectedTeacher });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name && CPF && academicTitle && discipline && editMode) {
      await updateTeacher(id, formValue);
      setEditMode(false);
      setTimeout(() => navigate("/"), 500);
      return;
    }
    await fetchAPI("/teachers", "POST", formValue);
    setTimeout(() => navigate("/"), 500);
  };

  const onInputChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="addTeacherContainer">
      <div className="addTeacherInfo">
        <h1 className="addTeacherTitle">{editMode ? `Edite o professor:` : "Cadastre um professor:"}</h1>
        <button className="addTeacherButton" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            required
            value={name || ""}
            onChange={onInputChange}
          />
          <input
            type="cpf"
            name="CPF"
            title="CPF"
            placeholder="CPF"
            required
            value={CPF || ""}
            onChange={onInputChange}
          />
          <input
            type="text"
            name="academicTitle"
            title="T??tulo Acad??mico"
            placeholder="T??tulo Acad??mico"
            required
            value={academicTitle || ""}
            onChange={onInputChange}
          />
          <input
            type="text"
            name="discipline"
            title="Disciplina"
            placeholder="Disciplina"
            required
            value={discipline || ""}
            onChange={onInputChange}
          />
          <button
            type="submit"
            className="addStudentButton"
            style={{ marginTop: 15 }}
          >
            {editMode ? "Editar" : "Criar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export { AddEditTeacher };
