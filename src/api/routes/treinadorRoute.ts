import express from "express";
const treinadorRouter = express.Router();

//Imports
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { CriarComentarioController } from "../controllers/posts/comments/criarComentarioController";
import { VerTodosTreinosDosAlunosController } from "../controllers/treinos/verTodosTreinosDosAlunosController";

import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";

import { VerTodosOsExerciciosTreinadoresController } from "../controllers/Exercicios/VerTodosOsExerciciosTreinadoresController";

import { RemoverAvaliacaoController } from "../controllers/avaliacoes/removerAvaliacaoController";
import { EditarAvaliacaoController } from "../controllers/avaliacoes/editarAvaliacaoController";


import { RemoverExercicioController } from "../controllers/Exercicios/removerExercicioController"
import { CriarExercicioController } from "../controllers/Exercicios/criarExercicioController";
import { CriarAvaliacaoService } from "../services/avaliacoes/criarAvaliacaoService";
import { CriarAvaliacaoController } from "../controllers/avaliacoes/criarAvaliacaoController";

import { AdicionarExerciciosImagensController } from "../controllers/Exercicios/editar/adicionarExerciciosImagensController";


import { EditarDesafioController } from "../controllers/desafios/EditarDesafioController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
import { EditarExercicioController } from "../controllers/Exercicios/editarExercicioController";
import { RemoverExercicioImagemController } from "../controllers/Exercicios/editar/removerExercicioImagemController";
import { AdicionarExercicioMusculoController } from "../controllers/Exercicios/musculos/adicionarExercicioMusculoController";
import { RemoverExercicioMusculoController } from "../controllers/Exercicios/musculos/removerExercicioMusculoController";
import { VerAgendamentoAvaliacoesController } from "../controllers/agendamentos/treinador/verAgendamentoAvaliacoesController";
import { VerAgendamentosDesafiosController } from "../controllers/agendamentos/treinador/verAgendamentosDesafiosController";
import { SubmissaoDesafioController } from "../controllers/desafios/submissoes/submissaoDesafioController";
import { AceitarAvaliacoesController } from "../controllers/agendamentos/treinador/aceitarAvaliacoesController";
import { AceitarDesafiosController } from "../controllers/agendamentos/treinador/aceitarDesafiosController";
import { RemoverIsAceiteAvaliacoesController } from "../controllers/agendamentos/treinador/removerIsAceiteAvaliacoesController";
import { RemoverIsAceiteDesafiosController } from "../controllers/agendamentos/treinador/removerIsAceiteDesafiosController";
import { CriarPlanoTreinoController } from "../controllers/plano/criarPlanoTreinoController";
import { RemoverPlanoTreinoController } from "../controllers/plano/removerPlanoTreinoController";
import { VerMeusExerciciosController } from "../controllers/Exercicios/verMeusExerciciosController";


//
const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();
const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafiosController()

const editarAvaliacao = new EditarAvaliacaoController()
const removerAvaliacao = new RemoverAvaliacaoController()

const aceitarDesafiosController = new AceitarDesafiosController();
const aceitarAvaliacoesController = new AceitarAvaliacoesController();

const criarAvaliacaoService = new CriarAvaliacaoService();

const criarAvaliacaoController =new CriarAvaliacaoController();

const removerExercicioController = new RemoverExercicioController();
const criarExercicioController = new CriarExercicioController();
const adicionarExercicioImagensController = new AdicionarExerciciosImagensController();
const removerExercicioImagemController = new RemoverExercicioImagemController();
const editarExercicioController = new EditarExercicioController();

const adicionarExercicioMusculoController = new AdicionarExercicioMusculoController();
const removerExercicioMusculoController = new RemoverExercicioMusculoController();
const verAgendamentosDesafiosController = new VerAgendamentosDesafiosController();
const verAgendamentoAvaliacoesController = new VerAgendamentoAvaliacoesController();

const submissaoDesafioController = new SubmissaoDesafioController();
const removerIsAceiteDesafiosController = new RemoverIsAceiteDesafiosController();
const removerIsAceiteAvaliacoesController = new RemoverIsAceiteAvaliacoesController();
const criarPlanoTreinoController = new CriarPlanoTreinoController();
const verMeusExerciciosController = new VerMeusExerciciosController();
//const criarPlanoTreinoController = new CriarPlanoTreinoController();
const removerPlanoTreinoController = new RemoverPlanoTreinoController();

//#region Comentarios
treinadorRouter.post("/posts/:id/comentarios/",verificarAutenticacao, criarComentarioController.handle);
//#endregion

//#region Exercicios
treinadorRouter.get("/exercicios/", verTodosOsExerciciosTreinadoresController.handle);
treinadorRouter.delete("/:id/exercicios/:exercicios_id/", removerExercicioController.handle);
treinadorRouter.post("/exercicios/", criarExercicioController.handle);
treinadorRouter.put("/:id/exercicios/:exercicios_id", editarExercicioController.handle);
treinadorRouter.post("/:treinadorId/exercicios/:exercicioId/imagens",adicionarExercicioImagensController.handle)
treinadorRouter.delete("/:treinadorId/exercicios/:exercicioId/imagens/:imagemId",removerExercicioImagemController.handle)
treinadorRouter.put("/:id/exercicios/:exercicios_id", editarExercicioController.handle);
treinadorRouter.post("/:treinadorId/exercicios/:exercicioId/musculos/:musculoId", adicionarExercicioMusculoController.handle);
treinadorRouter.delete("/:treinadorId/exercicios/:exercicioId/musculos/:musculoId", removerExercicioMusculoController.handle);
treinadorRouter.get("/exercicios/:autorid", verMeusExerciciosController.handle);
//#endregion

//#region Treinos
treinadorRouter.get("/treinos/", verTodosTreinosDosAlunosController.handle);
//#endregion

//#region Desafios
treinadorRouter.put("/desafio/:id", editarDesafio.handle);
treinadorRouter.delete("/desafio/:id", removerDesafio.handle);
treinadorRouter.post("/desafio/:id", criarDesafio.handle)
treinadorRouter.post("/desafio/:desafioId/submissoes", submissaoDesafioController.handle)
//#endregion


//#region Avaliacoes
treinadorRouter.put("/avaliacoes/:id", editarAvaliacao.handle);
treinadorRouter.delete("/avaliacoes/:id", removerAvaliacao.handle);
treinadorRouter.post("/avaliacoes/:id", criarAvaliacaoController.handle);
//#endregion


//#region Agendamentos
treinadorRouter.put("/agenda/desafios/:id/", aceitarDesafiosController.handle);
treinadorRouter.put("/agenda/avaliacao/:id/", aceitarAvaliacoesController.handle);
treinadorRouter.delete("/agenda/desafios/:agendamento_id/", removerIsAceiteDesafiosController.handle);
treinadorRouter.delete("/agenda/avaliacao/:agendamento_id/", removerIsAceiteAvaliacoesController.handle);
treinadorRouter.get("/agenda/desafios/", verAgendamentosDesafiosController.handle);
treinadorRouter.get("/agenda/avaliacoes/", verAgendamentoAvaliacoesController.handle);
//#endregion

//#region Plano
treinadorRouter.post("/planoTreino", criarPlanoTreinoController.handle);
treinadorRouter.delete("plano/:plano_id", removerPlanoTreinoController.handle);
//#endregion

export { treinadorRouter };
