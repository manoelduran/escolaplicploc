import { ClassRoom } from "../models/Student.js";
import { ClassRoomsRepository } from "../repositories/ClassRoomsRepository.js";

export class ClassRoomsController {
  async create(req, res) {
    const data = req.body;

    if (!data.teacher_id || !data.subject) {
      return res.status(400).json({
        message: "teacher_id and subject são obrigatórios",
      });
    }

    try {
      const classRoomRepository = new ClassRoomsRepository();

      const teacher = new Teacher();

      const classroom = new ClassRoom(data);
      const classRoomCreated = await classRoomRepository.create(classroom);

      return res.status(201).json(classRoomCreated);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao criar st" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    try {
      const studentRepository = new ClassRoomRepository();
      const student = await studentRepository.getById(id);

      return res.status(200).json(student);
    } catch (error) {
      throw error;
    }
  }

  async listStudents(req, res) {
    try {
      const studentRepository = new ClassRoomRepository();
      const students = await studentRepository.list();
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
      const studentRepository = new ClassRoomRepository();
      const student = await studentRepository.delete(id);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar aluno" });
    }
  }
}
