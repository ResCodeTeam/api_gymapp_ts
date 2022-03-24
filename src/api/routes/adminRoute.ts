import express from "express";
const adminRouter = express.Router();

//middlewares
import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import { CriarPostsController } from "../controllers/admin/posts/criarPostsController";
import { RegistarAlunosController } from "../controllers/admin/registarAlunosController";
import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
import { RegistarUserMarcasController } from "../controllers/admin/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/admin/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/admin/modalidades/criarGinasioModalidadesController";
import { CriarDesafiosController } from "../controllers/admin/desafios/criarDesafiosController";
import { CriarComentarioController } from "../controllers/admin/comments/criarComentarioController";
import { VerPublicacoesController } from "../controllers/admin/posts/verPublicacoesController";
import { RemoverPostsController } from "../controllers/admin/posts/removerPostsController";
import { RemoverModalidadesController } from "../controllers/admin/modalidades/removerModalidadesController";
import { EliminarTreinadorController } from "../controllers/admin/treinador/eliminarTreinadorController";
import { CriarGostoController } from "../controllers/admin/gostosPosts/criarGostoController";
import { EditarPublicacaoController } from "../controllers/admin/posts/editarPublicacaoController";
import { VerificarAdmin } from "../middlewares/verificarAdmin";
import { EncerrarDesafiosController } from "../controllers/admin/desafios/encerrarDesafiosController";
import { CriarNotificacaoMarcaController } from "../controllers/admin/notificacoes/criarNotificacaoMarcaController";

const criarPostsController = new CriarPostsController();
const registarAlunosController = new RegistarAlunosController();
const criarNotificacaoUserController = new CriarNotificacaoUserController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();
const criarDesafiosController = new CriarDesafiosController();
const criarComentarioController = new CriarComentarioController();
const verPublicacoesController = new VerPublicacoesController();
const removerPostsController = new RemoverPostsController();
const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
const criarGostoController  = new CriarGostoController();
const editarPublicacaoController  = new EditarPublicacaoController();
const verificarAdmin  = new VerificarAdmin();
const encerrarDesafiosController  = new EncerrarDesafiosController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();



//#region Alunos
adminRouter.post("/marca/alunos/registar", RegistarAlunosController);
//#endregion

//#region Comentarios
adminRouter.post("/posts/:id/comentarios/criar", criarComentarioController.handle);
//#endregion

//#region Desafios
adminRouter.put("/desafios/:id", encerrarDesafiosController);
//#endregion

//#region Ginasios

//#endregion

//#region Marcas
adminRouter.post("/:id/marca/registar", registarUserMarcasController);
adminRouter.post("/marca/:id/ginasio/registar", registarMarcaGinasiosController);
adminRouter.post("/ginasio/:id/criar/modalidades", criarGinasioModalidadesController);
adminRouter.post("/ginasio/:id/criar/desafios", criarDesafiosController);
//#endregion

//#region Modalidades
adminRouter.delete("/modalidades/:id", RemoverModalidadesController);
//#endregion

//#region Notificacoes
adminRouter.post("/notificacao/criar/:id", CriarNotificacaoUserController);
adminRouter.post("/notificacao/criar/", CriarNotificacaoMarcarController);
//#endregion

//#region Publicacoes
adminRouter.post("/posts",CriarPostsController);
adminRouter.get("/posts", VerPublicacoesController);
adminRouter.put("/posts/:id", EditarPublicacaoController);
adminRouter.delete("/posts/:id", RemoverPostsController);
adminRouter.post("/posts/:id/gostos", CriarGostoController);
//#endregion

//#region Treinadores
adminRouter.delete("/treinador/:id", EliminarTreinadorController);
//#endregion

export { adminRouter };

