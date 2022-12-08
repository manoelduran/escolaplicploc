import { Router } from "express";
import { ClassRoomsController } from "./controllers/ClassRoomsController.js";

const classroomController = new ClassRoomsController();

const classroomsRoutes = Router();

classroomsRoutes.post("/", classroomController.create);
classroomsRoutes.get("/:id", classroomController.show);
classroomsRoutes.get("/", classroomController.listClasses);
classroomsRoutes.delete("/:id", classroomController.deleteClass);

export { classroomsRoutes };
