import { School } from "../models/School.js";
import { SchoolRepository } from "../repositories/SchoolRepository.js";

export class SchoolController {
  async create(req, res) {
    try {
      const data = req.body;

      const schoolRepository = new SchoolRepository();

      if (!data || !data.name || !data.CNPJ || !data.logo || !data.address) {
        return res.status(400).json({
          message: "name, CNPJ, logo e address são obrigatórios",
        });
      }

      const school = new School(data);

      const createdSchool = await schoolRepository.create(school);
      return res.status(201).send(createdSchool);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao criar escola" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    try {
      const schoolRepository = new SchoolRepository();
      const school = await schoolRepository.getById(id);
      return res.status(200).json(school);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao criar escolas" });
    }
  }

  async listSchools(req, res) {
    try {
      const schoolRepository = new SchoolRepository();
      const schools = await schoolRepository.getAll();
      return res.send(schools);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao listar escolas" });
    }
  }

  async deleteSchool(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ error: "ID é obrigatório" });
    }

    try {
      const schoolRepository = new SchoolRepository();
      const school = await schoolRepository.delete(id);
      return res.send(school);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao deletar escola" });
    }
  }
}
