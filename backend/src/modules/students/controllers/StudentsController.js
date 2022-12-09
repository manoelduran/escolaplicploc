import { ClassRoomsRepository } from "../../classrooms/repositories/ClassRoomsRepository.js";
import { Student } from "../models/Student.js";
import { StudentsRepository } from "../repositories/StudentsRepository.js";
import { ReportCardsRepository } from "../../reportcards/repositories/ReportCardsRepository.js";

export class StudentController {
  async create(req, res) {
    const data = req.body;

    if (!data || !data.name || !data.CPF || !data.registrationNumber) {
      return res
        .status(400)
        .json({ message: "name, CPF e registrationNumber são obrigatórios" });
    }

    const classRoomRepository = new ClassRoomsRepository();
    const studentsRepository = new StudentsRepository();
    const firstClassExists = await classRoomRepository.getById(1);

    try {
      if (!firstClassExists) {
        return res.status(400).json({
          message: "Não ha classes existentes para criar um estudante",
        });
      }

      const student = new Student({ classroom: firstClassExists, ...data });

      const studentCreated = await studentsRepository.create(student);

      return res.status(201).json(studentCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao criar aluno" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ error: "ID é obrigatório" });
    }

    try {
      const studentsRepository = new StudentsRepository();
      const student = await studentsRepository.getById(id);

      if (!student) {
        return res.status(404).send({ error: "student não encontrado" });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao buscar aluno" });
    }
  }

  async listStudents(req, res) {
    try {
      const studentsRepository = new StudentsRepository();
      const students = await studentsRepository.getAll();
      return res.json(students);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao listar alunos" });
    }
  }

  async updateStudent(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    try {
      const data = req.body;
      const studentsRepository = new StudentsRepository();
      const classRoomRepository = new ClassRoomsRepository();

      const student = await studentsRepository.getById(id);

      if (!student) {
        return res.status(400).send({
          message: "Estudante não encontrado",
        });
      }

      if (data.classroom_id) {
        const classroomExists = await classRoomRepository.getById(
          data.classroom_id
        );

        if (!classroomExists) {
          return res.status(400).send({
            message: "Modulo inexiste",
          });
        }

        if (
          student.reportcards.find((reportCard) => {
            return reportCard.classroom.id === data.classroom_id;
          })
        ) {
          return res.status(400).send({
            message: "Você já foi aprovado para este modulo",
          });
        }

        if (!student.reportcards[0].approval) {
          return res.status(400).send({
            message:
              "Não é possivel atualizar a classroom pois o aluno não foi aprovado",
          });
        }

        student.classroom = classroomExists;
      }

      const updatedStudent = await studentsRepository.update(
        new Student({
          ...student,
          name: data.name || student.name,
          CPF: data.CPF || student.CPF,
          registrationNumber:
            data.registrationNumber || student.registrationNumber,
        })
      );

      return res.status(200).send(updatedStudent);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao atualizar aluno" });
    }
  }

  async deleteStudent(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
      const studentsRepository = new StudentsRepository();

      const student = await studentsRepository.getById(id);

      if (!student) {
        return res.status(400).send({
          message: "Estudante não encontrado",
        });
      }

      await studentsRepository.delete(id);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar aluno" });
    }
  }
}
