import { ClassRoomsRepository } from "../repositories/ClassRoomsRepository.js";

export class ClassRoomsController {
  async show(req, res) {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    try {
      const classroomRepository = new ClassRoomsRepository();
      const classroom = await classroomRepository.getById(id);

      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao buscar classe" });
    }
  }

  async listClasses(req, res) {
    try {
      const classroomRepository = new ClassRoomsRepository();
      const classroom = await classroomRepository.getAll();
      return res.send(classroom);
    } catch (error) {
      return res.status(500).send({ error: "Erro ao listar classes" });
    }
  }

  async deleteClass(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }

    try {
      const classroomRepository = new ClassRoomsRepository();
      const classroom = await classroomRepository.delete(id);
      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar classe" });
    }
  }
}
