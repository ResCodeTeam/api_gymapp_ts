import express, { Request, Response } from "express";

import { CriarPostsController } from "../controllers/posts/criarPostsController";
import { RemoverPostController } from "../controllers/posts/removerPostController";
import { VerTodosPostsController } from "../controllers/posts/obter/verTodosPostsController";
import { VerInfoPostController } from "../controllers/posts/obter/verInfoPostController";
import { EditarPublicacaoController } from "../controllers/posts/editarPublicacaoController";
import { CriarGostoController } from "../controllers/posts/gostosPosts/criarGostoController";
import { EditarPerfilController } from "../controllers/perfil/editarPerfilController";
import { EditarPerfilPrivadoController } from "../controllers/definicoes/editarPerfilPrivadoController";
import { ObterDefinicoesController } from "../controllers/definicoes/obterDefinicoesController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { VerMeuPerfilController } from "../controllers/perfil/verMeuPerfilController";
import { EditarMencoesController } from "../controllers/definicoes/editarMencoesController";
import { CriarComentarioController } from "../controllers/posts/comments/criarComentarioController";
import { ImpedirIdentificacaoController } from "../controllers/definicoes/impedirIdentificacaoController";
import { AlterarVistoController } from "../controllers/notificacoes/alterarVistoController";
import { VerPerfilController } from "../controllers/perfil/verPerfilController";
import { VerTodosDesafiosController } from "../controllers/desafios/verTodosDesafiosController";
import { VerDesafiosDisponiveisController } from "../controllers/desafios/verDesafiosDisponiveisController";
import { RemoverGostoPublicacaoController } from "../controllers/posts/gostosPosts/removerGostoController";
import { CriarGostoCommentController } from "../controllers/posts/gostosComments/criarGostoCommentController";
import { RemoverGostoCommentController } from "../controllers/posts/gostosComments/removerGostoCommentController";
import { RemoverComentarioController } from "../controllers/posts/comments/removerComentarioController";
import { VerTodasAtividadesController } from "../controllers/atividades/verTodasAtividadesController";
import { VerNotificacoesController } from "../controllers/notificacoes/verNotificacoesController";
import { VerDesafiosSubmissoesController } from "../controllers/desafios/verDesafiosSubmissoesController";
import { VerDesafioController } from "../controllers/desafios/verDesafioController";
import { ObterAlunosGinasioController } from "../controllers/alunos/obterAlunosGinasioController";


const allRouter = express.Router();


const criarPostsController = new CriarPostsController();
const verTodosPostsController = new VerTodosPostsController();
const removerPostsController = new RemoverPostController();
const verInfoPostInfoController = new VerInfoPostController();
const editarPublicacaoController  = new EditarPublicacaoController();

const criarGostoController=new CriarGostoController();
const  editarPerfilController = new EditarPerfilController();
const editarPerfilPrivadoController = new EditarPerfilPrivadoController();
const obterDefinicoesController = new ObterDefinicoesController();
const verMeuPerfilController = new VerMeuPerfilController();
const editarMencoesController = new EditarMencoesController();
const criarComentarioController = new CriarComentarioController();
const impedirIdentificacaoController= new ImpedirIdentificacaoController();
const alterarVistoController= new AlterarVistoController();
const verPerfilController = new VerPerfilController();
const verTodosDesafiosController = new VerTodosDesafiosController();
const verDesafiosDisponiveisController = new VerDesafiosDisponiveisController();
const removerGostoPublicacaoController = new RemoverGostoPublicacaoController();
const criarGostoCommentController = new CriarGostoCommentController();
const removerGostoCommentController = new RemoverGostoCommentController();
const removerComentarioController = new RemoverComentarioController();
const verTodasAtividadesController = new VerTodasAtividadesController();
const verNotificacoesController = new VerNotificacoesController();
const verDesafiosSubmissoesController = new VerDesafiosSubmissoesController();
const verDesafioController = new VerDesafioController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();

//#region Publicacoes
allRouter.post("/:userId/posts", criarPostsController.handle);
allRouter.get("/:userId/posts", verTodosPostsController.handle);
allRouter.put("/:userId/posts/:id", editarPublicacaoController.handle);
allRouter.get("/posts/:id", verInfoPostInfoController.handle)
allRouter.delete("/:userId/posts/:id", removerPostsController.handle);
allRouter.post("/:userId/posts/:id/gostos", criarGostoController.handle)
allRouter.delete("/:userId/posts/:id/gostos", removerGostoPublicacaoController.handle)
allRouter.post("/:userId/posts/:id/comentarios/", criarComentarioController.handle);
allRouter.delete("/:userId/posts/:publicacaoId/comentario/:comentarioId", removerComentarioController.handle);
allRouter.post("/:userId/posts/:publicacaoId/comentario/:comentarioId/gosto", criarGostoCommentController.handle);
allRouter.delete("/:userId/posts/:publicacaoId/comentario/:comentarioId/gosto", removerGostoCommentController.handle);
//#endregion

allRouter.get("/atividades/", verTodasAtividadesController.handle);


//#region 
allRouter.get("/:userId/alunos/ginasio/:id", obterAlunosGinasioController.handle);
//#endregion

//#region Perfil
allRouter.put("/:userId/perfil", editarPerfilController.handle);
allRouter.put("/:userId/definicoes/mencoes", editarMencoesController.handle);
allRouter.put("/:userId/definicoes/identificacao", impedirIdentificacaoController.handle);
allRouter.put("/:userId/definicoes/perfil/privado",editarPerfilPrivadoController.handle);
allRouter.get("/:userId/definicoes", obterDefinicoesController.handle);
allRouter.get("/:userId/perfil", verMeuPerfilController.handle);
allRouter.get("/:userId/user/:id", verPerfilController.handle);
//#endregion


//#region Notificacoes
allRouter.put("/:userId/destinosNotificacao/notificacao/:id",alterarVistoController.handle);
allRouter.get("/:userId/notificacoes", verNotificacoesController.handle);
//#endregion

//#region Desafios
allRouter.get("/:userId/ginasio/:id/desafios/", verTodosDesafiosController.handle);
allRouter.get("/:userId/ginasio/:id/desafios/disponiveis", verDesafiosDisponiveisController.handle);
//#endregion


allRouter.get("/:userId/desafios/:desafioId/submissoes", verDesafiosSubmissoesController.handle);
allRouter.get("/:userId/desafios/:id", verDesafioController.handle);

export { allRouter };