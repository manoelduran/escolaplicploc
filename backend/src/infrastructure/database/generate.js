import pg from "pg";
import { databaseConfig } from "../../config.js";

async function generate() {
  try {
    const timestampQuery = (table, column) => `
      ALTER TABLE ${table} ADD COLUMN "${column}" TIMESTAMP NOT NULL DEFAULT now();
    `;

    const generateTimestampsQuery = (table) =>
      `${timestampQuery(table, "created_at")}
       ${timestampQuery(table, "updated_at")}`;

    const tables = [
      {
        name: "schools",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "CNPJ" VARCHAR(14),
          "logo" VARCHAR(255),
          "address" VARCHAR(255)
        `,
      },
      {
        name: "students",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "CPF" VARCHAR(11),
          "registrationNumber" VARCHAR(255),
          "classroom" INTEGER,
          FOREIGN KEY ("classroom") REFERENCES classrooms("id")
        `,
      },
      {
        name: "teachers",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "CPF" VARCHAR(11),
          "academicTitle" VARCHAR(255),
          "discipline" VARCHAR(255)
        `,
      },
      {
        name: "classrooms",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "teacher_id" INTEGER,
          "students" INTEGER[] NOT NULL,
          "discipline" VARCHAR(255),
          "room" VARCHAR(255),
          FOREIGN KEY ("teacher_id") REFERENCES teachers("id")
        `,
      },
    ];

    const mainDb = new pg.Client(databaseConfig);

    await mainDb.query(`DROP DATABASE IF EXISTS epp;`);
    await mainDb.query(`CREATE DATABASE epp;`);

    await mainDb.end();

    const client = new pg.Client({
      ...databaseConfig,
      database: "epp",
    });

    await Promise.all(
      tables.map((table) => {
        const query = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.columns});`;
        console.log(query);
        return client.query(query);
      })
    );

    await client.end();
  } catch (error) {
    console.log("Não foi possivel gerar o banco", error);
    process.exit(1);
  }
}

await generate();
