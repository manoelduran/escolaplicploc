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
      const result = await this.pool.query("SELECT * FROM classrooms");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = "SELECT * FROM classrooms WHERE id = $1";
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
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
