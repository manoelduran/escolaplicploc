import pg from "pg";

import { databaseConfig } from "../../../config.js";
import { ReportCard } from "../models/ReportCard.js";
import { ClassRoom } from "../../classrooms/models/ClassRoom.js";
import { Student } from "../../students/models/Student.js";

export class ReportCardsRepository {
  constructor() {
    this.pool = new pg.Pool(databaseConfig);
    this.pool.connect();
  }

  mapToModel(reportCard) {
    const { student_id, classroom_id, ...result } = reportCard;
    return new ReportCard({
      ...result,
      student: new Student({ id: student_id }),
      classroom: new ClassRoom({ id: classroom_id }),
    });
  }

  async create(reportCard) {
    const { student, classroom, finalGrade, approval } = reportCard;
    const query =
      'INSERT INTO reportcards (student_id, classroom_id, "finalGrade", approval) VALUES ($1, $2, $3, $4) RETURNING *';

    const values = [student.id, classroom.id, finalGrade, approval];

    try {
      const result = await this.pool.query(query, values);

      return this.mapToModel(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = "SELECT * FROM reportcards WHERE id = $1";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.pool.query(
        `
          SELECT
           rp.id, rp."finalGrade", rp.approval, 
           json_build_object(
                'id', st.id,
                'name', st.name,
                'CPF', st.cpf,
                'registrationNumber', st.registrationnumber,
                'classroom_id', st.classroom_id
            ) as student,
            json_build_object(
                'id', cr.id
            ) as classroom,
            json_build_object(
                'id', tc.id,
                'name', tc.name,
                'academicTitle', tc.academicTitle,
                'discipline', tc.discipline
            ) as teacher
            FROM reportcards rp
            INNER JOIN students st ON st.id = rp.student_id
            INNER JOIN classrooms cr ON cr.id = rp.classroom_id
            INNER JOIN teachers tc ON tc.id = cr.teacher_id
            GROUP BY st.id, rp.id, cr.id, tc.id
        `
      );

      return result.rows.map(
        (row) =>
          new ReportCard({
            ...row,
            student: new Student(row.student),
            classroom: new ClassRoom(row.classroom),
          })
      );
    } catch (error) {
      throw error;
    }
  }

  async update(reportcard) {
    const { id, student_id, classroom_id, finalGrade, approval } = reportcard;
    const query =
      "UPDATE reportcards SET student_id = $1, classroom_id = $2, finalGrade = $3, approval = $4 WHERE id = $5 RETURNING * ";
    const values = [student_id, classroom_id, finalGrade, approval, id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = "DELETE FROM reportcards WHERE id = $1 RETURNING *";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return this.mapToModel(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }
}
