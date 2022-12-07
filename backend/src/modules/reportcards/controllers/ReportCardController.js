import { ReportCard } from "../models/ReportCard.js";
import { ReportCardsRepository } from "../repositories/ReportCardsRepository.js";

export class ReportCardController {
  constructor() {
    this.reportCardsRepository = new ReportCardsRepository();
  }

  async create(req, res) {
    const { data } = req.body;

    if (!data.student || !data.classroom || !data.finalGrade || !data.approval) {
      return res
        .status(400)
        .send("Estudante, turma, nota final e aprovado são obrigatórios");
    }

    const reportCard = new ReportCard(data);

    try {
      const reportCardCreated = await this.reportCardsRepository.create(reportCard);

      return res.status(201).json(reportCardCreated);
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
      const reportCard = await this.reportCardsRepository.getById(id);

      return res.status(200).json(reportCard);
    } catch (error) {
      throw error;
    }
  }

  async listSRecordCards(req, res) {
    try {
      const reportCards = await this.reportCardsRepository.list();
      return res.send(reportCards);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao listar boletins" });
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
      if (!data.student || !data.classroom || !data.finalGrade || !data.approval) {
        return res
          .status(400)
          .send("Estudante, turma, nota final e aprovado são obrigatórios");
      }

      const reportCards = await reportCardsRepository.getById(id);
      
      if(!reportCards) {
        return res.status(400).send({
          message: "Boletim não encontrado",
        });
      }
      const updatedReportCard = await reportCardsRepository.update({...data, id: reportCards.id});
      return res.status(200).send(updatedReportCard);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Erro ao atualizar boletim" });
    }
  }

  async deleteRecordCard(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
      const reportCard = await this.reportCardsRepository.delete(id);
      return res.status(200).json(reportCard);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar boletim" });
    }
  }
}
