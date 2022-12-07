import { Router } from "express";
import { ReportCardController } from "./controllers/ReportCardController.js";

const reportCardController = new ReportCardController();

const reportCardsRoutes = Router();

reportCardsRoutes.post("/", reportCardController.create);
reportCardsRoutes.get("/:id", reportCardController.show);
reportCardsRoutes.get("/", reportCardController.listSRecordCards);
reportCardsRoutes.delete("/:id", reportCardController.deleteRecordCard);
reportCardsRoutes.put("/:id", reportCardController.updateRecordCard);

export { reportCardsRoutes };
