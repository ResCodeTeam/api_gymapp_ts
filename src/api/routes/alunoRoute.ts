import express from "express";

import { AgendarAvaliacaoController } from "../controllers/agendamentos/aluno/agendarAvaliacaoController";
import { AgendarDesafiosController } from "../controllers/agendamentos/aluno/agendarDesafiosController";
import { RemoverAgendarAvaliacaoController } from "../controllers/agendamentos/aluno/removerAgendarAvaliacaoController";
import { RemoverAgendarDesafiosController } from "../controllers/agendamentos/aluno/removerAgendarDesafiosController";
import { VerAgendamentosAvaliacoesAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosAvaliacoesAlunoController";
import { VerAgendamentosDesafiosAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosDesafiosAlunoController";
import { VerAvaliacoesController } from "../controllers/avaliacoes/verAvaliacaoController";
import { EditarPlanoTreinoRealizadoController } from "../controllers/plano/editarPlanoTreinoRealizadoController";
import { ObterPlanoTreinoSemanalController } from "../controllers/plano/obterPlanoDeTreinoSemanalController";
import { RemoverPlanoTreinoRealizadoController } from "../controllers/plano/removerPlanoTreinoRealizadoController";
import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { EditarTreinosController } from "../controllers/treinos/editarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";
import { VerTreinosAlunosController } from "../controllers/treinos/verTreinosAlunosController";
import { verificarAluno } from "../middlewares/verificarAluno";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";

const alunoRouter = express.Router();

const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacoesController();
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


//#region Treinos
alunoRouter.post("/treinos", verificarAutenticacao,verificarAluno, criarTreinosController.handle);
alunoRouter.delete("/treino/:treino_id", verificarAutenticacao, verificarAluno, removerTreinosController.handle);
alunoRouter.get("/treinos/", verificarAutenticacao, verificarAluno, verTreinosAlunosController.handle);
alunoRouter.put("/treinos/:treino_id", verificarAutenticacao, verificarAluno, editarTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/avaliacoes", verificarAutenticacao, verificarAluno, verAvaliacoesController.handle);
//#endregion

//#region Plano de Treino
alunoRouter.put("/plano/:plano_id/realizado", verificarAutenticacao, verificarAluno, editarPlanoTreinoRealizadoController.handle);
alunoRouter.get("/planoTreino/:startDate/:endDate", verificarAutenticacao, verificarAluno, obterPlanoTreinoSemanalController.handle);
alunoRouter.delete("/plano/:plano_id/realizado", verificarAutenticacao, verificarAluno, removerPlanoTreinoRealizadoController.handle);
//#endregion

//#region agendamentos
alunoRouter.post("/agenda/desafios/:id/", verificarAutenticacao, verificarAluno, agendarDesafiosController.handle);
alunoRouter.post("/agenda/avaliacao/", verificarAutenticacao, verificarAluno, agendarAvaliacaoController.handle);
alunoRouter.delete("/agenda/desafios/:agendamento_id/agendamento/", verificarAutenticacao, verificarAluno, removerAgendarDesafiosController.handle);
alunoRouter.delete("/agenda/avaliacao/:agendamento_id/agendamento/", verificarAutenticacao, verificarAluno, removerAgendarAvaliacaoController.handle);
alunoRouter.get("/agenda/desafios/", verificarAutenticacao, verificarAluno, verAgendamentosDesafiosAlunoController.handle);
alunoRouter.get("/agenda/avaliacoes/", verificarAutenticacao, verificarAluno, verAgendamentosAvaliacoesAlunoController.handle);
//#endregion

export { alunoRouter }
