import { Router } from "express";
import { TeacherController } from "./controllers/TeacherController.js";

const teacherRoutes = Router();

const teacherController = new TeacherController();

teacherRoutes.post("/", teacherController.create);
teacherRoutes.get("/:id", teacherController.show);
teacherRoutes.get("/", teacherController.listTeachers);
teacherRoutes.delete("/:id", teacherController.deleteTeacher);
teacherRoutes.put("/:id", teacherController.updateTeacher);

export { teacherRoutes };
