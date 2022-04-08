import express from "express";
const backendRouter = express.Router();

import { RegistarFuncoesController } from "../controllers/backend/registarFuncoesController";
import { RegistarCpController } from "../controllers/backend/registarCpController";
import { CriarAtividadeController } from "../controllers/atividades/criarAtividadeController";


const registarFuncoesController = new RegistarFuncoesController();
const registarCpController = new RegistarCpController();
const criarAtividadeController = new CriarAtividadeController();


backendRouter.post("/funcoes/", registarFuncoesController.handle);
backendRouter.post("/cp/", registarCpController.handle);
backendRouter.post("/atividades/", criarAtividadeController.handle);


export { backendRouter };

