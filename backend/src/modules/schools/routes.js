import { Router } from "express";
import { SchoolController } from "./controllers/SchoolController.js";

const schoolRoutes = Router();

const schoolController = new SchoolController();

schoolRoutes.post("/", schoolController.create);
schoolRoutes.get("/:id", schoolController.show);
schoolRoutes.get("/", schoolController.listSchools);
schoolRoutes.delete("/:id", schoolController.deleteSchool);

export { schoolRoutes };
