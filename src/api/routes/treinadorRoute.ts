import express from "express";
const treinadorRouter = express.Router();

//Imports
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { CriarComentarioController } from "../controllers/treinador/comentarios/criarComentarioController";
import { VerTodosTreinosDosAlunosController } from "../controllers/treinador/treinos/verTodosTreinosDosAlunosController";
// import { EditarDesafioController } from "../controllers/treinador/desafios/editarDesafioController";
import { RemoverDesafioController } from "../controllers/treinador/desafios/removerDesafioController";
// import { CriarDesafioController } from "../controllers/treinador/desafios/criarDesafioController";
import { VerTodosOsExerciciosTreinadoresController } from "../controllers/treinador/Exercicios/VerTodosOsExerciciosTreinadoresController";

import { RemoverAvaliacaoController } from "../controllers/treinador/avaliacoes/removerAvaliacaoController";
import { EditarAvaliacaoController } from "../controllers/treinador/avaliacoes/editarAvaliacaoController";

import { AgendarDesafiosController } from "../controllers/treinador/agendamentos/agendarDesafiosController";
import { AgendarAvaliacaoController } from "../controllers/treinador/agendamentos/agendarAvaliacaoController";
import { RemoverExercicioController } from "../controllers/treinador/Exercicios/removerExercicioController"
import { CriarExercicioController } from "../controllers/treinador/Exercicios/criarExercicioController";
import { CriarAvaliacaoService } from "../services/treinador/avaliacoes/criarAvaliacaoService";
import { CriarAvaliacaoController } from "../controllers/treinador/avaliacoes/criarAvaliacaoController";
import { EditarExercicioController } from "../controllers/treinador/Exercicios/editar/editarExercicioController"
import { AdicionarExerciciosImagensController } from "../controllers/treinador/Exercicios/editar/adicionarExerciciosImagensController";
import { EditarPerfilController } from "../controllers/all/perfil/editarPerfilController";

//import {CriarPlanoTreinoController } from "../controllers/treinador/plano/criarPlanoTreinoController";


//
const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();
// const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
// const criarDesafio = new CriarDesafioController()

const editarAvaliacao = new EditarAvaliacaoController()
const removerAvaliacao = new RemoverAvaliacaoController()

const  editarPerfilController = new EditarPerfilController();

const agendarDesafiosController = new AgendarDesafiosController();
const agendarAvaliacaoController = new AgendarAvaliacaoController();

const criarAvaliacaoService = new CriarAvaliacaoService();

const criarAvaliacaoController =new CriarAvaliacaoController();

const removerExercicioController = new RemoverExercicioController();
const criarExercicioController = new CriarExercicioController();
const adicionarExercicioImagensController = new AdicionarExerciciosImagensController();
const editarExercicioController = new EditarExercicioController();

//const criarPlanoTreinoController = new CriarPlanoTreinoController();

//#region Comentarios
treinadorRouter.post("/posts/:id/comentarios/",verificarAutenticacao, criarComentarioController.handle);
//#endregion

//#region Exercicios
treinadorRouter.get("/exercicios/", verTodosOsExerciciosTreinadoresController.handle);
treinadorRouter.delete("/:id/exercicios/:exercicios_id/", removerExercicioController.handle);
treinadorRouter.post("/exercicios/", criarExercicioController.handle);
treinadorRouter.put("/:id/exercicios/:exercicios_id", editarExercicioController.handle);
treinadorRouter.post("/:treinadorId/exercicios/:exercicioId/imagens",adicionarExercicioImagensController.handle)
//treinadorRouter.put("/:id/exercicios/:exercicios_id", editarExercicioController.handle);
//#endregion
treinadorRouter.put("/:id/Perfil", editarPerfilController.handle);
//#region Treinos
treinadorRouter.get("/treinos/", verTodosTreinosDosAlunosController.handle);
//#endregion

//#region Desafios
// treinadorRouter.put("/desafio/:id", editarDesafio.handle);
treinadorRouter.delete("/desafio/:id", removerDesafio.handle);
// treinadorRouter.post("/desafio/:id", criarDesafio.handle)
//#endregion


//#region Avaliacoes
treinadorRouter.put("/avaliacoes/:id", editarAvaliacao.handle);
treinadorRouter.delete("/avaliacoes/:id", removerAvaliacao.handle);
treinadorRouter.post("/avaliacoes/:id", criarAvaliacaoController.handle);
//#endregion


//#region Agendamentos
treinadorRouter.post("/agenda/desafios/:id/", agendarDesafiosController.handle);
treinadorRouter.post("/agenda/avaliacao/", agendarAvaliacaoController.handle);
//#endregion

//#region Plano
//treinadorRouter.post("/plano/", criarPlanoTreinoController.handle);
//#endregion

export { treinadorRouter };
