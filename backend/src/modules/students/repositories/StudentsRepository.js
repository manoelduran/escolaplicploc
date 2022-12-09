import pg from "pg";

import { databaseConfig } from "../../../config.js";
import { Student } from "../models/Student.js";
import { ClassRoom } from "../../classrooms/models/ClassRoom.js";

export class StudentsRepository {
  selectFormatted =
    'id, name, cpf AS "CPF", registrationnumber AS "registrationNumber", classroom_id';
  constructor() {
    this.pool = new pg.Pool(databaseConfig);
    this.pool.connect();
  }

  mapToModel(student) {
    const { classroom_id, ...result } = student;
    return new Student({
      ...result,
      classroom: new ClassRoom({ id: classroom_id }),
    });
  }

  async create(student) {
    const { name, CPF, registrationNumber, classroom } = student;
    const query = `INSERT INTO students (name, cpf, registrationnumber, classroom_id) VALUES ($1, $2, $3, $4) RETURNING ${this.selectFormatted}`;

    const values = [name, CPF, registrationNumber, classroom.id];

    try {
      const result = await this.pool.query(query, values);
      return this.mapToModel(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const values = [id];

    try {
      const result = await this.pool.query(
        `
        SELECT st.id, st.name, st.cpf AS "CPF", st.registrationnumber AS "registrationNumber",
          json_build_object(
            'id', cr.id, 
            'subject', cr.subject
          ) as classroom,
          json_build_object(
            'id', tc.id, 
            'name', tc.name
          ) as teacher,
          json_agg(json_build_object(
            'approval', rp.approval,
            'finalGrade', rp."finalGrade",
            'approval', rp.approval,
            'classroom',  json_build_object(
            'id', cr.id,
            'subject', cr.subject
          )
          )) as reportcards
        FROM students st 
        LEFT JOIN classrooms cr ON cr.id = st.classroom_id
        LEFT JOIN teachers tc ON tc.id = cr.teacher_id
        LEFT JOIN (
          SELECT * FROM reportcards
          RIGHT JOIN classrooms rpc ON rpc.id = reportcards.classroom_id
        ) rp ON rp.student_id = st.id
        WHERE st.id = $1
        GROUP BY  tc.id, st.id, cr.id;
         `,
        values
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.pool.query(
        `SELECT ${this.selectFormatted} FROM students`
      );

      return result.rows.map(this.mapToModel);
    } catch (error) {
      throw error;
    }
  }

  async update({ name, classroom, registrationNumber, CPF, id }) {
    const query = `UPDATE students SET name = $1, cpf = $2,  registrationnumber = $3, classroom_id = $4 WHERE id = $5 RETURNING ${this.selectFormatted} `;
    const values = [name, CPF, registrationNumber, classroom.id, id];

    try {
      const result = await this.pool.query(query, values);
      return this.mapToModel(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = `DELETE FROM students WHERE id = $1 RETURNING ${this.selectFormatted}`;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return this.mapToModel(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }
}
