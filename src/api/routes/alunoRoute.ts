import express from "express";
import { AgendarAvaliacaoController } from "../controllers/agendamentos/aluno/agendarAvaliacaoController";
import { AgendarDesafiosController } from "../controllers/agendamentos/aluno/agendarDesafiosController";
import { RemoverAgendarAvaliacaoController } from "../controllers/agendamentos/aluno/removerAgendarAvaliacaoController";
import { RemoverAgendarDesafiosController } from "../controllers/agendamentos/aluno/removerAgendarDesafiosController";
import { VerAgendamentosAvaliacoesAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosAvaliacoesAlunoController";
import { VerAgendamentosDesafiosAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosDesafiosAlunoController";
import { VerAvaliacoesController } from "../controllers/avaliacoes/verAvalicaoController";
import { VerDesafiosController } from "../controllers/desafios/verDesafiosController";
import { EditarPlanoTreinoRealizadoController } from "../controllers/plano/editarPlanoTreinoRealizadoController";
import { ObterPlanoTreinoSemanalController } from "../controllers/plano/obterPlanoDeTreinoSemanalController";
import { RemoverPlanoTreinoRealizadoController } from "../controllers/plano/removerPlanoTreinoRealizadoController";


const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { EditarTreinosController } from "../controllers/treinos/editarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";
import { VerTreinosAlunosController } from "../controllers/treinos/verTreinosAlunosController";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";


const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacoesController();
const verDesafiosController = new VerDesafiosController();
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
alunoRouter.post("/user/treinos", verificarAutenticacao, criarTreinosController.handle);
alunoRouter.delete("/treino/:treino_id", verificarAutenticacao, removerTreinosController.handle);
alunoRouter.get("/treinos/", verificarAutenticacao, verTreinosAlunosController.handle);
alunoRouter.put("/treinos/:treino_id", verificarAutenticacao, editarTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/avaliacoes", verificarAutenticacao, verAvaliacoesController.handle);
//#endregion

//#region Plano de Treino
alunoRouter.put("/plano/:plano_id/realizado", verificarAutenticacao, editarPlanoTreinoRealizadoController.handle);
alunoRouter.get("/planoTreino/:startDate/:endDate", verificarAutenticacao, obterPlanoTreinoSemanalController.handle);
alunoRouter.delete("/plano/:plano_id/realizado", verificarAutenticacao, removerPlanoTreinoRealizadoController.handle);
//#endregion

//#region desafio
alunoRouter.get("/:id/desafios", verificarAutenticacao ,verDesafiosController.handle);
//#end region

//#region agendamentos
alunoRouter.post("/agenda/desafios/:id/", verificarAutenticacao, agendarDesafiosController.handle);
alunoRouter.post("/agenda/avaliacao/", verificarAutenticacao, agendarAvaliacaoController.handle);
alunoRouter.delete("/agenda/desafios/:agendamento_id/agendamento/", verificarAutenticacao, removerAgendarDesafiosController.handle);
alunoRouter.delete("/agenda/avaliacao/:agendamento_id/agendamento/", verificarAutenticacao, removerAgendarAvaliacaoController.handle);
alunoRouter.get("/agenda/desafios/", verificarAutenticacao, verAgendamentosDesafiosAlunoController.handle);
alunoRouter.get("/agenda/avaliacoes/", verificarAutenticacao, verAgendamentosAvaliacoesAlunoController.handle);
//#endregion

export { alunoRouter }
