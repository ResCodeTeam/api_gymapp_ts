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
import { ObterAlunosGinasioController } from "../controllers/alunos/obterAlunosGinasioController";
import { RegistarAlunoController } from "../controllers/alunos/registarAlunoController";
import { RegistarAdminController } from "../controllers/admin/registarAdminControllers";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { RemoverMarcaController } from "../controllers/marcas/removerMarcaController";
import { RegistarTreinadorController } from "../controllers/treinadores/registarTreinadorController";
import { CriarNotificacaoUserController } from "../controllers/notificacoes/criarNotificacaoUserController";
import { EditarModalidadesController } from "../controllers/modalidades/editarModalidadeController";



const registarAlunosController = new RegistarAlunoController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();


const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
// const criarGostoController  = new CriarGostoController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();
const registarAdminController = new RegistarAdminController();
const  editarModalidadesController = new EditarModalidadesController();


const removerMarcaController = new RemoverMarcaController();

const registarTreinadorController = new RegistarTreinadorController();




//#region Admin
adminRouter.post("/registo/", verificarAutenticacao ,registarAdminController.handle);
//#endregion

//#region Alunos
adminRouter.post("/marca/alunos/", verificarAutenticacao ,registarAlunosController.handle);
adminRouter.post("/alunos/ginasio/:id", obterAlunosGinasioController.handle);
//#endregion

//#region Ginasios
adminRouter.post("/marca/:id/ginasio/", verificarAutenticacao, registarMarcaGinasiosController.handle);
//#endregion

//#region Marcas
adminRouter.post("/marca/", verificarAutenticacao, registarUserMarcasController.handle);
adminRouter.delete("/marca/:id", verificarAutenticacao, removerMarcaController.handle);
//#endregion

//#region Modalidades
adminRouter.post("/ginasio/:id/modalidades", criarGinasioModalidadesController.handle);
adminRouter.delete("/modalidades/:id", removerModalidadesController.handle);
//adminRouter.delete("/modalidades", editarModalidadesController.handle);
adminRouter.put("/modalidades/:id", editarModalidadesController.handle);
//#endregion

//#region Notificacoes
// const criarNotificacaoUserController = new CriarNotificacaoUserController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();
const criarNotificacaoGinasioController = new CriarNotificacaoGinasioController();
const criarNotificacaoUserController = new CriarNotificacaoUserController();
adminRouter.post("/notificacao/user/:id", criarNotificacaoUserController.handle);
adminRouter.post("/notificacao/marca/", criarNotificacaoMarcaController.handle);
adminRouter.post("/notificacao/ginasio/", criarNotificacaoGinasioController.handle);
//#endregion



//#region Treinadores
adminRouter.delete("/treinador/:id", eliminarTreinadorController.handle);
adminRouter.post("/marca/:id/treinadores", registarTreinadorController.handle)
//#endregion

export { adminRouter };