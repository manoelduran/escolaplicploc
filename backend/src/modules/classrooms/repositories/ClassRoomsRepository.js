import pg from "pg";
import { databaseConfig } from "../../../config.js";

export class ClassRoomsRepository {
  constructor() {
    this.pool = new pg.Pool(databaseConfig);
    this.pool.connect();
  }

  async create(classroom) {
    const { teacher, subject } = classroom;
    const query =
      "INSERT INTO classrooms (teacher_id, subject) VALUES ($1, $2) RETURNING *";

    const values = [teacher.id, subject];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const query = `
        SELECT 
        cr.id, cr.subject,
        json_agg(json_build_object(
             'id', st.id,
             'name', st.name,
             'CPF', st.cpf,
             'registrationNumber', st.registrationnumber,
             'classroom_id', st.classroom_id
         )) as students,
        json_build_object(
                'id', tc.id,
                'name', tc.name,
                'academicTitle', tc.academicTitle,
                'discipline', tc.discipline
        ) as teacher
        FROM classrooms cr
        LEFT JOIN (SELECT * FROM students) st ON st.classroom_id = cr.id
        LEFT JOIN teachers tc ON (tc.id = cr.teacher_id)
        GROUP BY tc.id, cr.id
      `;

      const result = await this.pool.query(query);

      return result.rows.map((row) => ({
        ...row,
        students: row.students.filter((student) => student.id),
      }));
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = `
        SELECT 
        cr.id, cr.subject,
        json_agg(json_build_object(
             'id', st.id,
             'name', st.name,
             'CPF', st.cpf,
             'registrationNumber', st.registrationnumber,
             'classroom_id', st.classroom_id
         )) as students,
        json_build_object(
                'id', tc.id,
                'name', tc.name,
                'academicTitle', tc.academicTitle,
                'discipline', tc.discipline
        ) as teacher
        FROM classrooms cr
        LEFT JOIN students st ON st.classroom_id = cr.id
        LEFT JOIN teachers tc ON (tc.id = cr.teacher_id)
        WHERE cr.id = $1
        GROUP BY tc.id, cr.id
    `;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return (
        !!result.rows[0] && {
          ...result.rows[0],
          students: result?.rows[0]?.students.filter((student) => student.id),
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async update(classroom) {
    const { teacher, subject } = classroom;
    const query =
      "UPDATE classrooms SET teacher_id = $1, subject $2 RETURNING * ";
    const values = [teacher.id, subject];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = "DELETE FROM classrooms WHERE id = $1 RETURNING *";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
