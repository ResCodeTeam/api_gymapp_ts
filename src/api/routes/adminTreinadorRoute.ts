import express from "express";
const adminTreinadorRouter = express.Router();

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { VerDesafiosParticipantesController } from "../controllers/desafios/verDesafiosParticipantesController";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";

const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()
const verDesafiosParticipantesController = new VerDesafiosParticipantesController();
const encerrarDesafiosController = new EncerrarDesafiosController();

//#region Desafios
adminTreinadorRouter.put("/desafio/:id", editarDesafio.handle);
adminTreinadorRouter.delete("/desafio/:id", removerDesafio.handle);
adminTreinadorRouter.post("/ginasio/:id/desafio/", criarDesafio.handle);
adminTreinadorRouter.get("/desafios/", verDesafiosParticipantesController.handle);
adminTreinadorRouter.put("/desafios/:id", encerrarDesafiosController.handle);
//#endregion

export { adminTreinadorRouter };