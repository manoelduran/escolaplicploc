import { Student } from "../models/Student.js";
import { StudentsRepository } from "../repositories/StudentsRepository.js";

export class StudentController {
  constructor() {
    this.studentRepository = new StudentsRepository();
  }

  async create(req, res) {
    const { data } = req.body;

    if (!data.name || !data.CPF || !data.enrollment || !data.classroom) {
      return res
        .status(400)
        .send("Nome, CPF, matrícula e sala são obrigatórios");
    }

    const student = new Student(data);

    try {
      const studentCreated = await this.studentRepository.create(student);

      return res.status(201).json(studentCreated);
    } catch (error) {
      throw error;
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    try {
      const student = await this.studentRepository.getById(id);

      return res.status(200).json(student);
    } catch (error) {
      throw error;
    }
  }

  async listStudents(req, res) {
    try {
      const students = await this.studentRepository.list();
      return res.send(students);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao listar alunos" });
    }
  }

  async deleteStudent(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
      const student = await this.studentRepository.delete(id);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar aluno" });
    }
  }
}
