import express from "express";
const adminRouter = express.Router();

//middlewares
//import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import { CriarPostsController } from "../controllers/posts/criarPostsController";

//import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
import { RegistarUserMarcasController } from "../controllers/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/modalidades/criarGinasioModalidadesController";
import { CriarDesafiosController } from "../controllers/desafios/criarDesafiosController";
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
import { RemoverDesafioController } from "../controllers/desafios/removerDesafioController";
import { RegistarAlunoController } from "../controllers/alunos/registarAlunoController";
import { RegistarAdminController } from "../controllers/admin/registarAdminControllers";
import { EncerrarDesafiosController } from "../controllers/desafios/encerrarDesafiosController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { VerDesafiosParticipantesController } from "../controllers/desafios/verDesafiosParticipantesController";
import { RemoverMarcaController } from "../controllers/marcas/removerMarcaController";
import { RegistarTreinadorController } from "../controllers/treinadores/registarTreinadorController";
import { CriarNotificacaoUserController } from "../controllers/notificacoes/criarNotificacaoUserController";
import { EditarModalidadesController } from "../controllers/modalidades/editarModalidadeController";



const registarAlunosController = new RegistarAlunoController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();
const criarDesafiosController = new CriarDesafiosController();
const criarComentarioController = new CriarComentarioController();

const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
// const criarGostoController  = new CriarGostoController();
const encerrarDesafiosController  = new EncerrarDesafiosController();
const obterAlunosGinasioController = new ObterAlunosGinasioController();
const registarAdminController = new RegistarAdminController();
const removerDesafioController = new RemoverDesafioController();
const  editarModalidadesController = new EditarModalidadesController();



const verDesafiosParticipantesController = new VerDesafiosParticipantesController();
const removerMarcaController = new RemoverMarcaController();

const registarTreinadorController = new RegistarTreinadorController();




//#region Admin
adminRouter.post("/registo/", registarAdminController.handle);
//#endregion

//#region Alunos
adminRouter.post("/marca/alunos/", registarAlunosController.handle);
//#endregion

//#region Comentarios
adminRouter.post("/posts/:id/comentarios/",verificarAutenticacao, criarComentarioController.handle);
//#endregion

//#region Desafios
adminRouter.post("/ginasio/:id/desafios/", criarDesafiosController.handle);
adminRouter.get("/desafios/", verDesafiosParticipantesController.handle);
adminRouter.put("/desafios/:id", encerrarDesafiosController.handle);
adminRouter.put("/desafios/encerrar/:id", encerrarDesafiosController.handle);
adminRouter.delete("/desafios/:id", removerDesafioController.handle);
//#endregion

//#region Ginasios
adminRouter.post("/marca/:id/ginasio/", registarMarcaGinasiosController.handle);
//#endregion

//#region Marcas
adminRouter.post("/:id/marca/", registarUserMarcasController.handle);
adminRouter.post("/ginasio/:id/desafios", criarDesafiosController.handle);
adminRouter.delete("/marca/:id", removerMarcaController.handle);

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