import { Router } from "express";
import { StudentController } from "./controllers/StudentsController.js";

const studentController = new StudentController();

const studentsRoutes = Router();

studentsRoutes.post("/", studentController.create);
studentsRoutes.get("/:id", studentController.show);
studentsRoutes.get("/", studentController.listStudents);
studentsRoutes.delete("/:id", studentController.deleteStudent);

export { studentsRoutes };
