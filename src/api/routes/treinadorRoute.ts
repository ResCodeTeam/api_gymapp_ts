import express from "express";
const treinadorRouter = express.Router();

//Imports

import { CriarComentarioController } from "../controllers/posts/comments/criarComentarioController";
import { VerTodosTreinosDosAlunosController } from "../controllers/treinos/verTodosTreinosDosAlunosController";
import { VerTodosOsExerciciosTreinadoresController } from "../controllers/Exercicios/VerTodosOsExerciciosTreinadoresController";
import { RemoverAvaliacaoController } from "../controllers/avaliacoes/removerAvaliacaoController";
import { EditarAvaliacaoController } from "../controllers/avaliacoes/editarAvaliacaoController";
import { RemoverExercicioController } from "../controllers/Exercicios/removerExercicioController"
import { CriarExercicioController } from "../controllers/Exercicios/criarExercicioController";
import { CriarAvaliacaoController } from "../controllers/avaliacoes/criarAvaliacaoController";
import { AdicionarExerciciosImagensController } from "../controllers/Exercicios/editar/adicionarExerciciosImagensController";
import { EditarExercicioController } from "../controllers/Exercicios/editarExercicioController";
import { RemoverExercicioImagemController } from "../controllers/Exercicios/editar/removerExercicioImagemController";
import { AdicionarExercicioMusculoController } from "../controllers/Exercicios/musculos/adicionarExercicioMusculoController";
import { RemoverExercicioMusculoController } from "../controllers/Exercicios/musculos/removerExercicioMusculoController";
import { VerAgendamentoAvaliacoesController } from "../controllers/agendamentos/treinador/verAgendamentoAvaliacoesController";
import { VerAgendamentosDesafiosController } from "../controllers/agendamentos/treinador/verAgendamentosDesafiosController";
import { AceitarAvaliacoesController } from "../controllers/agendamentos/treinador/aceitarAvaliacoesController";
import { AceitarDesafiosController } from "../controllers/agendamentos/treinador/aceitarDesafiosController";
import { RemoverIsAceiteAvaliacoesController } from "../controllers/agendamentos/treinador/removerIsAceiteAvaliacoesController";
import { RemoverIsAceiteDesafiosController } from "../controllers/agendamentos/treinador/removerIsAceiteDesafiosController";
import { CriarPlanoTreinoController } from "../controllers/plano/criarPlanoTreinoController";
import { RemoverPlanoTreinoController } from "../controllers/plano/removerPlanoTreinoController";
import { VerMeusExerciciosController } from "../controllers/Exercicios/verMeusExerciciosController";
import { ObterPlanoTreinoAlunoController } from "../controllers/plano/obterPlanoTreinoAlunoController";
import { SubmissaoDesafioController } from "../controllers/desafios/submissoes/submissaoDesafioController";
import { EditarPlanoTreinoController } from "../controllers/plano/editarPlanoTreinoController";
import { VerAvaliacaoAlunoController } from "../controllers/avaliacoes/verAvaliacaoAlunoController";
import { VerLocaisMedidaController } from "../controllers/localMedida/verLocaisMedidaController";
import { RemoverSubmissaoDesafioController } from "../controllers/desafios/submissoes/removersubmissaoDesafioController";

const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();

const editarAvaliacao = new EditarAvaliacaoController()
const removerAvaliacao = new RemoverAvaliacaoController()

const aceitarDesafiosController = new AceitarDesafiosController();
const aceitarAvaliacoesController = new AceitarAvaliacoesController();

const criarAvaliacaoController = new CriarAvaliacaoController();

const removerExercicioController = new RemoverExercicioController();
const criarExercicioController = new CriarExercicioController();
const adicionarExercicioImagensController = new AdicionarExerciciosImagensController();
const removerExercicioImagemController = new RemoverExercicioImagemController();
const editarExercicioController = new EditarExercicioController();

const adicionarExercicioMusculoController = new AdicionarExercicioMusculoController();
const removerExercicioMusculoController = new RemoverExercicioMusculoController();
const verAgendamentosDesafiosController = new VerAgendamentosDesafiosController();
const verAgendamentoAvaliacoesController = new VerAgendamentoAvaliacoesController();

const removerIsAceiteDesafiosController = new RemoverIsAceiteDesafiosController();
const removerIsAceiteAvaliacoesController = new RemoverIsAceiteAvaliacoesController();
const criarPlanoTreinoController = new CriarPlanoTreinoController();
const verMeusExerciciosController = new VerMeusExerciciosController();
const removerPlanoTreinoController = new RemoverPlanoTreinoController();
const obterPlanoTreinoAlunoController = new ObterPlanoTreinoAlunoController()
const submissaoDesafioController = new SubmissaoDesafioController();
const editarPlanoTreinoController = new EditarPlanoTreinoController();
const verAvaliacaoAlunoController = new VerAvaliacaoAlunoController();
const verLocaisMedidaController = new VerLocaisMedidaController();
const removerSubmissaoDesafioController = new RemoverSubmissaoDesafioController();


//#region Exercicios
treinadorRouter.get("/exercicios/", verTodosOsExerciciosTreinadoresController.handle);
treinadorRouter.delete("/:treinadorId/exercicios/:exercicios_id/", removerExercicioController.handle);
treinadorRouter.post("/:treinadorId/exercicios/", criarExercicioController.handle);
treinadorRouter.put("/:treinadorId/exercicios/:exercicios_id", editarExercicioController.handle);
treinadorRouter.post("/:treinadorId/exercicios/:exercicioId/imagens", adicionarExercicioImagensController.handle)
treinadorRouter.delete("/:treinadorId/exercicios/:exercicioId/imagens/:imagemId", removerExercicioImagemController.handle)
treinadorRouter.post("/:treinadorId/exercicios/:exercicioId/musculos/:musculoId", adicionarExercicioMusculoController.handle);
treinadorRouter.delete("/:treinadorId/exercicios/:exercicioId/musculos/:musculoId", removerExercicioMusculoController.handle);
treinadorRouter.get("/:treinadorId/exercicios/treinador", verMeusExerciciosController.handle);
//#endregion

//#region Treinos
treinadorRouter.get("/:treinadorId/treinos/", verTodosTreinosDosAlunosController.handle);
//#endregion

//#region Desafios
treinadorRouter.post("/:treinadorId/desafio/:desafioId/submissoes", submissaoDesafioController.handle);
treinadorRouter.delete("/:treinadorId/desafio/:desafioId/submissoes/:id", removerSubmissaoDesafioController.handle);
//#endregion

//#region Avaliacoes
treinadorRouter.put("/:treinadorId/avaliacoes/:id", editarAvaliacao.handle);
treinadorRouter.delete("/:treinadorId/avaliacoes/:id", removerAvaliacao.handle);
treinadorRouter.post("/:treinadorId/avaliacoes/:id", criarAvaliacaoController.handle);
treinadorRouter.get("/avaliacoes/:id", verAvaliacaoAlunoController.handle);
//#endregion


//#region Agendamentos
treinadorRouter.put("/:treinadorId/agenda/desafios/:id/", aceitarDesafiosController.handle);
treinadorRouter.put("/:treinadorId/agenda/avaliacao/:id/", aceitarAvaliacoesController.handle);
treinadorRouter.delete("/:treinadorId/agenda/desafios/:agendamento_id/", removerIsAceiteDesafiosController.handle);
treinadorRouter.delete("/:treinadorId/agenda/avaliacao/:agendamento_id/", removerIsAceiteAvaliacoesController.handle);
treinadorRouter.get("/agenda/desafios/", verAgendamentosDesafiosController.handle);
treinadorRouter.get("/agenda/avaliacoes/", verAgendamentoAvaliacoesController.handle);
//#endregion

//#region PlanoTreino
treinadorRouter.delete("/:treinadorId/plano/:plano_id/", removerPlanoTreinoController.handle);
treinadorRouter.get("/:treinadorId/plano/:id/:startDate/:endDate", obterPlanoTreinoAlunoController.handle);
treinadorRouter.post("/:treinadorId/planoTreino", criarPlanoTreinoController.handle);
treinadorRouter.put("/:treinadorId/plano/:id/", editarPlanoTreinoController.handle);
//#endregion

//#region Locais Medida
treinadorRouter.get("/:treinadorId/locaisMedida/", verLocaisMedidaController.handle);
//endregion

export { treinadorRouter };
