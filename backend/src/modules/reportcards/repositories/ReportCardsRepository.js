import pg from "pg";

import { databaseConfig } from "../../../config.js";

export class ReportCardsRepository {
  constructor() {
    this.pool = new pg.Pool(databaseConfig);
    this.pool.connect();
  }

  async create(reportcards) {
    const { student_id, classroom_id, finalGrade, approval } = reportcards;
    const query =
      "INSERT INTO reportcards (student_id, classroom_id, finalGrade, approval) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [student_id, classroom_id, finalGrade, approval];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
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
        "SELECT * FROM reportcards WHERE id = $1"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async update(reportcards) {
    const { id, student_id, classroom_id, finalGrade, approval } = reportcards;
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
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
