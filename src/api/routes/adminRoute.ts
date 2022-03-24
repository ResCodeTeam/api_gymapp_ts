import express from "express";
const adminRouter = express.Router();

//middlewares
// import verificarAutenticacao from "../middlewares/verificarAutenticacao";

// import criar_posts_controller from "../controllers/admin/posts/criar_posts_controller";
// import registar_alunos_controller from "../controllers/admin/registar_alunos_controller";
// import criar_notificacao_user_controller from "../controllers/admin/notificacoes/criar_notificacao_user_controller";
// import registarUserMarcasController from "../controllers/admin/marcas/registarUserMarcasController";
// import registarMarcaGinasiosController from "../controllers/admin/ginasios/registarMarcaGinasiosController";
// import criarGinasioModalidadesController from "../controllers/admin/modalidades/criarGinasioModalidadesController";
// import criarDesafiosController from "../controllers/admin/desafios/criarDesafiosController";
// import {CriarComentarioController} from "../controllers/admin/comments/criarComentarioController";
// import ver_publicacoes_controller from "../controllers/admin/posts/ver_publicacoes_controller";
// import removerPostsController from "../controllers/admin/posts/removerPostsController";
// import removerModalidadesController from "../controllers/admin/modalidades/removerModalidadesController";
// import eliminarTreinadorController from "../controllers/admin/treinador/eliminarTreinadorController";
// import criarGostoController from "../controllers/admin/gostosPosts/criarGostoController";
// import editarPublicacaoController from "../controllers/admin/posts/editarPublicacaoController";
// import verificarAdmin from "../middlewares/verificarAdmin";
// import encerrarDesafiosController from "../controllers/admin/desafios/encerrarDesafiosController";
// import criar_notificacao_marca_controller from "../controllers/admin/notificacoes/criar_notificacao_marca_controller";
//#region Imports
//#region Notificacoes
import { CriarNotificacaoMarcarController } from "../controllers/admin/notificacoes/criarNotificacaoMarcaController";
//#endregion
//#endregion

//#region 

// const criarComentarioController=new CriarComentarioController();

//#region Notificacoes
const criarNotificacaoMarcaController = new CriarNotificacaoMarcarController();
//#endregion
//#endregion

//#region Alunos
// adminRouter.post("/marca/alunos/registar", registar_alunos_controller);
//#endregion

//#region Comentarios
// adminRouter.post("/posts/:id/comentarios/criar", criarComentarioController.handle);
//#endregion

//#region Desafios
//adminRouter.put("/desafios/:id", encerrarDesafiosController);
//#endregion

//#region Ginasios

//#endregion

//#region Marcas
// adminRouter.post("/:id/marca/registar", registarUserMarcasController);
// adminRouter.post("/marca/:id/ginasio/registar", registarMarcaGinasiosController);
// adminRouter.post("/ginasio/:id/criar/modalidades", criarGinasioModalidadesController);
// adminRouter.post("/ginasio/:id/criar/desafios", criarDesafiosController);
//#endregion

//#region Modalidades
//adminRouter.delete("/modalidades/:id", removerModalidadesController);
//#endregion

//#region Notificacoes
// adminRouter.post("/notificacao/criar/:id", criar_notificacao_user_controller);
// adminRouter.post("/notificacao/criar/", criar_notificacao_marca_controller);
//#endregion

//#region Publicacoes
// adminRouter.post("/posts",criar_posts_controller);
// adminRouter.get("/posts", ver_publicacoes_controller);
// adminRouter.put("/posts/:id", editarPublicacaoController);
// adminRouter.delete("/posts/:id", removerPostsController);
// adminRouter.post("/posts/:id/gostos", criarGostoController);
//#endregion

//#region Treinadores
//adminRouter.delete("/treinador/:id", eliminarTreinadorController);
//#endregion

export { adminRouter };

