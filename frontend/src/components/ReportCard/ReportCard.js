import React from "react";
import "./ReportCard.css";

const ReportCard = ({ reportcard, classroom, teacher }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nota</th>
          <th>Turma</th>
          <th>Professor</th>
          <th>Aprovação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{reportcard.id}</td>
          <td>{reportcard.finalGrade}</td>
          <td>{classroom?.subject}</td>
          <td>{teacher?.name}</td>
          <td>{reportcard?.approval ? "Sim" : "Não"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export { ReportCard };
