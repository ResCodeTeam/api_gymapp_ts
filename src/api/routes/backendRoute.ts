import express from "express";
const backendRouter = express.Router();

import { RegistarFuncoesController } from "../controllers/backend/registarFuncoesController";
import { RegistarCpController } from "../controllers/backend/registarCpController";


const registarFuncoesController = new RegistarFuncoesController();
const registarCpController = new RegistarCpController();



//#region Admin
backendRouter.post("/funcoes/", registarFuncoesController.handle);

backendRouter.post("/cp/", registarCpController.handle);
backendRouter.post("/cp_ext/", registarFuncoesController.handle);

//#endregion

export { backendRouter };

