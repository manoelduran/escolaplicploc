import { ClassRoom } from "../models/ClassRoom.js";
import { ClassRoomsRepository } from "../repositories/ClassRoomsRepository.js";
import { TeacherRepository } from "../../teachers/repositories/TeacherRepository.js";

export class ClassRoomsController {
  async create(req, res) {
    const data = req.body;

    if (!data || !data.teacher_id || !data.subject) {
      return res.status(400).json({
        message: "teacher_id and subject são obrigatórios",
      });
    }

    try {
      const classRoomRepository = new ClassRoomsRepository();

      const teachersRepository = new TeacherRepository();
      const teacherExists = await teachersRepository.getById(data.teacher_id);

      if (!teacherExists) {
        return res.status(404).json({
          message: "teacher não encontrado",
        });
      }

      const classroom = new ClassRoom({
        subject: data.subject,
        teacher: teacherExists,
      });

      const classRoomCreated = await classRoomRepository.create(classroom);

      return res.status(201).json(classRoomCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao criar classroom" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    try {
      const classroomRepository = new ClassRoomsRepository();
      const student = await classroomRepository.getById(id);

      return res.status(200).json(student);
    } catch (error) {
      throw error;
    }
  }

  async listClasses(req, res) {
    try {
      const classroomRepository = new ClassRoomsRepository();
      const classroom = await classroomRepository.getAll();
      return res.send(classroom);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao listar alunos" });
    }
  }

  async deleteClass(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
      const classroomRepository = new ClassRoomsRepository();
      const student = await classroomRepository.delete(id);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar aluno" });
    }
  }
}
