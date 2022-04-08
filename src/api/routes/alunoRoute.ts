import express from "express";
const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";

const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();

//#region Treinos
alunoRouter.post("/user/:id/treinos", criarTreinosController.handle);
alunoRouter.delete("/treino/:id", removerTreinosController.handle);
//#endregion

export { alunoRouter }
