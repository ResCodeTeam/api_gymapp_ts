import express from "express";
const adminTreinadorRouter = express.Router();

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { VerDesafiosParticipantesController } from "../controllers/desafios/verDesafiosParticipantesController";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { ObterAlunosGinasioController } from "../controllers/alunos/obterAlunosGinasioController";
import { verificarAdminTreinador } from "../middlewares/verificarAdminTreinador";

const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()
const verDesafiosParticipantesController = new VerDesafiosParticipantesController();
const encerrarDesafiosController = new EncerrarDesafiosController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();

//#region Desafios
adminTreinadorRouter.put("/desafio/:id/editar",verificarAutenticacao,verificarAdminTreinador, editarDesafio.handle);
adminTreinadorRouter.delete("/desafio/:id",verificarAutenticacao,verificarAdminTreinador,  removerDesafio.handle);
adminTreinadorRouter.post("/ginasio/:id/desafio/", verificarAutenticacao, verificarAdminTreinador, criarDesafio.handle);
adminTreinadorRouter.get("/desafios/",verificarAutenticacao,verificarAdminTreinador,  verDesafiosParticipantesController.handle);
adminTreinadorRouter.put("/desafios/:id",verificarAutenticacao,verificarAdminTreinador,  encerrarDesafiosController.handle);
//#endregion

//#region 
adminTreinadorRouter.get("/alunos/ginasio/:id", obterAlunosGinasioController.handle);
//#endregion

export { adminTreinadorRouter };