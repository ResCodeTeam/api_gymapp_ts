import express from "express";
const adminTreinadorRouter = express.Router();

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";

import { VerTodosMusculosController } from "../controllers/musculos/verTodosMusculosController";

const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()
const encerrarDesafiosController = new EncerrarDesafiosController();
const verTodosMusculosController = new VerTodosMusculosController();

//#region Desafios
adminTreinadorRouter.put("/:userId/desafio/:id/editar", editarDesafio.handle);
adminTreinadorRouter.delete("/:userId/desafio/:id", removerDesafio.handle);
adminTreinadorRouter.post("/:userId/ginasio/:id/desafio/", criarDesafio.handle);
adminTreinadorRouter.put("/:userId/desafio/:id", encerrarDesafiosController.handle);
//#endregion

//#region Músculos
adminTreinadorRouter.get("/:userId/musculos/", verTodosMusculosController.handle);
//endregion

export { adminTreinadorRouter };