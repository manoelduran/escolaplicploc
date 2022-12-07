import { client } from "../../../infrastructure/database/index.js";

export class SchoolRepository {
  constructor() {}

  async create(school) {
    const { name, CNPJ, logo, address } = school;
    const query =
      "INSERT INTO schools (name, CNPJ, logo, address) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [name, CNPJ, logo, address];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const query = "SELECT * FROM schools WHERE id = $1";
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(school) {
    const { id, name, CNPJ, logo, address } = school;
    const query =
      "UPDATE schools SET name = $1, CNPJ = $2, logo = $3, address = $4 WHERE id = $5 RETURNING * ";
    const values = [name, CNPJ, logo, address, id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const query = "DELETE FROM schools WHERE id = $1 RETURNING *";
    const values = [id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
