import { School } from "../models/School.js";
import { SchoolRepository } from "../repositories/SchoolRepository.js";

export class SchoolController {
  constructor() {
    this.schoolRepository = new SchoolRepository();
  }

  async create(req, res) {
    try {
      const data = req.body;

      if (!data || !data.name || !data.CNPJ || !data.logo || !data.address) {
        return res.status(400).json({
          message: "name, CNPJ, logo e address são obrigatórios",
        });
      }

      const school = new School(data);

      const createdSchool = await this.schoolRepository.create(school);
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
      const school = await this.schoolRepository.getById(id);
      return res.status(200).json(school);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao criar escolas" });
    }
  }

  async listSchools(req, res) {
    try {
      const schools = await this.schoolRepository.list();
      return res.send(schools);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao listar escolas" });
    }
  }

  async deleteSchool(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ error: "ID é obrigatório" });
    }

    try {
      const school = await this.schoolRepository.delete(id);
      return res.send(school);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao deletar escola" });
    }
  }
}
