import express from "express";
const adminRouter = express.Router();

//middlewares
//import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import { CriarPostsController } from "../controllers/admin/posts/criarPostsController";
//import { RegistarAlunosController } from "../controllers/admin/registarAlunosController";
//import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
import { RegistarUserMarcasController } from "../controllers/admin/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/admin/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/admin/modalidades/criarGinasioModalidadesController";
import { CriarDesafiosController } from "../controllers/admin/desafios/criarDesafiosController";
import { CriarComentarioController } from "../controllers/admin/comments/criarComentarioController";
import { VerPostController } from "../controllers/admin/posts/verPostController";
//import { RemoverPostsController } from "../controllers/admin/posts/removerPostsController";
import { RemoverModalidadesController } from "../controllers/admin/modalidades/removerModalidadesController";
import { EliminarTreinadorController } from "../controllers/admin/treinadores/eliminarTreinadorController";
//import { CriarGostoController } from "../controllers/admin/gostosPosts/criarGostoController";
//import { EditarPublicacaoController } from "../controllers/admin/posts/editarPublicacaoController";
import { verificarAdmin } from "../middlewares/verificarAdmin";
//import { EncerrarDesafiosController } from "../controllers/admin/desafios/encerrarDesafiosController";
import { CriarNotificacaoMarcaController } from "../controllers/admin/notificacoes/criarNotificacaoMarcaController";
import { ObterAlunosGinasioController } from "../controllers/admin/alunos/obterAlunosGinasioController";
import { RegistarFuncoesController } from "../controllers/admin/admin/registarFuncoesController";
import { RegistarAdminController } from "../controllers/admin/admin/registarAdminControllers";

const criarPostsController = new CriarPostsController();
// const registarAlunosController = new RegistarAlunosController();
// const criarNotificacaoUserController = new CriarNotificacaoUserController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();
const criarDesafiosController = new CriarDesafiosController();
const criarComentarioController = new CriarComentarioController();
const verPostController = new VerPostController();
// const removerPostsController = new RemoverPostsController();
const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
// const criarGostoController  = new CriarGostoController();
// const editarPublicacaoController  = new EditarPublicacaoController();
// const encerrarDesafiosController  = new EncerrarDesafiosController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();
const registarFuncoesController = new RegistarFuncoesController();
const registarAdminController = new RegistarAdminController();


//#region Admin
adminRouter.post("/admin/", registarAdminController.handle);
adminRouter.post("/admin/funcoes/", registarFuncoesController.handle);
//#endregion

//#region Alunos
// adminRouter.post("/marca/alunos/registar", registarAlunosController.handle);
//#endregion

//#region Comentarios
adminRouter.post("/posts/:id/comentarios/criar", criarComentarioController.handle);
//#endregion

//#region Desafios
// adminRouter.put("/desafios/:id", encerrarDesafiosController.handle);
//#endregion

//#region Ginasios

//#endregion

//#region Marcas
adminRouter.post("/:id/marca/registar", registarUserMarcasController.handle);
adminRouter.post("/marca/:id/ginasio/registar", registarMarcaGinasiosController.handle);
adminRouter.post("/ginasio/:id/criar/modalidades", criarGinasioModalidadesController.handle);
adminRouter.post("/ginasio/:id/criar/desafios", criarDesafiosController.handle);
//#endregion

//#region Modalidades
adminRouter.delete("/modalidades/:id", removerModalidadesController.handle);
//#endregion

//#region Notificacoes
// adminRouter.post("/notificacao/criar/:id", criarNotificacaoUserController.handle);
adminRouter.post("/notificacao/criar/", criarNotificacaoMarcaController.handle);
//#endregion

//#region Publicacoes
adminRouter.post("/posts", criarPostsController.handle);
adminRouter.get("/posts", verPostController.handle);
// adminRouter.put("/posts/:id", editarPublicacaoController.handle);
// adminRouter.delete("/posts/:id", removerPostsController.handle);
// adminRouter.post("/posts/:id/gostos", criarGostoController.handle);
//#endregion

//#region Treinadores
adminRouter.delete("/treinador/:id", eliminarTreinadorController.handle);
//#endregion

export { adminRouter };

