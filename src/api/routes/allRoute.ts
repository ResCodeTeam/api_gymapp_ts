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
import { ObterDefinicoesController } from "../controllers/perfil/definições/obterDefinicoesController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { VerMeuPerfilController } from "../controllers/perfil/verMeuPerfilController";


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

//#region Publicacoes
allRouter.post("/posts", criarPostsController.handle);
allRouter.get("/posts/all/:id", verTodosPostsController.handle);
allRouter.get("/posts/user/:id", verTodosPostsUserController.handle)
allRouter.put("/posts", editarPublicacaoController.handle);
allRouter.get("/posts/:id", verInfoPostInfoController.handle)
allRouter.post("/posts/:id/gostos", criarGostoController.handle)

//ver info de post

//#region Perfil
allRouter.put("/:id/perfil", editarPerfilController.handle);
allRouter.put("/:id/perfil", editarPerfilPrivadoController.handle);
allRouter.get("/:id/definicoes", obterDefinicoesController.handle);
allRouter.get("/perfil",verificarAutenticacao, verMeuPerfilController.handle);
//#endregion

// adminRouter.put("/posts/:id", editarPublicacaoController.handle);
allRouter.delete("/posts/:id", removerPostsController.handle);
// adminRouter.post("/posts/:id/gostos", criarGostoController.handle);
//#endregion


//#region Notificacoes
allRouter.put("/notificacao/", updateEstadoNotificacaoController.handle);
//#endregion

export { allRouter };