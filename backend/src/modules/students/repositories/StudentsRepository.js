import { client } from "../../../infrastructure/database/index.js";

export class StudentsRepository {
  async create(student) {
    const { name, CPF, logo, address } = student;
    const query =
      "INSERT INTO students (name, CPF, logo, address) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [name, CPF, logo, address];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = "SELECT * FROM students WHERE id = $1";
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(school) {
    const { id, name, CPF, logo, address } = school;
    const query =
      "UPDATE students SET name = $1, CPF = $2, logo = $3, address = $4 WHERE id = $5 RETURNING * ";
    const values = [name, CPF, logo, address, id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = "DELETE FROM students WHERE id = $1 RETURNING *";
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
