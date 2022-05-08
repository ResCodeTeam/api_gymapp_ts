import express from "express";
const treinadorRouter = express.Router();

//Imports
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
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
import { verificarTreinador } from "../middlewares/verificarTreinador";
import { VerAvaliacaoAlunoController } from "../controllers/avaliacoes/verAvaliacaoAlunoController";
import { VerLocaisMedidaController } from "../controllers/localMedida/verLocaisMedidaController";
import { RemoverSubmissaoDesafioController } from "../controllers/desafios/submissoes/removersubmissaoDesafioController";


//
const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();

const editarAvaliacao = new EditarAvaliacaoController()
const removerAvaliacao = new RemoverAvaliacaoController()

const aceitarDesafiosController = new AceitarDesafiosController();
const aceitarAvaliacoesController = new AceitarAvaliacoesController();

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
treinadorRouter.get("/exercicios/",verificarAutenticacao,verificarTreinador, verTodosOsExerciciosTreinadoresController.handle);
treinadorRouter.delete("/exercicios/:exercicios_id/", verificarAutenticacao, verificarTreinador, removerExercicioController.handle);
treinadorRouter.post("/exercicios/", verificarAutenticacao, verificarTreinador, criarExercicioController.handle);
treinadorRouter.put("/exercicios/:exercicios_id",verificarAutenticacao, verificarTreinador, editarExercicioController.handle);
treinadorRouter.post("/exercicios/:exercicioId/imagens",verificarAutenticacao, verificarTreinador, adicionarExercicioImagensController.handle)
treinadorRouter.delete("/exercicios/:exercicioId/imagens/:imagemId",verificarAutenticacao,verificarTreinador, removerExercicioImagemController.handle)
treinadorRouter.post("/exercicios/:exercicioId/musculos/:musculoId",verificarAutenticacao, verificarTreinador, adicionarExercicioMusculoController.handle);
treinadorRouter.delete("/exercicios/:exercicioId/musculos/:musculoId",verificarAutenticacao, verificarTreinador, removerExercicioMusculoController.handle);
treinadorRouter.get("/exercicios/treinador", verificarAutenticacao, verificarTreinador, verMeusExerciciosController.handle);
//#endregion

//#region Treinos
treinadorRouter.get("/treinos/", verificarAutenticacao,verificarTreinador,verTodosTreinosDosAlunosController.handle);
//#endregion

//#region Desafios
treinadorRouter.post("/desafio/:desafioId/submissoes", verificarAutenticacao, verificarTreinador, submissaoDesafioController.handle);
treinadorRouter.delete("/desafio/:desafioId/submissoes/:id", verificarAutenticacao, verificarTreinador, removerSubmissaoDesafioController.handle);
//#endregion

//#region Avaliacoes
treinadorRouter.put("/avaliacoes/:id",verificarAutenticacao,verificarTreinador, editarAvaliacao.handle);
treinadorRouter.delete("/avaliacoes/:id",verificarAutenticacao,verificarTreinador, removerAvaliacao.handle);
treinadorRouter.post("/avaliacoes/:id", verificarAutenticacao, verificarTreinador, criarAvaliacaoController.handle);
treinadorRouter.get("/avaliacoes/:id", verificarAutenticacao, verificarTreinador, verAvaliacaoAlunoController.handle);
//#endregion


//#region Agendamentos
treinadorRouter.put("/agenda/desafios/:id/", verificarAutenticacao, verificarTreinador, aceitarDesafiosController.handle);
treinadorRouter.put("/agenda/avaliacao/:id/", verificarAutenticacao, verificarTreinador, aceitarAvaliacoesController.handle);
treinadorRouter.delete("/agenda/desafios/:agendamento_id/",verificarAutenticacao, verificarTreinador, removerIsAceiteDesafiosController.handle);
treinadorRouter.delete("/agenda/avaliacao/:agendamento_id/", verificarAutenticacao, verificarTreinador, removerIsAceiteAvaliacoesController.handle);
treinadorRouter.get("/agenda/desafios/",verificarAutenticacao, verificarTreinador, verAgendamentosDesafiosController.handle);
treinadorRouter.get("/agenda/avaliacoes/",verificarAutenticacao, verificarTreinador, verAgendamentoAvaliacoesController.handle);
//#endregion

//#region PlanoTreino
treinadorRouter.delete("/plano/:plano_id/", verificarAutenticacao, verificarTreinador, removerPlanoTreinoController.handle);
treinadorRouter.get("/plano/:uid/:startDate/:endDate", verificarAutenticacao, verificarTreinador, obterPlanoTreinoAlunoController.handle);
treinadorRouter.post("/planoTreino", verificarAutenticacao, verificarTreinador, criarPlanoTreinoController.handle); 
treinadorRouter.put("/plano/:id/",verificarAutenticacao,verificarTreinador, editarPlanoTreinoController.handle);
//#endregion

//#region Locais Medida
treinadorRouter.get("/locaisMedida/", verificarAutenticacao, verificarTreinador, verLocaisMedidaController.handle);
//endregion

export { treinadorRouter };
