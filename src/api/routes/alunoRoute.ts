import express from "express";
import { VerAvaliacoesController } from "../controllers/avaliacoes/verAvalicaoController";
import { InscreverDesafiosController } from "../controllers/desafios/inscricaoDesafioController";

const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";


const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacoesController();
const inscreverDesafiosController = new InscreverDesafiosController();

//#region Treinos
alunoRouter.post("/user/:id/treinos", criarTreinosController.handle);
alunoRouter.delete("/treino/:id", removerTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/:id/avaliacoes", verAvaliacoesController.handle);
//#endregion

//#region agendamento desafio
alunoRouter.put("/:id/agendamento_desafios", inscreverDesafiosController.handle);
//#endregion

export { alunoRouter }
