"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
//middlewares
//import verificarAutenticacao from "../middlewares/verificarAutenticacao";
const criarPostsController_1 = require("../controllers/admin/posts/criarPostsController");
//import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
const registarUserMarcasController_1 = require("../controllers/admin/marcas/registarUserMarcasController");
const registarMarcaGinasiosController_1 = require("../controllers/admin/ginasios/registarMarcaGinasiosController");
const criarGinasioModalidadesController_1 = require("../controllers/admin/modalidades/criarGinasioModalidadesController");
const criarDesafiosController_1 = require("../controllers/admin/desafios/criarDesafiosController");
const criarComentarioController_1 = require("../controllers/admin/comments/criarComentarioController");
const verPostController_1 = require("../controllers/admin/posts/verPostController");
//import { RemoverPostsController } from "../controllers/admin/posts/removerPostsController";
const removerModalidadesController_1 = require("../controllers/admin/modalidades/removerModalidadesController");
const eliminarTreinadorController_1 = require("../controllers/admin/treinadores/eliminarTreinadorController");
//import { EncerrarDesafiosController } from "../controllers/admin/desafios/encerrarDesafiosController";
const criarNotificacaoMarcaController_1 = require("../controllers/admin/notificacoes/criarNotificacaoMarcaController");
const criarNotificacaoGinasioController_1 = require("../controllers/admin/notificacoes/criarNotificacaoGinasioController");
const obterAlunosGinasioController_1 = require("../controllers/admin/alunos/obterAlunosGinasioController");
const removerDesafiosController_1 = require("../controllers/admin/desafios/removerDesafiosController");
const registarAlunoController_1 = require("../controllers/admin/alunos/registarAlunoController");
const registarAdminControllers_1 = require("../controllers/admin/admin/registarAdminControllers");
const encerrarDesafiosController_1 = require("../controllers/admin/desafios/encerrarDesafiosController");
const verificarAutenticacao_1 = require("../middlewares/verificarAutenticacao");
const criarPostsController = new criarPostsController_1.CriarPostsController();
const registarAlunosController = new registarAlunoController_1.RegistarAlunoController();
const registarUserMarcasController = new registarUserMarcasController_1.RegistarUserMarcasController();
const registarMarcaGinasiosController = new registarMarcaGinasiosController_1.RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new criarGinasioModalidadesController_1.CriarGinasioModalidadesController();
const criarDesafiosController = new criarDesafiosController_1.CriarDesafiosController();
const criarComentarioController = new criarComentarioController_1.CriarComentarioController();
const verPostController = new verPostController_1.VerPostController();
// const removerPostsController = new RemoverPostsController();
const removerModalidadesController = new removerModalidadesController_1.RemoverModalidadesController();
const eliminarTreinadorController = new eliminarTreinadorController_1.EliminarTreinadorController();
// const criarGostoController  = new CriarGostoController();
// const editarPublicacaoController  = new EditarPublicacaoController();
const encerrarDesafiosController = new encerrarDesafiosController_1.EncerrarDesafiosController();
const obterAlunosGinasioController = new obterAlunosGinasioController_1.ObterAlunosGinasioController();
const registarAdminController = new registarAdminControllers_1.RegistarAdminController();
const removerDesafiosController = new removerDesafiosController_1.RemoverDesafiosController();
//#region Admin
adminRouter.post("/registo/", registarAdminController.handle);
//#endregion
//#region Alunos
adminRouter.post("/marca/alunos/", registarAlunosController.handle);
//#endregion
//#region Comentarios
adminRouter.post("/posts/:id/comentarios/", verificarAutenticacao_1.verificarAutenticacao, criarComentarioController.handle);
//#endregion
//#region Desafios
// adminRouter.put("/desafios/:id", encerrarDesafiosController.handle);
adminRouter.put("/desafios/encerrar/:id", encerrarDesafiosController.handle);
adminRouter.delete("/desafios/", removerDesafiosController.handle);
//#endregion
//#region Ginasios
//#endregion
//#region Marcas
adminRouter.post("/:id/marca/", registarUserMarcasController.handle);
adminRouter.post("/marca/:id/ginasio/", registarMarcaGinasiosController.handle);
adminRouter.post("/ginasio/:id/modalidades", criarGinasioModalidadesController.handle);
adminRouter.post("/ginasio/:id/desafios", criarDesafiosController.handle);
//#endregion
//#region Modalidades
adminRouter.delete("/modalidades/:id", removerModalidadesController.handle);
//#endregion
//#region Notificacoes
// const criarNotificacaoUserController = new CriarNotificacaoUserController();
const criarNotificacaoMarcaController = new criarNotificacaoMarcaController_1.CriarNotificacaoMarcaController();
const criarNotificacaoGinasioController = new criarNotificacaoGinasioController_1.CriarNotificacaoGinasioController();
// adminRouter.post("/notificacao/user/:id", criarNotificacaoUserController.handle);
adminRouter.post("/notificacao/marca/", criarNotificacaoMarcaController.handle);
adminRouter.post("/notificacao/ginasio/", criarNotificacaoGinasioController.handle);
//#endregion
//#region Publicacoes
adminRouter.post("/posts", verificarAutenticacao_1.verificarAutenticacao, criarPostsController.handle);
adminRouter.get("/posts", verPostController.handle);
// adminRouter.put("/posts/:id", editarPublicacaoController.handle);
// adminRouter.delete("/posts/:id", removerPostsController.handle);
// adminRouter.post("/posts/:id/gostos", criarGostoController.handle);
//#endregion
//#region Treinadores
adminRouter.delete("/treinador/:id", eliminarTreinadorController.handle);
//# sourceMappingURL=adminRoute.js.map