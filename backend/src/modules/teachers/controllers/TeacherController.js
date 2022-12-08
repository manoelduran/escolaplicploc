import { ClassRoomsRepository } from "../../classrooms/repositories/ClassRoomsRepository.js";
import { ClassRoom } from "../../classrooms/models/ClassRoom.js";
import { Teacher } from "../models/Teacher.js";
import { TeacherRepository } from "../repositories/TeacherRepository.js";

export class TeacherController {
  async create(req, res) {
    try {
      const data = req.body;
      const teacherRepository = new TeacherRepository();
      const classRoomRepository = new ClassRoomsRepository();

      if (
        !data ||
        !data.name ||
        !data.CPF ||
        !data.academicTitle ||
        !data.discipline
      ) {
        return res.status(400).json({
          message: "name, CPF, academicTitle e discipline são obrigatórios",
        });
      }

      const teacher = new Teacher(data);

      const createdTeacher = await teacherRepository.create(teacher);

      const classroom = new ClassRoom({
        subject: data.discipline,
        teacher: createdTeacher,
      });

      const classRoomCreated = await classRoomRepository.create(classroom);

      return res.status(201).send({
        ...createdTeacher,
        classroom: classRoomCreated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao criar professor" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    try {
      const teacherRepository = new TeacherRepository();
      const teacher = await teacherRepository.getById(id);
      return res.status(200).json(teacher);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao encontrar o paciente" });
    }
  }

  async listTeachers(req, res) {
    try {
      const teacherRepository = new TeacherRepository();
      const teachers = await teacherRepository.getAll();

      return res.json(teachers);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao listar professores" });
    }
  }
  async updateTeacher(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }
    try {
      const data = req.body;
      const teacherRepository = new TeacherRepository();
      if (
        !data ||
        !data.name ||
        !data.CPF ||
        !data.academicTitle ||
        !data.discipline
      ) {
        return res.status(400).json({
          message: "name, CPF, academicTitle e discipline são obrigatórios",
        });
      }

      const teacher = await teacherRepository.getById(id);

      if (!teacher) {
        return res.status(400).send({
          message: "Professor não encontrado",
        });
      }
      const updatedTeacher = await teacherRepository.update({
        ...data,
        id: teacher.id,
      });
      return res.status(200).send(updatedTeacher);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao atualizar professor" });
    }
  }
  async deleteTeacher(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ error: "ID é obrigatório" });
    }

    try {
      const teacherRepository = new TeacherRepository();
      const teacher = await teacherRepository.delete(id);
      return res.send(teacher);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao deletar professor" });
    }
  }
}
