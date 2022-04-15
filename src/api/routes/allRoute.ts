import express, { Request, Response } from "express";

import { CriarPostsController } from "../controllers/posts/criarPostsController";
import { RemoverPostController } from "../controllers/posts/removerPostController";
import { VerTodosPostsController } from "../controllers/posts/obter/verTodosPostsController";
import { VerTodosPostsUserController } from "../controllers/posts/obter/verTodosPostsUserController";
import { VerInfoPostController } from "../controllers/posts/obter/verInfoPostController";
import { EditarPublicacaoController } from "../controllers/posts/editarPublicacaoController";
import { UpdateEstadoNotificacaoController } from "../controllers/posts/notificacoes/updateEstadoNotificacaoController";
import { CriarGostoController } from "../controllers/posts/gostosPosts/criarGostoController";
import { EditarPerfilController } from "../controllers/perfil/editarPerfilController";
import { EditarPerfilPrivadoController } from "../controllers/definicoes/editarPerfilPrivadoController";
import { ObterDefinicoesController } from "../controllers/definicoes/obterDefinicoesController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { VerMeuPerfilController } from "../controllers/perfil/verMeuPerfilController";
import { EditarMencoesController } from "../controllers/definicoes/editarMencoesController";
import { CriarComentarioController } from "../controllers/posts/comments/criarComentarioController";
import { VerMeusExerciciosController } from "../controllers/Exercicios/verMeusExerciciosController";
import { ImpedirIdentificacaoController } from "../controllers/definicoes/impedirIdentificacaoController";
import { AlterarVistoController } from "../controllers/notificacoes/alterarVistoController";
import { VerPerfilController } from "../controllers/perfil/verPerfilController";


const allRouter = express.Router();


const criarPostsController = new CriarPostsController();
const verTodosPostsController = new VerTodosPostsController();
const removerPostsController = new RemoverPostController();
const verTodosPostsUserController = new VerTodosPostsUserController();
const verInfoPostInfoController = new VerInfoPostController();
const editarPublicacaoController  = new EditarPublicacaoController();
const updateEstadoNotificacaoController = new UpdateEstadoNotificacaoController();
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

//#region Publicacoes
allRouter.post("/posts", verificarAutenticacao, criarPostsController.handle);
allRouter.put("/posts", verificarAutenticacao, editarPublicacaoController.handle);
allRouter.get("/posts/post/:id", verificarAutenticacao, verInfoPostInfoController.handle)
allRouter.delete("/posts/post/:id", verificarAutenticacao, removerPostsController.handle);
allRouter.get("/posts", verificarAutenticacao, verTodosPostsController.handle);
allRouter.get("/posts/user/:id", verificarAutenticacao, verTodosPostsUserController.handle)
allRouter.post("/posts/:id/gostos", verificarAutenticacao, criarGostoController.handle)
allRouter.post("/posts/:id/comentarios/", verificarAutenticacao, criarComentarioController.handle);
//ver info de post

//#region Perfil
allRouter.put("/perfil", verificarAutenticacao, editarPerfilController.handle);
allRouter.put("/definicoes/mencoes",verificarAutenticacao, editarMencoesController.handle);
allRouter.put("/definicoes/identificacao",verificarAutenticacao, impedirIdentificacaoController.handle);
allRouter.put("/definicoes/perfil/privado", verificarAutenticacao ,editarPerfilPrivadoController.handle);
allRouter.get("/definicoes", verificarAutenticacao, obterDefinicoesController.handle);
allRouter.get("/perfil",verificarAutenticacao, verMeuPerfilController.handle);
allRouter.get("/user/:id", verificarAutenticacao, verPerfilController.handle);
//#endregion


//#region Notificacoes
allRouter.put("/notificacao/", updateEstadoNotificacaoController.handle);
allRouter.put("/destinosNotificacao",verificarAutenticacao,alterarVistoController.handle);
//#endregion

export { allRouter };