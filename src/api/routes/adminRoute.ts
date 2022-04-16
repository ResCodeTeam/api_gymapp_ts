import express from "express";
const adminRouter = express.Router();

//middlewares
//import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import { CriarPostsController } from "../controllers/posts/criarPostsController";

//import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
import { RegistarUserMarcasController } from "../controllers/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/modalidades/criarGinasioModalidadesController";
import { CriarComentarioController } from "../controllers/posts/comments/criarComentarioController";
import { VerTodosPostsController } from "../controllers/posts/obter/verTodosPostsController";
import { RemoverPostController } from "../controllers/posts/removerPostController";
import { RemoverModalidadesController } from "../controllers/modalidades/removerModalidadesController";
import { EliminarTreinadorController } from "../controllers/treinadores/eliminarTreinadorController";
//import { CriarGostoController } from "../controllers/admin/gostosPosts/criarGostoController";

import { verificarAdmin } from "../middlewares/verificarAdmin";
//import { EncerrarDesafiosController } from "../controllers/admin/desafios/encerrarDesafiosController";
import { CriarNotificacaoMarcaController } from "../controllers/notificacoes/criarNotificacaoMarcaController";
import { CriarNotificacaoGinasioController } from "../controllers/notificacoes/criarNotificacaoGinasioController";
import { RegistarAlunoController } from "../controllers/alunos/registarAlunoController";
import { RegistarAdminController } from "../controllers/admin/registarAdminControllers";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { RemoverMarcaController } from "../controllers/marcas/removerMarcaController";
import { RegistarTreinadorController } from "../controllers/treinadores/registarTreinadorController";
import { CriarNotificacaoUserController } from "../controllers/notificacoes/criarNotificacaoUserController";
import { EditarModalidadesController } from "../controllers/modalidades/editarModalidadeController";
import { RemoverGinasioController } from "../controllers/ginasios/removerGinasioController";
import { VerUmGinasioController } from "../controllers/ginasios/verUmGinasioController";
import { VerTodosGinasiosController } from "../controllers/ginasios/verTodosGinasiosController";
import { VerUmaMarcaController } from "../controllers/marcas/verUmaMarcaController";
import { VerTodasMarcasController } from "../controllers/marcas/verTodasMarcasController";
import { VerTodasModalidadesController } from "../controllers/modalidades/verTodasModalidadesController";



const registarAlunosController = new RegistarAlunoController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();


const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
// const criarGostoController  = new CriarGostoController();
const registarAdminController = new RegistarAdminController();
const  editarModalidadesController = new EditarModalidadesController();


const removerMarcaController = new RemoverMarcaController();

const registarTreinadorController = new RegistarTreinadorController();
const removerGinasioController = new RemoverGinasioController();
const verUmGinasioController = new VerUmGinasioController();
const verTodosGinasiosController = new VerTodosGinasiosController();
const verUmaMarcaController = new VerUmaMarcaController();
const verTodasMarcasController = new VerTodasMarcasController();
const verTodasModalidadesController = new VerTodasModalidadesController();


//#region Admin
adminRouter.post("/registo/", verificarAutenticacao, verificarAdmin ,registarAdminController.handle);
//#endregion

//#region Alunos
adminRouter.post("/marca/alunos/", verificarAutenticacao ,registarAlunosController.handle);
//#endregion

//#region Ginasios
adminRouter.post("/marca/:id/ginasio/", verificarAutenticacao, verificarAdmin, registarMarcaGinasiosController.handle);
adminRouter.delete("/ginasio/:id/", verificarAutenticacao, verificarAdmin, removerGinasioController.handle);
adminRouter.get("/ginasio/:id/", verificarAutenticacao, verificarAdmin, verUmGinasioController.handle);
adminRouter.get("/marca/:id/ginasio/", verificarAutenticacao, verificarAdmin, verTodosGinasiosController.handle);
//#endregion

//#region Marcas
adminRouter.post("/marca/", verificarAutenticacao, verificarAdmin, registarUserMarcasController.handle);
adminRouter.delete("/marca/:id", verificarAutenticacao, verificarAdmin, removerMarcaController.handle);
adminRouter.get("/marca/:id/", verificarAutenticacao, verificarAdmin,verUmaMarcaController.handle);
adminRouter.get("/marca/", verificarAutenticacao, verificarAdmin, verTodasMarcasController.handle);
//#endregion

//#region Modalidades
adminRouter.post("/ginasio/:id/modalidades", verificarAutenticacao , verificarAdmin,criarGinasioModalidadesController.handle);
adminRouter.delete("/modalidades/:id", verificarAutenticacao , verificarAdmin, removerModalidadesController.handle);
//adminRouter.delete("/modalidades", editarModalidadesController.handle);
adminRouter.put("/modalidades/:id", editarModalidadesController.handle);
adminRouter.get("/ginasio/:id/modalidades/", verificarAutenticacao, verificarAdmin, verTodasModalidadesController.handle);
//#endregion

//#region Notificacoes
// const criarNotificacaoUserController = new CriarNotificacaoUserController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();
const criarNotificacaoGinasioController = new CriarNotificacaoGinasioController();
const criarNotificacaoUserController = new CriarNotificacaoUserController();
adminRouter.post("/notificacao/user/:id", verificarAutenticacao , verificarAdmin,criarNotificacaoUserController.handle);
adminRouter.post("/notificacao/marca/", verificarAutenticacao, verificarAdmin, criarNotificacaoMarcaController.handle);
adminRouter.post("/notificacao/ginasio/", verificarAutenticacao ,verificarAdmin, criarNotificacaoGinasioController.handle);
//#endregion



//#region Treinadores
adminRouter.delete("/treinador/:id", verificarAutenticacao ,verificarAdmin, eliminarTreinadorController.handle);
adminRouter.post("/marca/:id/treinadores", verificarAutenticacao, verificarAdmin, registarTreinadorController.handle);
//#endregion

export { adminRouter };