import express from "express";
const adminTreinadorRouter = express.Router();

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { ObterAlunosGinasioController } from "../controllers/alunos/obterAlunosGinasioController";
import { verificarAdminTreinador } from "../middlewares/verificarAdminTreinador";
import { VerTodosMusculosController } from "../controllers/musculos/verTodosMusculosController";

const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()
const encerrarDesafiosController = new EncerrarDesafiosController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();
const verTodosMusculosController = new VerTodosMusculosController();

//#region Desafios
adminTreinadorRouter.put("/desafio/:id/editar",verificarAutenticacao,verificarAdminTreinador, editarDesafio.handle);
adminTreinadorRouter.delete("/desafio/:id",verificarAutenticacao,verificarAdminTreinador,  removerDesafio.handle);
adminTreinadorRouter.post("/ginasio/:id/desafio/", verificarAutenticacao, verificarAdminTreinador, criarDesafio.handle);
adminTreinadorRouter.put("/desafios/:id",verificarAutenticacao,verificarAdminTreinador,  encerrarDesafiosController.handle);
//#endregion

//#region 
adminTreinadorRouter.get("/alunos/ginasio/:id", obterAlunosGinasioController.handle);
//#endregion

//#region Músculos
adminTreinadorRouter.get("/musculos/", verificarAutenticacao, verificarAdminTreinador,verTodosMusculosController.handle);
//endregion

export { adminTreinadorRouter };