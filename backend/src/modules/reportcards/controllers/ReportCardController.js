import { StudentsRepository } from "../../students/repositories/StudentsRepository.js";
import { ReportCard } from "../models/ReportCard.js";
import { ReportCardsRepository } from "../repositories/ReportCardsRepository.js";

export class ReportCardController {
  async create(req, res) {
    const data = req.body;

    if (!data.student_id || !data.finalGrade) {
      return res.status(400).json({
        message: "student_id, finalGrade",
      });
    }

    try {
      const studentsRepository = new StudentsRepository();

      const studentExists = await studentsRepository.getById(data.student_id);

      if (!studentExists) {
        return res.status(400).send({ error: "student não encontrado" });
      }

      if (!studentExists) {
        return res.status(400).send({ error: "student não encontrado" });
      }

      if (!studentExists.classroom) {
        return res
          .status(400)
          .send({ error: "student não esta matriculado em nenhuma classe" });
      }

      console.log(studentExists);

      const reportCard = new ReportCard({
        finalGrade: data.finalGrade,
        student: studentExists,
        classroom: studentExists.classroom,
      });

      const reportCardsRepository = new ReportCardsRepository();
      const reportCardCreated = await reportCardsRepository.create(reportCard);

      return res.status(201).json({
        ...reportCardCreated,
        student: studentExists,
        classroom: studentExists.classroom,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "ID é obrigatório",
      });
    }

    try {
      const reportCardsRepository = new ReportCardsRepository();
      const reportCard = await reportCardsRepository.getById(id);

      return res.json(reportCard);
    } catch (error) {
      throw error;
    }
  }

  async listRecordCards(req, res) {
    try {
      const reportCardsRepository = new ReportCardsRepository();
      const reportCards = await reportCardsRepository.getAll();
      return res.json(reportCards);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao listar reportcards" });
    }
  }

  async updateRecordCard(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    try {
      const data = req.body;
      const reportCardsRepository = new ReportCardsRepository();
      const studentsRepository = new StudentsRepository();
      const classRoomRepository = new ClassRoomsRepository();

      const reportCardExists = await reportCardsRepository.getById(id);

      if (!reportCardExists) {
        return res.status(400).send({
          message: "reportcard não encontrado",
        });
      }

      if (data.student_id) {
        const student = await studentsRepository.getById(id);

        if (!student) {
          return res.status(400).send({
            message: "student não encontrado",
          });
        }

        reportCardExists.student = student;
      }

      if (data.classroom_id) {
        const classroom = await classRoomRepository.getById(id);

        if (!classroom) {
          return res.status(400).send({
            message: "classroom não encontrada",
          });
        }

        reportCardExists.classroom = classroom;
      }

      const reportCard = new ReportCard({
        ...reportCardExists,
        finalGrade: data.finalGrade || reportCardExists.finalGrade,
      });

      const updatedReportCard = await reportCardsRepository.update(reportCard);
      return res.status(200).send(updatedReportCard);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro ao atualizar boletim" });
    }
  }

  async deleteRecordCard(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    try {
      const reportCardsRepository = new ReportCardsRepository();

      const reportCardExists = await reportCardsRepository.getById(id);

      if (!reportCardExists) {
        return res.status(400).send({
          message: "reportcard não encontrado",
        });
      }

      await reportCardsRepository.delete(id);

      return res.status(200).json(reportCard);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar boletim" });
    }
  }
}
