import pg from "pg";
import { databaseConfig } from "../../../config.js";

export class TeacherRepository {
  constructor() {
    this.pool = new pg.Pool(databaseConfig);
    this.pool.connect();
  }

  async create(teacher) {
    const { name, CPF, academicTitle, discipline} = teacher;
    const query =
      "INSERT INTO teachers (name, cpf, academictitle, discipline) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [name, CPF, academicTitle, discipline];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.pool.query("SELECT * FROM teachers");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = "SELECT * FROM teachers WHERE id = $1";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(teacher) {
    console.log('teacher', teacher)
    const { name, CPF, academicTitle, discipline } = teacher;
    const query =
      "UPDATE teachers SET name = $1, cpf = $2, academictitle = $3, discipline = $4 WHERE id = $5 RETURNING * ";
    const values = [name, CPF, academicTitle, discipline, id];
    console.log('values', values)
    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = "DELETE FROM teachers WHERE id = $1 RETURNING *";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
