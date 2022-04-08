import express from "express";
const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";

const criarTreinosController = new CriarTreinosController();
//#region Treinos
alunoRouter.post("/user/:id/treinos", criarTreinosController.handle);
//#endregion

export { alunoRouter }
