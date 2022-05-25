import express from "express";

import { AgendarAvaliacaoController } from "../controllers/agendamentos/aluno/agendarAvaliacaoController";
import { AgendarDesafiosController } from "../controllers/agendamentos/aluno/agendarDesafiosController";
import { RemoverAgendarAvaliacaoController } from "../controllers/agendamentos/aluno/removerAgendarAvaliacaoController";
import { RemoverAgendarDesafiosController } from "../controllers/agendamentos/aluno/removerAgendarDesafiosController";
import { VerAgendamentosAvaliacoesAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosAvaliacoesAlunoController";
import { VerAgendamentosDesafiosAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosDesafiosAlunoController";
import { VerAvaliacaoAlunoController } from "../controllers/avaliacoes/verAvaliacaoAlunoController";
import { VerGinasiosUserController } from "../controllers/ginasios/verGinasiosUserController";
import { EditarPlanoTreinoRealizadoController } from "../controllers/plano/editarPlanoTreinoRealizadoController";
import { ObterPlanoTreinoSemanalController } from "../controllers/plano/obterPlanoDeTreinoSemanalController";
import { RemoverPlanoTreinoRealizadoController } from "../controllers/plano/removerPlanoTreinoRealizadoController";
import { CriarTreinosController } from "../controllers/treinos/criarTreinosController";
import { EditarTreinosController } from "../controllers/treinos/editarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";
import { VerTreinosAlunosController } from "../controllers/treinos/verTreinosAlunosController";



const alunoRouter = express.Router();

const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacaoAlunoController();
const verTreinosAlunosController = new VerTreinosAlunosController();
const editarTreinosController = new EditarTreinosController();
const obterPlanoTreinoSemanalController = new ObterPlanoTreinoSemanalController();
const agendarDesafiosController = new AgendarDesafiosController();
const agendarAvaliacaoController = new AgendarAvaliacaoController();
const removerAgendarDesafiosController = new RemoverAgendarDesafiosController();
const removerAgendarAvaliacaoController = new RemoverAgendarAvaliacaoController();
const verAgendamentosDesafiosAlunoController = new VerAgendamentosDesafiosAlunoController();
const verAgendamentosAvaliacoesAlunoController = new VerAgendamentosAvaliacoesAlunoController();
const editarPlanoTreinoRealizadoController = new EditarPlanoTreinoRealizadoController();
const removerPlanoTreinoRealizadoController = new RemoverPlanoTreinoRealizadoController();
const verGinasiosUserController = new VerGinasiosUserController();

alunoRouter.get("/:alunoId/ginasios", verGinasiosUserController.handle);

//#region Treinos
alunoRouter.post("/:alunoId/treinos", criarTreinosController.handle);
alunoRouter.delete("/:alunoId/treino/:treino_id", removerTreinosController.handle);
alunoRouter.get("/:alunoId/treinos/", verTreinosAlunosController.handle);
alunoRouter.put("/:alunoId/treinos/:treino_id", editarTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/:userId/avaliacoes/:alunoId", verAvaliacoesController.handle);
//#endregion

//#region Plano de Treino
alunoRouter.put("/:alunoId/plano/:plano_id/realizado", editarPlanoTreinoRealizadoController.handle);
alunoRouter.get("/:alunoId/planoTreino/:startDate/:endDate", obterPlanoTreinoSemanalController.handle);
alunoRouter.delete("/:alunoId/plano/:plano_id/realizado", removerPlanoTreinoRealizadoController.handle);
//#endregion

//#region agendamentos
alunoRouter.post("/:alunoId/agenda/desafios/:id/", agendarDesafiosController.handle);
alunoRouter.post("/:alunoId/agenda/avaliacao/", agendarAvaliacaoController.handle);
alunoRouter.delete("/:alunoId/agenda/desafios/:agendamento_id/agendamento/", removerAgendarDesafiosController.handle);
alunoRouter.delete("/:alunoId/agenda/avaliacao/:agendamento_id/agendamento/", removerAgendarAvaliacaoController.handle);
alunoRouter.get("/:alunoId/agenda/desafios/", verAgendamentosDesafiosAlunoController.handle);
alunoRouter.get("/:alunoId/agenda/avaliacoes/", verAgendamentosAvaliacoesAlunoController.handle);
//#endregion

export { alunoRouter }
