import express from "express";
import { AgendarAvaliacaoController } from "../controllers/agendamentos/aluno/agendarAvaliacaoController";
import { AgendarDesafiosController } from "../controllers/agendamentos/aluno/agendarDesafiosController";
import { RemoverAgendarAvaliacaoController } from "../controllers/agendamentos/aluno/removerAgendarAvaliacaoController";
import { RemoverAgendarDesafiosController } from "../controllers/agendamentos/aluno/removerAgendarDesafiosController";
import { VerAgendamentosAvaliacoesAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosAvaliacoesAlunoController";
import { VerAgendamentosDesafiosAlunoController } from "../controllers/agendamentos/aluno/verAgendamentosDesafiosAlunoController";
import { VerAvaliacoesController } from "../controllers/avaliacoes/verAvalicaoController";
import { VerDesafiosController } from "../controllers/desafios/verDesafiosController";
import { VerPerfilController } from "../controllers/perfil/verPerfilController";
import { EditarPlanoTreinoRealizadoController } from "../controllers/plano/editarPlanoTreinoRealizadoController";
import { ObterPlanoTreinoSemanalController } from "../controllers/plano/obterPlanoDeTreinoSemanal";
import { RemoverPlanoTreinoRealizadoController } from "../controllers/plano/removerPlanoTreinoRealizadoController";


const alunoRouter = express.Router();

import { CriarTreinosController  } from "../controllers/treinos/criarTreinosController";
import { EditarTreinosController } from "../controllers/treinos/editarTreinosController";
import { RemoverTreinosController } from "../controllers/treinos/removerTreinosController";
import { VerTreinosAlunosController } from "../controllers/treinos/verTreinosAlunosController";


const criarTreinosController = new CriarTreinosController();
const removerTreinosController = new RemoverTreinosController();
const verAvaliacoesController = new VerAvaliacoesController();
const verDesafiosController = new VerDesafiosController();
const verPerfilController = new VerPerfilController();
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
alunoRouter.post("/user/:id/treinos", criarTreinosController.handle);
alunoRouter.delete("/:id/treino/:treino_id", removerTreinosController.handle);
alunoRouter.get("/:id/treinos/", verTreinosAlunosController.handle);
alunoRouter.put("/:uId/treinos/:treino_id", editarTreinosController.handle);
//#endregion

//#region avaliacao
alunoRouter.get("/:id/avaliacoes", verAvaliacoesController.handle);
//#endregion

//#region publicaçoes
alunoRouter.put("/")
//#endregion

//#region Plano de Treino
alunoRouter.put("/:aluno_id/plano/:plano_id/realizado", editarPlanoTreinoRealizadoController.handle);
alunoRouter.post("/planoTreino/", obterPlanoTreinoSemanalController.handle);
alunoRouter.delete("/:aluno_id/plano/:plano_id/realizado", removerPlanoTreinoRealizadoController.handle);
//#endregion

//#region desafio
alunoRouter.get("/:id/desafios", verDesafiosController.handle);
//#end region

//#region perfil
alunoRouter.get("/user/:id", verPerfilController.handle);
//#end region

//#region agendamentos
alunoRouter.post("/agenda/desafios/:id/", agendarDesafiosController.handle);
alunoRouter.post("/agenda/avaliacao/", agendarAvaliacaoController.handle);
alunoRouter.delete("/agenda/desafios/:agendamento_id/agendamento/:id/", removerAgendarDesafiosController.handle);
alunoRouter.delete("/agenda/avaliacao/:agendamento_id/agendamento/:id/", removerAgendarAvaliacaoController.handle);
alunoRouter.get("/agenda/desafios/:id", verAgendamentosDesafiosAlunoController.handle);
alunoRouter.get("/agenda/avaliacoes/:id", verAgendamentosAvaliacoesAlunoController.handle);
//#endregion

export { alunoRouter }
