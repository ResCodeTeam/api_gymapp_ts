import express from "express";
const adminTreinadorRouter = express.Router();

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";

import { VerTodosMusculosController } from "../controllers/musculos/verTodosMusculosController";
import { ObterAlunosMarcaController } from "../controllers/treinadores/obterAlunosMarcaController";


const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()
const encerrarDesafiosController = new EncerrarDesafiosController();
const verTodosMusculosController = new VerTodosMusculosController();
const obterAlunosMarcaController = new ObterAlunosMarcaController();

//#region Desafios
adminTreinadorRouter.put("/:userId/desafio/:id/editar", editarDesafio.handle);
adminTreinadorRouter.delete("/:userId/desafio/:id", removerDesafio.handle);
adminTreinadorRouter.post("/:userId/ginasio/:id/desafio/", criarDesafio.handle);
adminTreinadorRouter.put("/:userId/desafio/:id", encerrarDesafiosController.handle);
//#endregion

//#region Músculos
adminTreinadorRouter.get("/:userId/musculos/", verTodosMusculosController.handle);
//endregion
adminTreinadorRouter.get("/:userId/marca/:marcaId/alunos", obterAlunosMarcaController.handle);



export { adminTreinadorRouter };