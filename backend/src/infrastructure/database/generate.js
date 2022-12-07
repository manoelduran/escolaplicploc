import pg from "pg";
import { databaseConfig } from "../../config.js";

async function generate() {
  try {
    const tables = [
      {
        name: "schools",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "cnpj" VARCHAR(14),
          "logo" VARCHAR(255),
          "address" VARCHAR(255)
        `,
      },
      {
        name: "teachers",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "cpf" VARCHAR(11),
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
          "subject" VARCHAR(255),
          FOREIGN KEY ("teacher_id") REFERENCES teachers("id")
        `,
      },
      {
        name: "students",
        columns: `
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255),
          "cpf" VARCHAR(11),
          "registrationNumber" VARCHAR(255),
          "classroom" INTEGER,
          FOREIGN KEY ("classroom") REFERENCES classrooms("id")
        `,
      },
    ];

    const mainDb = new pg.Client({
      ...databaseConfig,
      database: null,
    });

    await mainDb.connect();

    await mainDb.query(`DROP DATABASE IF EXISTS epp;`);
    await mainDb.query(`CREATE DATABASE epp;`);

    await mainDb.end();

    const client = new pg.Client(databaseConfig);

    await client.connect();

    await Promise.all(
      tables.map((table) => {
        return new Promise((resolve, reject) => {
          const query = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.columns});`;
          return client.query(query, (err, result) => {
            if (err) return reject(err);
            console.log(query);
            resolve();
          });
        });
      })
    );

    await client.end();
  } catch (error) {
    console.log("Não foi possivel gerar o banco", error);
    process.exit(1);
  }
}

await generate();
