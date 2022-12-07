import { Router } from "express";
import { schoolRoutes } from "../modules/schools/routes.js";
import { studentsRoutes } from "../modules/students/routes.js";

const routes = Router();

routes.use("/schools", schoolRoutes);
routes.use("/students", studentsRoutes);

export { routes };
