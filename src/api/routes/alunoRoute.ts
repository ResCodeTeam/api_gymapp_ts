import express from "express";
import { VerAvaliacoesController } from "../controllers/avaliacoes/verAvalicaoController";
import { InscreverDesafiosController } from "../controllers/desafios/inscricaoDesafioController";
import { VerDesafiosController } from "../controllers/desafios/verDesafiosController";
import { VerPerfilController } from "../controllers/perfil/verPerfilController";

const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";


const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacoesController();
const inscreverDesafiosController = new InscreverDesafiosController();
const verDesafiosController=new VerDesafiosController();
const verPerfilController=new VerPerfilController();

//#region Treinos
alunoRouter.post("/user/:id/treinos", criarTreinosController.handle);
alunoRouter.delete("/treino/:id", removerTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/:id/avaliacoes", verAvaliacoesController.handle);
//#endregion

//#region agendamento desafio
alunoRouter.put("/:id/agendamentoDesafios", inscreverDesafiosController.handle);
//#endregion

//#region desafio
alunoRouter.get("/:id/desafios", verDesafiosController.handle);

//#end region

//#region perfil
alunoRouter.get("/:id/user", verPerfilController.handle);
//#end region

export { alunoRouter }
