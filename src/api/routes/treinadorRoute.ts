import express from "express";
const treinadorRouter = express.Router();

//Imports
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { CriarComentarioController } from "../controllers/treinador/comentarios/criarComentarioController";
import { VerTodosOsExerciciosTreinadoresController } from "../controllers/treinador/exercicios/VerTodosOsExerciciosTreinadoresController";
import { VerTodosTreinosDosAlunosController } from "../controllers/treinador/treinos/verTodosTreinosDosAlunosController";


//
const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();

//#region Comentarios
treinadorRouter.post("/posts/:id/comentarios/",verificarAutenticacao, criarComentarioController.handle);
//#endregion

//#region Exercicios
treinadorRouter.get("/exercicios/treinador", verTodosOsExerciciosTreinadoresController.handle);
//#endregion

//#region Treinos
treinadorRouter.get("/treinos/treinador", verTodosTreinosDosAlunosController.handle);
//#endregion


export { treinadorRouter };

